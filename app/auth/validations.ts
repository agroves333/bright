import * as z from "zod"

export const SignupInput = z.object({
  email: z.string().email(),
  password: z.string().min(10).max(100),
})
export type SignupInputType = z.infer<typeof SignupInput>

export const LoginInput = z.object({
  email: z.string().email(),
  password: z.string(),
})
export type LoginInputType = z.infer<typeof LoginInput>

export const CreateEntryInput = z.object({
  days: z.object({
    startDay: z
      .number()
      .int()
      .refine((data) => data >= 0, {
        message: "A day or day range must be selected.",
      }),
    endDay: z.number().int(),
  }),
  times: z.object({
    startTime: z.string(),
    endTime: z.string(),
  }),
  isAllDay: z.boolean(),
})
export type CreateEntryInputType = z.infer<typeof CreateEntryInput>

export const DeleteEntryInput = z.object({
  entryId: z.number().int(),
})
export type DeleteEntryInputType = z.infer<typeof DeleteEntryInput>

export const UpdateEntryInput = z.object({
  entryId: z.number().int(),
  days: z.object({
    startDay: z.number().int(),
    endDay: z.number().int(),
  }),
  times: z.object({
    startTime: z.string(),
    endTime: z.string(),
  }),
  isAllDay: z.boolean(),
})
export type UpdateEntryInputType = z.infer<typeof UpdateEntryInput>
