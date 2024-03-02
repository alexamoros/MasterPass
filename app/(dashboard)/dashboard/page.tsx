import { getPasswords } from "@/actions/get-passwords"

import { EmptyPlaceholder } from "@/components/Common/empty-placeholder"
import { Password } from "@/components/Dashboard/Table/password-listing"
import { DashboardHeader } from "@/components/Dashboard/dashboard-header"
import { DashboardShell } from "@/components/Dashboard/dashboard-shell"
import { SavePasswordButton } from "@/components/Dashboard/save-password-btn"

export const metadata = {
  title: "Dashboard",
}

async function getData() {
  const data = await getPasswords()
  if (data.result) {
    return data.result
  } else {
    return data.error
  }
}

export default async function Dashboard() {
  const passwords = await getData()
  return (
    <DashboardShell>
      <DashboardHeader heading="Passwords" text="Manage passwords.">
        <SavePasswordButton />
      </DashboardHeader>
      <div>
        {Array.isArray(passwords) && passwords.length ? (
          <div className="divide-y divide-border rounded-md border">
            {passwords.map((password: any) => (
              <Password password={password} key={password.id} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="password" />
            <EmptyPlaceholder.Title>No password saved</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any password saved yet. Start saving password.
            </EmptyPlaceholder.Description>
            <SavePasswordButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
