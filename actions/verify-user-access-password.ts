"use server"

import { User } from "next-auth"

import { db } from "@/lib/db"

export const verifyUserAccessPassword = async (passId: string, user: User) => {
  const count = await db.savedPasswords.count({
    where: {
      id: passId,
      userId: user?.id,
    },
  })

  return count > 0
}
