import { api } from "@/igniter.client"
import { redirect } from "next/navigation"
export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
const session = await api.auth.getSession.query()

if(session) return  redirect('/dashboard')
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {children}
    </div>
  )
}