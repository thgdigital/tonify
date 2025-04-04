import { igniter } from "@/igniter";
import { AuthFeatureProcedure } from "../procedures/auth.procedure";
import { sign } from "crypto";
import { z } from "zod";
import { ok } from "assert";

export const AuthController = igniter.controller({
  name: "auth",
  path: "/auth",
  actions: {
    signIn: igniter.mutation({
      path: "/sign-in",
      method: "POST",
      use: [AuthFeatureProcedure()],
      body: z.object({
        email: z.string().email()
      }),
      handler: async ({ request, response, context }) => {
      const result = await context.auth.signIn(request.body.email);
      
      return response.success(result);
      }
    }),
    getSession: igniter.query({
      path: "/session",
      method: "GET",
      use: [AuthFeatureProcedure()],
      handler: async ({ request, response, context }) => {
        const session = await context.auth.getSession();
        return response.success(session);
      }
    }),
    signOut: igniter.mutation({
      path: "/sign-out",
      method: "POST",
      use: [AuthFeatureProcedure()],
      handler: async ({ request, response, context }) => {  
        const result = await context.auth.signOut();
        return response.success(result);
      }
    })
  }
});
