import { useDB } from "../../../db/index";

export default defineEventHandler((event) => {
  const db = useDB();
  const rows = db
    .prepare(
      "SELECT id, name, message, created_at FROM guestbook ORDER BY created_at DESC",
    )
    .all();
  return rows;
});
