"use server"

import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export const getPasswords = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return { error: "Unauthorized" }
  }

  const { user } = session

  try {
    const posts = await db.savedPasswords.findMany({
      select: {
        id: true,
        username: true,
        updatedAt: true,
        website: true,
        encryptedPassword: true,
      },
      where: {
        userId: user.id,
      },
    })

    return { result: posts }
  } catch (error) {
    return { error: "Internal Server Error" }
  }
}
