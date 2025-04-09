import type { Instance } from '../../instance.interface';
import { cn } from "@/lib/utils";
import * as React from "react"
import  { useState } from 'react';
import { Button } from "@/components/ui/button";
import { api } from "@/igniter.client";
import { useQueryClient } from "@/igniter.client";
import { Toaster, toast } from 'sonner'
// import { InstanceSocketExample } from './instance-socket-example';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import { ButtonStatus } from "./button-status";
import { useEffect } from "react";
import { DialogQR } from './dialog-qr';

interface CardInstanceProps extends React.ComponentProps<"div"> {
  instance: Instance;
}





export function CardInstance({ className, instance, ...props }: CardInstanceProps) {
    const queryClient = useQueryClient()
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenQr, setIsOpenQR] = useState(false);

//    const useClientSocket =  useSocket()

//    useClientSocket?.on('messages.upsert', (event: Event) => {
//     console.log(event)
//    })
    
    useEffect(() => {
        openSocket()
        
        return () => {
            closeSocket()
          };
    })
    async function openSocket() {
        await api.instance.openInSocket.query({
            params: {
                id: instance.id || ""
            }
        })
    }


    async function closeSocket() {
        await api.instance.closeInSocket.query({
            params: {
                id: instance.id || ""
            }
        })
    }

    function handleClick() {
        setIsOpen(true);
    }

    async function handleDelete() {
        setIsOpen(false);

        const result =  await api.instance.delete.mutate({
            params: {
                id: instance.id
            
            },
            body: {
                userId: instance.userId,
                instanceId: instance.instanceId || ""
            }
        })

        if (result.error) {
            console.error("Erro ao excluir instância:", result.error);
            toast.error('Event has not been created')

        } else {
            toast.success('Instância excluída com sucesso', {
                description: "A instância foi excluída com sucesso.",  
            }) 
            queryClient.invalidate("instance.getUserId");
        }
    }


    async function handleGenerateQr() {
        setIsOpenQR(true);
    }

  return (
    <>
  
        <DialogQR instance={instance} isOpen={isOpenQr} onOpenChange={setIsOpenQR} />
        <Toaster  richColors />
        <Card className={cn("w-[380px]", className)} {...props}>
        <CardHeader>
            <CardTitle>Instância de Whatsapp</CardTitle>
            <CardDescription>Nome: <span className='uppercase'>{instance.name}</span></CardDescription>
            <Button className='bg-orange-600 hover:bg-orange-400 text-white uppercase' onClick={handleGenerateQr}>
                Gerar QR  
            </Button>
        </CardHeader>
        <CardFooter className='flex justify-between'>
            <ButtonStatus instance={instance} />
            <Button className='bg-red-600 hover:bg-red-400 text-white' onClick={handleClick}>
                Excluir  
            </Button>
        </CardFooter>
        </Card>
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Dejesa excluir Essa Instância? </AlertDialogTitle>
            <AlertDialogDescription>
            Esta ação é irreversível. Ao confirmar, você perderá todas as informações associadas à sua conta, e seus dados serão permanentemente removidos de nossos servidores.
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  </>
  );
}