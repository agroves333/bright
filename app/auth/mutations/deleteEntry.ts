import db from "db"
import { DeleteEntryInput, DeleteEntryInputType } from "../validations"

export default async function deleteEntry(input: DeleteEntryInputType) {
  const { entryId } = DeleteEntryInput.parse(input)

  const entry = await db.entry.delete({
    where: {
      id: entryId,
    },
  })

  return entry
}
