'use client'

import DashBoardPage, { DashBoardPageHeader, DashBoardPageHeaderTitle, DashBoardPageMain } from "@/features/auth/presentation/components/dashboard-page"
import { useEffect } from "react"
import {getSocket} from "@/lib/socket"
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