"use server"

import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { savePasswordSchema } from "@/types/password"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export const savePassword = async (data: unknown) => {
  try {
    // checking authorization
    const session = await getServerSession(authOptions)
    if (!session) {
      return { error: "Unauthorized" }
    }

    const { user } = session

    const { encryptedPassword, ...reqData } = savePasswordSchema.parse(data)

    await db.savedPasswords.create({
      data: {
        encryptedPassword,
        userId: user.id,
        ...reqData,
      },
      select: {
        id: true,
      },
    })

    return {
      message: "Successfully Saved the password",
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues }
    }
    return { error: "Internal Server Error" }
  }
}
