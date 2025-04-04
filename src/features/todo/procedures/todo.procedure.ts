import { igniter } from "@/igniter";
import type { Todo, CreateTodoDTO, UpdateTodoDTO, TodoQueryParams } from "../todo.interface";

export const TodoFeatureProcedure = igniter.procedure({
  name: "TodoFeatureProcedure",
  handler: async (_, { context }) => {
    return {
      todo: {
        findMany: async (query: TodoQueryParams): Promise<Todo[]> => {
          return context.providers.database.todo.findMany({
            where: query.search ? {
              OR: [
                { title: { contains: query.search } },
              ]
            } : undefined,
            skip: query.page ? (query.page - 1) * (query.limit || 10) : undefined,
            take: query.limit,
            orderBy: query.sortBy ? {[query.sortBy]: query.sortOrder || 'asc'} : undefined
          });
        },
        findOne: async (params: { id: string }): Promise<Todo | null> => {
          return context.providers.database.todo.findUnique({
            where: {
              id: params.id
            }
          });
        },
        create: async (input: CreateTodoDTO): Promise<Todo> => {
          return context.providers.database.todo.create({
            data: {
              title: input.title,
              completed: input.completed,
              updatedAt: input.updatedAt,
            }
          });
        },
        update: async (params: { id: string } & UpdateTodoDTO): Promise<Todo> => {
          const todo = await context.providers.database.todo.findUnique({
            where: { id: params.id }
          });
          if (!todo) throw new Error("Todo not found");
          return context.providers.database.todo.update({
            where: { id: params.id },
            data: {
              title: params.title,
              completed: params.completed,
              updatedAt: params.updatedAt,
            }
          });
        },
        delete: async (params: { id: string }): Promise<{ id: string }> => {
          await context.providers.database.todo.delete({
            where: { id: params.id }
          });
          return { id: params.id };
        }
      }
    };
  },
});
