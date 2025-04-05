import { useFormWithZod } from "@/hooks/use-form-with-zod";
import { z } from "zod";
import { api } from "@/igniter.client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ZodErrors } from "@/components/ui/ZodErros";

export function FormInstance({className, ...props}: React.ComponentProps<"div">){

    const form = useFormWithZod({
        schema: z.object({  
            name: z.string()
            .min(3, "Nome deve ter pelo menos 3 caracteres")
            .max(50, "Nome deve ter no máximo 50 caracteres")
        }),

        onSubmit: async (data) => {
            console.log("Form submitted with data: ", data);
            const response = await api.instance.create.mutate({
                body: {
                    name: data.name,
                     // Ou o valor apropriado
                }
            });
            
            // console.log("Instância criada:", response.data);
        }
    });

    

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
    <Card className="overflow-hidden">
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
            <Button type="submit" className="w-full">
              Gerar Instância
            </Button>
            
          </div>
        </form>
       
      </CardContent>
    </Card>

  </div>
  );
}