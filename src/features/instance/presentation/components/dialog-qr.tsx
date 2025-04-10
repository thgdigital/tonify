'use client'

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Instance } from '../../instance.interface';
import { api } from "@/igniter.client";

interface DialogQRInstanceProps extends React.ComponentProps<"div"> {
  instance: Instance;
  isOpen: boolean;
  qrcode: string | null;
  onOpenChange: (open: boolean) => void;
}

export function DialogQR({ instance, isOpen, onOpenChange, qrcode }: DialogQRInstanceProps) {
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);

  // ✅ Se já estiver conectado, não renderiza NADA
  if (instance.status?.toLowerCase().trim() === "open") return null;

  useEffect(() => {
    async function fetchQrCode() {
      try {
        const result = await api.instance.qrCode.mutate({
          body: { name: instance.instanceId || "" }
        });
        setQrCodeData(result.data.base64);
      } catch (error) {
        console.error("❌ Erro ao buscar QR Code", error);
      }
    }

    if (isOpen) fetchQrCode();

    if(qrcode) {
      setQrCodeData(qrcode);
    }

  }, [isOpen, instance.instanceId, qrcode]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scaneie o QR Code com o WhatsApp</DialogTitle>
          <DialogDescription>
            {qrCodeData ? (
              <img src={qrCodeData} alt="QR Code" />
            ) : (
              "Carregando..."
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}