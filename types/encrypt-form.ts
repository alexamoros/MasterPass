import * as z from "zod"

import { PASSWORD_MIN_LENGTH } from "@/lib/Constants"

export const formSchema = z.object({
  website: z
    .string()
    .max(50, {
      message: "Too lengthy website address.",
    })
    .optional(),
  username: z
    .string()
    .min(1, {
      message: "username required",
    })
    .max(20, {
      message: "Too length username.",
    }),
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

export const masterPassSchema = z.object({
  masterPassword: z.coerce.string().min(8, {
    message: PASSWORD_MIN_LENGTH,
  }),
})

export const passwordTableSchema = z.object({
  id: z.string(),
  username: z.string(),
  updatedAt: z.string(),
  website: z.string(),
  encryptedPassword: z.string(),
})

export type PasswordTableType = z.infer<typeof passwordTableSchema>
