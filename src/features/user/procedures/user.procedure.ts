import { igniter } from "@/igniter";
import type { User, CreateUserDTO, UpdateUserDTO, UserQueryParams } from "../user.interface";

export const UserFeatureProcedure = igniter.procedure({
  name: "UserFeatureProcedure",
  handler: async (_, { context }) => {
    return {
      user: {
        findMany: async (query: UserQueryParams): Promise<User[]> => {
          return context.providers.database.user.findMany({
            where: query.search ? {
              OR: [
                { name: { contains: query.search } },
                { email: { contains: query.search } },
                { image: { contains: query.search } },
              ]
            } : undefined,
            skip: query.page ? (query.page - 1) * (query.limit || 10) : undefined,
            take: query.limit,
            orderBy: query.sortBy ? {[query.sortBy]: query.sortOrder || 'asc'} : undefined
          });
        },
        findOne: async (params: { id: string }): Promise<User | null> => {
          return context.providers.database.user.findUnique({
            where: {
              id: params.id
            }
          });
        },
        create: async (input: CreateUserDTO): Promise<User> => {
          return context.providers.database.user.create({
            data: {
              name: input.name,
              email: input.email,
              emailVerified: input.emailVerified,
              image: input.image,
              updatedAt: input.updatedAt,
            }
          });
        },
        update: async (params: { id: string } & UpdateUserDTO): Promise<User> => {
          const user = await context.providers.database.user.findUnique({
            where: { id: params.id }
          });
          if (!user) throw new Error("User not found");
          return context.providers.database.user.update({
            where: { id: params.id },
            data: {
              name: params.name,
              email: params.email,
              emailVerified: params.emailVerified,
              image: params.image,
              updatedAt: params.updatedAt,
            }
          });
        },
        delete: async (params: { id: string }): Promise<{ id: string }> => {
          await context.providers.database.user.delete({
            where: { id: params.id }
          });
          return { id: params.id };
        }
      }
    };
  },
});
