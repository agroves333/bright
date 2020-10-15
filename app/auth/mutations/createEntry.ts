import db from "db"
import { CreateEntryInput, CreateEntryInputType } from "../validations"

export default async function createEntry(input: CreateEntryInputType) {
  const { days, times, isAllDay } = CreateEntryInput.parse(input)

  const entry = await db.entry.create({
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
