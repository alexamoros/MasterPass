import * as z from "zod"

export const formSchema = z.object({
  website: z
    .string()
    .max(50, {
      message: "Too lengthy website address.",
    })
    .optional(),
  username: z
    .string()
    .max(20, {
      message: "Too length username.",
    })
    .optional(),
  encryptedPassword: z.string().min(8, {
    message: "Password must be 8 character long.",
  }),
  email: z.preprocess(
    (entered_mail) => {
      if (!entered_mail || typeof entered_mail !== "string") return undefined
      return entered_mail === "" ? undefined : entered_mail
    },
    z
      .string()
      .email({
        message: "Enter a valid Email.",
      })
      .optional()
  ),
})