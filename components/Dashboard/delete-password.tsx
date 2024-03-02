"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { deletePassword } from "@/actions/delete-password"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { Icons } from "../icons"
import { toast } from "../ui/use-toast"

type props = {
  id: string
  showAlert: boolean
}

async function deletePost(postId: string) {
  const response = await deletePassword(postId)

  if (response?.error) {
    toast({
      title: "Something went wrong.",
      description: "Your post was not deleted. Please try again.",
      variant: "destructive",
    })
  }

  return true
}

const DeleteDialog = ({ id, showAlert }: props) => {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] =
    React.useState<boolean>(showAlert)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  return (
    <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this post?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async (event) => {
              event.preventDefault()
              setIsDeleteLoading(true)

              const deleted = await deletePost(id)

              if (deleted) {
                setIsDeleteLoading(false)
                setShowDeleteAlert(false)
                router.refresh()
              }
            }}
            className="bg-red-600 focus:ring-red-600"
          >
            {isDeleteLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.trash className="mr-2 h-4 w-4" />
            )}
            <span>Delete</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDialog
