import SessionRecorder from "@multiplayer-app/session-recorder-browser";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  SessionRecorder.init({
    application: "my-nuxt-app",
    version: "1.0.0",
    environment: config.public.environment || "production",
    apiKey: config.public.multiplayerBrowserKey,
  });
});
