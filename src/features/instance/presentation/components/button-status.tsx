
import type { Instance } from '../../instance.interface';
import * as React from "react"
import { Badge } from "@/components/ui/badge"


interface CardInstanceProps extends React.ComponentProps<"div"> {
    instance: Instance;
}

export function ButtonStatus({ className, instance, ...props }: CardInstanceProps) {

    switch (instance.status) {
        case "connecting":
            return (
                <Badge className='bg-yellow-600 text-white'>
                    Conectando  
                </Badge>
            )
        case "created":
            return (
                <Badge className='bg-yellow-600  text-white'>
                    Criado  
                </Badge>
        )
        case "open":
            return (
                <Badge className='bg-green-600  text-white'>
                    Connectado  
                </Badge>
        
        )
        case "close":
        case "DISCONNECTED":
            return (
                <Badge className='bg-red-600 text-white'>
                    Desligado  
                </Badge>
        )
        
    }

    return (
        <Badge className='bg-red-600 text-white'>
            Desligado  
        </Badge>

    )
}