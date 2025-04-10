'use client'

import { useEffect, useState } from "react";
import DashBoardPage, {
  DashBoardPageHeader,
  DashBoardPageHeaderTitle,
  DashBoardPageMain,
} from "@/features/auth/presentation/components/dashboard-page";
import { FormInstance } from "@/features/instance/presentation/components/form-instance";
import { CardInstance } from "@/features/instance/presentation/components/card-instance";
import { api, useQueryClient } from "@/igniter.client";
import { Instance } from "@/features/instance/instance.interface";


export default function Page() {
  const queryClient = useQueryClient();
  const { data: instances } = api.instance.getUserId.useQuery();

  return (
    <DashBoardPage>
      <DashBoardPageHeader>
        <DashBoardPageHeaderTitle>Minha Instância</DashBoardPageHeaderTitle>
      </DashBoardPageHeader>
      <DashBoardPageMain>
        {instances && instances.length > 0 ? (
          instances.map((instance: Instance) => (
            <div key={instance.id}>
              <CardInstance instance={instance} />
            </div>
          ))
        ) : (
          <FormInstance />
        )}
      </DashBoardPageMain>
    </DashBoardPage>
  );
}