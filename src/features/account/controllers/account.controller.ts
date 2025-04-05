import { z } from "zod";
import { igniter } from "@/igniter";
import { AccountFeatureProcedure } from "../procedures/account.procedure";

export const AccountController = igniter.controller({
  name: "account",
  path: "/account",
  actions: {
    findMany: igniter.query({
      method: "GET",
      path: "/",
      use: [AccountFeatureProcedure()],
      query: z.object({
        page: z.number().optional(),
        limit: z.number().optional(),
        sortBy: z.string().optional(),
        sortOrder: z.enum(['asc', 'desc']).optional(),
        search: z.string().optional()
      }),
      handler: async ({ response, request, context }) => {
        const result = await context.account.findMany(request.query);
        return response.success(result);
      }
    }),
    findOne: igniter.query({
      method: "GET",
      path: "/:id" as const,
      use: [AccountFeatureProcedure()],
      handler: async ({ request, response, context }) => {
        const result = await context.account.findOne(request.params);
        return response.success(result);
      }
    }),
    create: igniter.mutation({
      method: "POST",
      path: "/",
      use: [AccountFeatureProcedure()],
      body: z.object({
        id: z.string(),
        accountId: z.string(),
        providerId: z.string(),
        userId: z.string(),
        accessToken: z.string().optional().nullable(),
        refreshToken: z.string().optional().nullable(),
        idToken: z.string().optional().nullable(),
        accessTokenExpiresAt: z.date().optional().nullable(),
        refreshTokenExpiresAt: z.date().optional().nullable(),
        scope: z.string().optional().nullable(),
        password: z.string().optional().nullable(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
      handler: async ({ request, response, context }) => {
        const result = await context.account.create(request.body);
        return response.success(result);
      }
    }),
    update: igniter.mutation({
      method: "PUT",
      path: "/:id" as const,
      use: [AccountFeatureProcedure()],
      body: z.object({
        accountId: z.string().optional(),
        providerId: z.string().optional(),
        userId: z.string().optional(),
        accessToken: z.string().optional().nullable(),
        refreshToken: z.string().optional().nullable(),
        idToken: z.string().optional().nullable(),
        accessTokenExpiresAt: z.date().optional().nullable(),
        refreshTokenExpiresAt: z.date().optional().nullable(),
        scope: z.string().optional().nullable(),
        password: z.string().optional().nullable(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
      }),
      handler: async ({ request, response, context }) => {
        const result = await context.account.update({
          ...request.params,
          ...request.body
        });
        return response.success(result);
      }
    }),
    delete: igniter.mutation({
      method: "DELETE",
      path: "/:id" as const,
      use: [AccountFeatureProcedure()],
      handler: async ({ request, response, context }) => {
        await context.account.delete(request.params);
        return response.success(null);
      }
    })
  }
});
