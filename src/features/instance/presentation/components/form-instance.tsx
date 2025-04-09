import { useFormWithZod } from "@/hooks/use-form-with-zod";
import { z } from "zod";
import { api } from "@/igniter.client";
import { useQueryClient } from "@/igniter.client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ZodErrors } from "@/components/ui/ZodErros";
import { CardInstance } from "./card-instance";
import { Toaster, toast } from 'sonner'
import { LoadingInstance } from "./loading-instance";
import { useEffect } from "react";

export function FormInstance({className, ...props}: React.ComponentProps<"div">) {
    const queryClient = useQueryClient()
    const createInstance = api.instance.create.useMutation()
    const getInstance = api.instance.getUserId.useQuery(
        {
            refetchOnWindowFocus: false,
        }

    )

    const form = useFormWithZod({
        schema: z.object({  
            name: z.string()
            .min(3, "Nome deve ter pelo menos 3 caracteres")
            .max(50, "Nome deve ter no máximo 50 caracteres")
        }),

        onSubmit: async (data) => {
            const response = await createInstance.mutate({
                body: {
                    name: data.name,
                }
            });
            
            if(response.error) {
                toast.error("Erro ao criar instância")
            }

            form.reset();
            queryClient.invalidate("instance.getUserId");        
        }
    });


    if (getInstance.loading) {
        return <LoadingInstance/>
    }
    if (getInstance.error) {
       toast.error("Erro ao carregar instâncias")
    }

    if (getInstance.data && getInstance.data.length > 0) {
       return (
        <div>
          {getInstance.data.map(instance => (
            <CardInstance key={instance.id} instance={instance} />
          ))}
        </div>
       );
    }
 

  return (
    <>
    <Toaster richColors />
    <div className={cn("flex flex-col gap-6", className)} {...props}>
    <Card className="w-[350px]">
      <CardContent className="grid p-0 md:grid-cols-1">
        
        <form className="p-6 md:p-8" onSubmit={form.onSubmit}>
        <ZodErrors error={form.formState.errors?.name ? [form.formState.errors.name.message!].filter(Boolean) : []} />
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome: </Label>
              <Input
                id="name"
                type="text"
                placeholder="Digite Nome da sua instância"
                required
                {...form.register("name")}
              />
            
            </div>
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {createInstance.loading ? "Gerando Instância..." : "Gerar Instância"}
            </Button>
            
          </div>
        </form>
       
      </CardContent>
    </Card>

  </div>
  </>
  );
}