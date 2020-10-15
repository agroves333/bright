import db from "db"
import { UpdateEntryInput, UpdateEntryInputType } from "../validations"

export default async function updateEntry(input: UpdateEntryInputType) {
  const { entryId, days, times, isAllDay } = UpdateEntryInput.parse(input)
  const entry = await db.entry.update({
    where: {
      id: entryId,
    },
    data: {
      startDay: days?.startDay,
      endDay: days?.endDay,
      startTime: times?.startTime,
      endTime: times?.endTime,
      isAllDay,
    },
  })

  return entry
}
