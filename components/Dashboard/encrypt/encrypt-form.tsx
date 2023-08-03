"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { formSchema } from "@/types/encrypt-form"
import { actions } from "@/lib/Constants"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

import EncryptDIalog from "./encrypt-dialog"

export const EncryptionForm = () => {
  const [selectedAction, SetSelectedAction] = useState<actions>(actions.encrypt)
  const [isPasswordShow, SetPasswordShow] = useState<boolean>(false)
  const [isReady, setIsReady] = useState(false)

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

  useEffect(() => {
    form.getValues("encryptedPassword").length > 8
      ? SetCanEncrypted(true)
      : SetCanEncrypted(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("encryptedPassword")])

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEncrypted && form.getValues("username").length > 0) {
      console.log(values)
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
  }, [form.watch("encryptedPassword")])

  return (
    <Form {...form}>
      <Card>
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
              />
            )}
            <Button type="submit" disabled={!isEncrypted}>
              Submit
            </Button>
          </div>
        </form>
      </Card>
    </Form>
  )
}
