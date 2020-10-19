import db from "./index"
import { hashPassword } from "../app/auth/auth-utils"

const seed = async () => {
  try {
    const users = await db.user.findMany()
    if (!users.length) {
      console.log("Creating Admin User")
      const email = "admin@bright.md"
      const hashedPassword = await hashPassword("Admin123!!!")
      await db.user.create({
        data: { email: email.toLowerCase(), hashedPassword, role: "user" },
      })
    }

    const entries = await db.entry.findMany()

    if (!entries.length) {
      console.log("Creating Entries")
      await db.entry.create({
        data: {
          startDay: 1,
          endDay: 4,
          startTime: "07:00",
          endTime: "20:00",
          isAllDay: false,
        },
      })

      await db.entry.create({
        data: {
          startDay: 5,
          endDay: 6,
          startTime: "00:00",
          endTime: "00:00",
          isAllDay: true,
        },
      })

      await db.entry.create({
        data: {
          startDay: 0,
          endDay: 0,
          startTime: "06:00",
          endTime: "17:00",
        },
      })
    }
  } catch (err) {
    console.error(err)
  }
}

export default seed
