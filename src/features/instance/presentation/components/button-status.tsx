
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
                <Badge className='bg-orange-600 text-white'>
                    Conectando  
                </Badge>
            )
        case "created":
            return (
                <Badge className='bg-primary-600  text-white'>
                    Criado  
                </Badge>
        )
        case "open":
            return (
                <Badge className='bg-primary-600  text-white'>
                    Aberto  
                </Badge>
        
        )
        case "close":
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