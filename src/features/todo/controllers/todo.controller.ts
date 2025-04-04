import { z } from "zod";
import { igniter } from "@/igniter";
import { TodoFeatureProcedure } from "../procedures/todo.procedure";

export const TodoController = igniter.controller({
  name: "todo",
  path: "/todo",
  actions: {
    findMany: igniter.query({
      method: "GET",
      path: "/",
      use: [TodoFeatureProcedure()],
      query: z.object({
        page: z.number().optional(),
        limit: z.number().optional(),
        sortBy: z.string().optional(),
        sortOrder: z.enum(['asc', 'desc']).optional(),
        search: z.string().optional()
      }),
      handler: async ({ response, request, context }) => {
        const result = await context.todo.findMany(request.query);
        return response.success(result);
      }
    }),
    findOne: igniter.query({
      method: "GET",
      path: "/:id" as const,
      use: [TodoFeatureProcedure()],
      handler: async ({ request, response, context }) => {
        const result = await context.todo.findOne(request.params);
        return response.success(result);
      }
    }),
    create: igniter.mutation({
      method: "POST",
      path: "/",
      use: [TodoFeatureProcedure()],
      body: z.object({
        id: z.string().optional().nullable(),
        title: z.string(),
        completed: z.boolean().optional().nullable(),
        createdAt: z.date().optional().nullable(),
        updatedAt: z.date(),
      }),
      handler: async ({ request, response, context }) => {
        const result = await context.todo.create(request.body);
        return response.success(result);
      }
    }),
    update: igniter.mutation({
      method: "PUT",
      path: "/:id" as const,
      use: [TodoFeatureProcedure()],
      body: z.object({
        title: z.string().optional(),
        completed: z.boolean().optional().nullable(),
        createdAt: z.date().optional().nullable(),
        updatedAt: z.date().optional(),
      }),
      handler: async ({ request, response, context }) => {
        const result = await context.todo.update({
          ...request.params,
          ...request.body
        });
        return response.success(result);
      }
    }),
    delete: igniter.mutation({
      method: "DELETE",
      path: "/:id" as const,
      use: [TodoFeatureProcedure()],
      handler: async ({ request, response, context }) => {
        await context.todo.delete(request.params);
        return response.success(null);
      }
    })
  }
});
