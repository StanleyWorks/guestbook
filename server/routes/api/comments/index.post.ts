import { useDB } from "../../../db/index";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ name?: string; message?: string }>(event);

  if (!body?.name || !body?.message) {
    throw createError({
      statusCode: 400,
      statusMessage: "Name and message are required.",
    });
  }

  const db = useDB();
  const stmt = db.prepare(
    "INSERT INTO guestbook (name, message) VALUES (?, ?)",
  );
  const info = stmt.run(body.name, body.message);

  return { id: info.lastInsertRowid, ...body };
});
