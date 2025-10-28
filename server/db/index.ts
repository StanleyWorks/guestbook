import Database from "better-sqlite3";

let db: Database.Database | null = null;

export function useDB() {
  if (!db) {
    db = new Database("data.sqlite3");
  }
  return db;
}
