'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'

export default function Page() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const router = useRouter()

  useEffect(() => {
    if (error === 'INVALID_TOKEN') {
      toast.error("Token inválido", {
      duration: 3000,
      description: "Ocorreu um erro ao tentar fazer login. Verifique seu e-mail e tente novamente.",
      onDismiss: () => {
        router.push('/auth')
      },
      onAutoClose: () => {
        router.push('/auth')
      }
    })
    }
  }, [error, router])

  return (
    <>
    <Toaster richColors  position="top-center"/>
    <h1 className="text-4xl font-bold text-center">lange page</h1></>
    
)
}
