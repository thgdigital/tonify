import {MainSidebar } from "@/features/auth/presentation/components/main-sidebar"
import { api } from "@/igniter.client"
import { redirect } from "next/navigation"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
const session = await api.auth.getSession.query()

if(session.error) return  redirect('/auth')

  return (
    <div className="min-h grid grid-cols-[16rem_1fr]">
      <MainSidebar />
      <main>
      {children}
      </main>
     
    </div>
  )
}