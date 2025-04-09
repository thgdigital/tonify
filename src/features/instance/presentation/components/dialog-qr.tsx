import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Instance } from '../../instance.interface';
import ExternalService  from "@/features/instance/services/external.service";
import { api } from "@/igniter.client";
import { useState, useEffect } from "react";


interface DialogQRInstanceProps extends React.ComponentProps<"div"> {
    instance: Instance;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DialogQR({ className, instance, ...props }: DialogQRInstanceProps) {

    const [qrCodeData, setQrCodeData] = useState<string | null>(null);

    useEffect(() => {
        async function fetchQrCode() {
            try {
                const result = await api.instance.qrCode.mutate({
                    body: {
                        name: instance.instanceId || "",
                    }
                });

                console.log("QR Code", result.data);
                setQrCodeData(result.data.base64);
            } catch (error) {
                console.error("Erro ao buscar QR Code", error);
            }
        }
        
        if(props.isOpen) {
            fetchQrCode();
        }
        
    }, [props.isOpen, instance.instanceId]);

    return (
        <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Scaneie o QR Code com o WhatsApp</DialogTitle>
                <DialogDescription>
                    {qrCodeData ? <img src={qrCodeData} alt="QR Code" /> : "Carregando..."}
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}