"use server"

import { verifyUserAccessPassword } from "@/actions/verify-user-access-password"
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export const deletePassword = async (passwordId: string) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return { error: "Unauthorized" }
  }

  const { user } = session

  try {
    // Check if the user has access to this post.
    if (!(await verifyUserAccessPassword(passwordId, user))) {
      return { error: "Unauthorize to delete this password." }
    }
    // Delete the post.
    await db.savedPasswords.delete({
      where: {
        id: passwordId as string,
      },
    })
  } catch (error) {
    return { error: "Internal Server Error" }
  }
}
