import { PrismaClient } from "@prisma/client"
import { hashPassword } from "app/auth/auth-utils"
export * from "@prisma/client"
let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  // Ensure the prisma instance is re-used during hot-reloading
  // Otherwise, a new client will be created on every reload
  globalThis["prisma"] = globalThis["prisma"] || new PrismaClient()
  prisma = globalThis["prisma"]

  const seed = async () => {
    try {
      const users = await prisma.user.findMany()
      if (!users.length) {
        const email = "admin@bright.md"
        const hashedPassword = await hashPassword("Admin123!!!")
        await prisma.user.create({
          data: { email: email.toLowerCase(), hashedPassword, role: "user" },
        })
      }

      const entries = await prisma.entry.findMany()

      if (!entries.length) {
        await prisma.entry.create({
          data: {
            startDay: 1,
            endDay: 4,
            startTime: "07:00",
            endTime: "20:00",
            isAllDay: false,
          },
        })

        await prisma.entry.create({
          data: {
            startDay: 5,
            endDay: 6,
            startTime: "00:00",
            endTime: "00:00",
            isAllDay: true,
          },
        })

        await prisma.entry.create({
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
  seed()
}

export default prisma
