import { z } from "zod";
import { igniter } from "@/igniter";
import { SessionFeatureProcedure } from "../procedures/session.procedure";

export const SessionController = igniter.controller({
  name: "session",
  path: "/session",
  actions: {
    findMany: igniter.query({
      method: "GET",
      path: "/",
      use: [SessionFeatureProcedure()],
      query: z.object({
        page: z.number().optional(),
        limit: z.number().optional(),
        sortBy: z.string().optional(),
        sortOrder: z.enum(['asc', 'desc']).optional(),
        search: z.string().optional()
      }),
      handler: async ({ response, request, context }) => {
        const result = await context.session.findMany(request.query);
        return response.success(result);
      }
    }),
    findOne: igniter.query({
      method: "GET",
      path: "/:id" as const,
      use: [SessionFeatureProcedure()],
      handler: async ({ request, response, context }) => {
        const result = await context.session.findOne(request.params);
        return response.success(result);
      }
    }),
    create: igniter.mutation({
      method: "POST",
      path: "/",
      use: [SessionFeatureProcedure()],
      body: z.object({
        id: z.string(),
        expiresAt: z.date(),
        token: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
        ipAddress: z.string().optional().nullable(),
        userAgent: z.string().optional().nullable(),
        userId: z.string(),
      }),
      handler: async ({ request, response, context }) => {
        const result = await context.session.create(request.body);
        return response.success(result);
      }
    }),
    update: igniter.mutation({
      method: "PUT",
      path: "/:id" as const,
      use: [SessionFeatureProcedure()],
      body: z.object({
        expiresAt: z.date().optional(),
        token: z.string().optional(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
        ipAddress: z.string().optional().nullable(),
        userAgent: z.string().optional().nullable(),
        userId: z.string().optional(),
      }),
      handler: async ({ request, response, context }) => {
        const result = await context.session.update({
          ...request.params,
          ...request.body
        });
        return response.success(result);
      }
    }),
    delete: igniter.mutation({
      method: "DELETE",
      path: "/:id" as const,
      use: [SessionFeatureProcedure()],
      handler: async ({ request, response, context }) => {
        await context.session.delete(request.params);
        return response.success(null);
      }
    })
  }
});
