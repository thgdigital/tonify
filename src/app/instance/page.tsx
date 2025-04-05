'use client'

import DashBoardPage, { DashBoardPageHeader, DashBoardPageHeaderTitle, DashBoardPageMain } from "@/features/auth/presentation/components/dashboard-page"
import { FormInstance } from "@/features/instance/presentation/components/form-instance"

export default function Page() {
  return (
   <DashBoardPage>
      <DashBoardPageHeader>
        <DashBoardPageHeaderTitle>Minha Instância</DashBoardPageHeaderTitle>
      </DashBoardPageHeader>
      <DashBoardPageMain>
        <FormInstance/>
      </DashBoardPageMain>
   </DashBoardPage>
  )
}
