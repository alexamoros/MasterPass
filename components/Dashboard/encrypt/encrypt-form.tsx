"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { formSchema } from "@/types/encrypt-form"
import { actions } from "@/lib/Constants"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import AlertMenu from "@/components/Common/Alert"
import { Icons } from "@/components/icons"

import FormSkelton from "../Loading/form-skelton"
import EncryptDIalog from "./encrypt-dialog"

enum alertType {
  "none" = 0,
  "success" = 1,
  "error" = 2,
}

type props = {
  action: actions
  id?: string
}
type formType = z.infer<typeof formSchema>

export const EncryptionForm = ({ action, id }: props) => {
  const Id = id
  const [selectedAction, SetSelectedAction] = useState<actions>(action)
  const [isPasswordShow, SetPasswordShow] = useState<boolean>(false)
  const [isReady, setIsReady] = useState(false)
  const [alert, SetAlert] = useState<alertType>(alertType.none)
  const [alertMessage, SetAlertMessage] = useState<string>("")
  const [loading, SetLoading] = useState<boolean>(false)
  const [passwordDetails, setPasswordDetails] = useState<formType>()
  const router = useRouter()

  const fetchDetails = async (id: string) => {
    try {
      const res = await fetch(`/api/password/${id}`, {
        method: "GET",
      })

      if (!res?.ok) {
        throw new Error("Error fetching data")
      }

      const data = await formSchema.parse(await res.json())

      setPasswordDetails(data)
      form.setValue("email", data?.email)
      form.setValue("encryptedPassword", data?.encryptedPassword)
      form.setValue("username", data?.username)
      form.setValue("website", data?.website)
    } catch (error) {
      console.log(error)
      throw new Error("Something went wrong")
    }
  }

  useEffect(() => {
    if (Id) {
      fetchDetails(Id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Id])

  useEffect(() => {
    setIsReady(true)
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      website: "",
      encryptedPassword: "",
    },
  })

  const [isTouched, setIsTouched] = useState<boolean>(true)
  const [isEncrypted, SetEncrypted] = useState<boolean>(false)
  const [canEncrypted, SetCanEncrypted] = useState<boolean>(false)
  const [canDecrypt, SetCanDecrypt] = useState<boolean>(
    action === actions.decrypt
  )

  useEffect(() => {
    form.getValues("encryptedPassword").length > 8
      ? SetCanEncrypted(true)
      : SetCanEncrypted(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("encryptedPassword")])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEncrypted && form.getValues("username").length > 0) {
      try {
        SetLoading(true)
        const data = formSchema.parse(values)

        const res = await fetch(`/api/password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data }),
        })

        if (!res.ok) {
          throw new Error(res.statusText)
        }

        const { message } = await res.json()
        SetAlert(alertType.success)
        SetAlertMessage(message)
        form.reset()
        SetLoading(false)
        setTimeout(() => {
          SetAlert(alertType.none)
          SetAlertMessage("")
          router.replace("/dashboard")
          router.refresh()
        }, 3000)
      } catch (error) {
        SetAlert(alertType.error)
        SetAlertMessage(error?.message)
        SetLoading(false)
      }
    }
  }

  const setPassword = (Password: string) => {
    form.setValue("encryptedPassword", Password)
    setIsTouched(false)
    SetEncrypted(true)
  }

  useEffect(() => {
    if (isTouched) SetEncrypted(false)

    setIsTouched(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("encryptedPassword")])

  return (
    <>
      {!loading ? (
        <Form {...form}>
          <Card>
            {alert !== alertType.none && (
              <AlertMenu
                Icon={AlertCircle}
                title={alert === alertType.error ? "Error" : "Success"}
                description={alertMessage}
                variant={alert === alertType.error ? "destructive" : "default"}
              />
            )}
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-6 lg:w-3/5 xl:w-2/5 "
            >
              <div className="grid gap-6 pb-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username *</FormLabel>
                      <FormControl>
                        <Input placeholder="username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="xyz@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="Facebook" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="encryptedPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password * </FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Input
                            placeholder="Password"
                            type={isPasswordShow ? "text" : "password"}
                            {...field}
                          />
                          {!isPasswordShow ? (
                            <Icons.eyeOff
                              onClick={() => SetPasswordShow(true)}
                              className="ml-4 rounded-lg hover:bg-slate-500"
                            />
                          ) : (
                            <Icons.eyeOn
                              onClick={() => SetPasswordShow(false)}
                              className="ml-4 rounded-lg hover:bg-slate-500"
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                      {action === actions.decrypt && !canDecrypt && (
                        <FormDescription>
                          Incase your password doesn&apos;t appear in password
                          field after decryption your master password is
                          incorrect try to refresh and decrypt again.
                        </FormDescription>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end gap-4">
                {isReady && (
                  <EncryptDIalog
                    password={form.getValues("encryptedPassword")}
                    canEncrypt={canEncrypted}
                    setPassword={setPassword}
                    action={selectedAction}
                    isEncrypted={isEncrypted}
                    canDecrypt={canDecrypt}
                    SetCanDecrypt={SetCanDecrypt}
                  />
                )}
                {selectedAction === actions.encrypt ? (
                  <Button type="submit" disabled={!isEncrypted}>
                    Submit
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </form>
          </Card>
        </Form>
      ) : (
        <FormSkelton />
      )}
    </>
  )
}
