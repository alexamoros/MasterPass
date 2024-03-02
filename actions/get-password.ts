"use server"

import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export const getPassword = async (passId: string) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return { error: "Unauthorized" }
  }

  const { user } = session

  try {
    const passwordDetails = await db.savedPasswords.findFirst({
      select: {
        id: true,
        username: true,
        encryptedPassword: true,
        email: true,
        website: true,
      },
      where: {
        userId: user.id,
        id: passId,
      },
    })

    return { result: passwordDetails }
  } catch (error) {
    return { error: "Internal Server Error" }
  }
}
