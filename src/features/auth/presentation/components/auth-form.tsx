'use client'

import { useFormWithZod } from "@/hooks/use-form-with-zod";
import { z } from "zod";
import { api } from "@/igniter.client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toaster, toast } from 'sonner'

export function AuthForm({className, ...props}: React.ComponentProps<"div">){

    const form = useFormWithZod({
        schema: z.object({  
            email: z.string().email()
        }),
        onSubmit: async (data) => {
            const response = await api.auth.signIn.mutate({
                body: {
                    email: data.email
                }
            });

            if(response.data?.status === true) {
              toast.success("Verifique seu e-mail para o link de login", {
                  duration: 5000,
                  description: "Um link de login foi enviado para o seu e-mail. Clique no link para fazer login na sua conta.",
              })
              form.reset();
            }else {
                toast.error("Erro ao fazer login", {
                    duration: 5000,
                    description: "Ocorreu um erro ao tentar fazer login. Verifique seu e-mail e tente novamente.",})
            }
   
            console.log("Sign-in successful:", response.data);
        }
    });

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Toaster richColors position="top-center"/>
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-1">
            <form className="p-6 md:p-8" onSubmit={form.onSubmit}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Bem vindo de volta</h1>
                  <p className="text-balance text-muted-foreground">
                  Entre na sua conta TONIFY
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    {...form.register("email")}
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Sign up
                  </a>
                </div>
              </div>
            </form>
           
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    );
}