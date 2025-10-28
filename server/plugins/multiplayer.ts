import { hostname } from "os";
import { node, NodeSDK } from "@opentelemetry/sdk-node";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { resourceFromAttributes } from "@opentelemetry/resources";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import { ATTR_HOST_NAME } from "@opentelemetry/semantic-conventions/incubating";
import api from "@opentelemetry/api";
import { W3CTraceContextPropagator } from "@opentelemetry/core";
import {
  SessionRecorderHttpInstrumentationHooksNode,
  SessionRecorderIdGenerator,
  SessionRecorderHttpTraceExporter,
  SessionRecorderHttpLogsExporter,
} from "@multiplayer-app/session-recorder-node";
import {
  LoggerProvider,
  BatchLogRecordProcessor,
} from "@opentelemetry/sdk-logs";
import * as apiLogs from "@opentelemetry/api-logs";

let initialized = false;

export default defineNitroPlugin((_nitroApp) => {
  // Only initialize once
  if (initialized) return;

  const config = useRuntimeConfig();
  const apiKey = config.multiplayerBackendKey;

  // Skip initialization if no API key is provided
  if (!apiKey) {
    console.warn(
      "Multiplayer backend: No API key provided, skipping initialization",
    );
    return;
  }

  try {
    const instrumentations = [
      getNodeAutoInstrumentations({
        "@opentelemetry/instrumentation-http": {
          requestHook: SessionRecorderHttpInstrumentationHooksNode.requestHook({
            maxPayloadSizeBytes: 5000,
            isMaskBodyEnabled: false,
          }),
          responseHook:
            SessionRecorderHttpInstrumentationHooksNode.responseHook({
              maxPayloadSizeBytes: 5000,
              isMaskBodyEnabled: false,
            }),
        },
      }),
    ];

    const resource = resourceFromAttributes({
      [ATTR_SERVICE_NAME]: "guestbook-api",
      [ATTR_SERVICE_VERSION]: "1.0.0",
      [ATTR_HOST_NAME]: hostname(),
    });

    const idGenerator = new SessionRecorderIdGenerator();

    // Set up trace exporter
    const traceExporter = new SessionRecorderHttpTraceExporter({
      apiKey: apiKey,
    });

    const provider = new node.NodeTracerProvider({
      resource,
      spanProcessors: [new BatchSpanProcessor(traceExporter)],
      idGenerator,
    });

    // Set up log exporter
    const logExporter = new SessionRecorderHttpLogsExporter({
      apiKey: apiKey,
    });

    const logRecordProcessor = new BatchLogRecordProcessor(logExporter);
    const loggerProvider = new LoggerProvider({
      resource,
      processors: [logRecordProcessor],
    });

    apiLogs.logs.setGlobalLoggerProvider(loggerProvider);

    provider.register();
    api.trace.setGlobalTracerProvider(provider);
    api.propagation.setGlobalPropagator(new W3CTraceContextPropagator());

    const sdk = new NodeSDK({
      instrumentations,
    });

    sdk.start();

    initialized = true;
    console.log("✅ Multiplayer backend session recorder initialized");
  } catch (error) {
    console.error(
      "Failed to initialize Multiplayer backend session recorder:",
      error,
    );
  }
});
