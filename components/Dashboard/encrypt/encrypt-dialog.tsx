"use client"

import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogPortal } from "@radix-ui/react-dialog"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { masterPassSchema } from "@/types/encrypt-form"
import { PASSWORD_MIN_LENGTH, actions } from "@/lib/Constants"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

var CryptoJS = require("crypto-js")

interface Props {
  password: string
  canEncrypt: boolean
  setPassword: (Password: string) => void
  action: actions
  isEncrypted: boolean
  canDecrypt: boolean
  SetCanDecrypt: (canDecrypt: boolean) => void
}

const EncryptDIalog = ({
  password,
  canEncrypt,
  setPassword,
  action,
  isEncrypted,
  canDecrypt,
  SetCanDecrypt,
}: Props) => {
  const t = useTranslations("encrypt_form")
  const [isOpen, SetOpen] = useState(false)

  const form = useForm<z.infer<typeof masterPassSchema>>({
    resolver: zodResolver(masterPassSchema),
    defaultValues: {
      masterPassword: "",
    },
  })

  useEffect(() => {
    if (
      form.getValues("masterPassword").length < 8 &&
      form.getValues("masterPassword") !== ""
    ) {
      form.setError("masterPassword", { message: t(PASSWORD_MIN_LENGTH) })
    } else {
      form.clearErrors("masterPassword")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("masterPassword")])

  const encrypt = (password, masterPassword) => {
    let encryptedPassword = CryptoJS.AES.encrypt(
      password,
      masterPassword
    ).toString()
    setPassword(encryptedPassword)
    return true
  }

  const decrypt = (encryptedPassword, masterPassword) => {
    let decrypted = CryptoJS.AES.decrypt(encryptedPassword, masterPassword)
    let decryptedPassword = decrypted.toString(CryptoJS.enc.Utf8)
    setPassword(decryptedPassword)
    SetCanDecrypt(false)
    return true
  }

  function onSubmit() {
    if (form.getValues("masterPassword").length < 8) return

    if (action === actions.encrypt) {
      encrypt(password, form.getValues("masterPassword"))
    } else if (action === actions.decrypt) {
      decrypt(password, form.getValues("masterPassword"))
    }

    form.resetField("masterPassword")
    SetOpen(false)
  }

  const onClose = () => {
    form.resetField("masterPassword")
  }

  return (
    <Dialog open={isOpen} onOpenChange={SetOpen} defaultOpen={false}>
      <Button
        disabled={
          action === actions.encrypt ? !canEncrypt || isEncrypted : !canDecrypt
        }
        onClick={() => {
          SetOpen(true)
        }}
        asChild={true}
      >
        <DialogTrigger>
          {action === actions.encrypt ? t("encrypt") : t("decrypt")}
        </DialogTrigger>
      </Button>

      <DialogPortal container={document.body}>
        <DialogContent onCloseAutoFocus={onClose}>
          <DialogHeader>
            <DialogTitle>{t("encrypt")}</DialogTitle>
            <DialogDescription>{t("encrypt_description")}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="items-center gap-4">
              <Form {...form}>
                <FormField
                  control={form.control}
                  name="masterPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MasterPass</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("masterpass_placeholder")}
                          type={"password"}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button" className="mt-6" onClick={onSubmit}>
                    {action === actions.encrypt ? t("encrypt") : t("decrypt")}
                  </Button>
                </DialogFooter>
              </Form>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default EncryptDIalog
