import { z } from "zod";
import { igniter } from "@/igniter";
import { UserFeatureProcedure } from "../procedures/user.procedure";

export const UserController = igniter.controller({
  name: "user",
  path: "/user",
  actions: {
    findMany: igniter.query({
      method: "GET",
      path: "/",
      use: [UserFeatureProcedure()],
      query: z.object({
        page: z.number().optional(),
        limit: z.number().optional(),
        sortBy: z.string().optional(),
        sortOrder: z.enum(['asc', 'desc']).optional(),
        search: z.string().optional()
      }),
      handler: async ({ response, request, context }) => {
        const result = await context.user.findMany(request.query);
        return response.success(result);
      }
    }),
    findOne: igniter.query({
      method: "GET",
      path: "/:id" as const,
      use: [UserFeatureProcedure()],
      handler: async ({ request, response, context }) => {
        const result = await context.user.findOne(request.params);
        return response.success(result);
      }
    }),
    create: igniter.mutation({
      method: "POST",
      path: "/",
      use: [UserFeatureProcedure()],
      body: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        emailVerified: z.boolean(),
        image: z.string().optional().nullable(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
      handler: async ({ request, response, context }) => {
        const result = await context.user.create(request.body);
        return response.success(result);
      }
    }),
    update: igniter.mutation({
      method: "PUT",
      path: "/:id" as const,
      use: [UserFeatureProcedure()],
      body: z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        emailVerified: z.boolean().optional(),
        image: z.string().optional().nullable(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
      }),
      handler: async ({ request, response, context }) => {
        const result = await context.user.update({
          ...request.params,
          ...request.body
        });
        return response.success(result);
      }
    }),
    delete: igniter.mutation({
      method: "DELETE",
      path: "/:id" as const,
      use: [UserFeatureProcedure()],
      handler: async ({ request, response, context }) => {
        await context.user.delete(request.params);
        return response.success(null);
      }
    })
  }
});
