"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { generatePassword } from "@/actions/generate-password"
import { getPassword } from "@/actions/get-password"
import { savePassword } from "@/actions/save-password"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle } from "lucide-react"
import { useTranslations } from "next-intl"
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
  const t = useTranslations("encrypt_form")
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
      const res = await getPassword(id)
      console.log(res)
      if (res?.error) {
        throw new Error("Error fetching data")
      }

      const data = await formSchema.parse(res.result)

      setPasswordDetails(data)
      form.setValue("email", data?.email)
      form.setValue("encryptedPassword", data?.encryptedPassword)
      form.setValue("username", data?.username)
      form.setValue("website", data?.website)
    } catch (error) {
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

        const res = await savePassword(data)

        const { message } = await res
        SetAlert(alertType.success)
        SetAlertMessage(`${message}`)
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

  const generatePasswordForm = () => {
    const generatedPassword = generatePassword()
    form.setValue("encryptedPassword", generatedPassword)
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
                title={alert === alertType.error ? t("error") : t("success")}
                description={t(alertMessage)}
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
                      <FormLabel>{t("username")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("username_placeholder")}
                          {...field}
                        />
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
                      <FormLabel>{t("email")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("email_placeholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>{t("website")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <label
                            htmlFor="website"
                            className="absolute left-2 top-2 size-4 text-muted-foreground"
                          >
                            https://
                          </label>
                          <Input
                            id="website"
                            className="pl-16"
                            placeholder="masterpassv2.vercel.app"
                            {...field}
                          />
                        </div>
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
                      <FormLabel>{t("password")}</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Input
                            placeholder={t("password_placeholder")}
                            type={isPasswordShow ? "text" : "password"}
                            {...field}
                            className="mr-4"
                          />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger type="button">
                                {!isPasswordShow ? (
                                  <Icons.eyeOff
                                    onClick={() => SetPasswordShow(true)}
                                    className="cursor-pointer rounded-lg hover:bg-slate-500"
                                  />
                                ) : (
                                  <Icons.eyeOn
                                    onClick={() => SetPasswordShow(false)}
                                    className="cursor-pointer rounded-lg hover:bg-slate-500"
                                  />
                                )}
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  {isPasswordShow
                                    ? t("hide_password")
                                    : t("show_password")}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger type="button">
                                <Icons.refresh
                                  onClick={generatePasswordForm}
                                  className="ml-2 rounded-lg hover:bg-slate-500"
                                />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{t("generate_password_tooltip")}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </FormControl>
                      <FormMessage />
                      {action === actions.decrypt && !canDecrypt && (
                        <FormDescription>{t("decrypt_error")}</FormDescription>
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
                    {t("submit")}
                  </Button>
                ) : (
                  ""
                )}
                {selectedAction === actions.decrypt ? (
                  <Button
                    type="button"
                    onClick={() => {
                      router.replace("/dashboard")
                    }}
                  >
                    {t("cancel")}
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
