import { z } from "zod";
import { igniter } from "@/igniter";
import { VerificationFeatureProcedure } from "../procedures/verification.procedure";

export const VerificationController = igniter.controller({
  name: "verification",
  path: "/verification",
  actions: {
    findMany: igniter.query({
      method: "GET",
      path: "/",
      use: [VerificationFeatureProcedure()],
      query: z.object({
        page: z.number().optional(),
        limit: z.number().optional(),
        sortBy: z.string().optional(),
        sortOrder: z.enum(['asc', 'desc']).optional(),
        search: z.string().optional()
      }),
      handler: async ({ response, request, context }) => {
        const result = await context.verification.findMany(request.query);
        return response.success(result);
      }
    }),
    findOne: igniter.query({
      method: "GET",
      path: "/:id" as const,
      use: [VerificationFeatureProcedure()],
      handler: async ({ request, response, context }) => {
        const result = await context.verification.findOne(request.params);
        return response.success(result);
      }
    }),
    create: igniter.mutation({
      method: "POST",
      path: "/",
      use: [VerificationFeatureProcedure()],
      body: z.object({
        id: z.string(),
        identifier: z.string(),
        value: z.string(),
        expiresAt: z.date(),
        createdAt: z.date().optional().nullable(),
        updatedAt: z.date().optional().nullable(),
      }),
      handler: async ({ request, response, context }) => {
        const result = await context.verification.create(request.body);
        return response.success(result);
      }
    }),
    update: igniter.mutation({
      method: "PUT",
      path: "/:id" as const,
      use: [VerificationFeatureProcedure()],
      body: z.object({
        identifier: z.string().optional(),
        value: z.string().optional(),
        expiresAt: z.date().optional(),
        createdAt: z.date().optional().nullable(),
        updatedAt: z.date().optional().nullable(),
      }),
      handler: async ({ request, response, context }) => {
        const result = await context.verification.update({
          ...request.params,
          ...request.body
        });
        return response.success(result);
      }
    }),
    delete: igniter.mutation({
      method: "DELETE",
      path: "/:id" as const,
      use: [VerificationFeatureProcedure()],
      handler: async ({ request, response, context }) => {
        await context.verification.delete(request.params);
        return response.success(null);
      }
    })
  }
});
