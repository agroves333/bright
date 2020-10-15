import db from "db"

export default async function getEntries(_ = null) {
  return await db.entry.findMany()
}
