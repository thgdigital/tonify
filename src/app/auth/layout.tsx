import { api } from "@/igniter.client"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
const session = await api.auth.getSession.query()

if(!session.error) return


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {children}
    </div>
  )
}