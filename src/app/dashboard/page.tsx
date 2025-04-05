'use client'

import DashBoardPage, { DashBoardPageHeader, DashBoardPageHeaderTitle, DashBoardPageMain } from "@/features/auth/presentation/components/dashboard-page"

export default function Page() {
  return (
   <DashBoardPage>
      <DashBoardPageHeader>
        <DashBoardPageHeaderTitle>Tarefas</DashBoardPageHeaderTitle>
      </DashBoardPageHeader>
      <DashBoardPageMain>
        <h1>Tarefas</h1>
      </DashBoardPageMain>
   </DashBoardPage>
  )
}
