import { igniter } from "@/igniter";
import type { Session, CreateSessionDTO, UpdateSessionDTO, SessionQueryParams } from "../session.interface";

export const SessionFeatureProcedure = igniter.procedure({
  name: "SessionFeatureProcedure",
  handler: async (_, { context }) => {
    return {
      session: {
        findMany: async (query: SessionQueryParams): Promise<Session[]> => {
          return context.providers.database.session.findMany({
            where: query.search ? {
              OR: [
                { token: { contains: query.search } },
                { ipAddress: { contains: query.search } },
                { userAgent: { contains: query.search } },
                { userId: { contains: query.search } },
              ]
            } : undefined,
            skip: query.page ? (query.page - 1) * (query.limit || 10) : undefined,
            take: query.limit,
            orderBy: query.sortBy ? {[query.sortBy]: query.sortOrder || 'asc'} : undefined
          });
        },
        findOne: async (params: { id: string }): Promise<Session | null> => {
          return context.providers.database.session.findUnique({
            where: {
              id: params.id
            }
          });
        },
        create: async (input: CreateSessionDTO): Promise<Session> => {
          return context.providers.database.session.create({
            data: {
              expiresAt: input.expiresAt,
              token: input.token,
              updatedAt: input.updatedAt,
              ipAddress: input.ipAddress,
              userAgent: input.userAgent,
              userId: input.userId,
            }
          });
        },
        update: async (params: { id: string } & UpdateSessionDTO): Promise<Session> => {
          const session = await context.providers.database.session.findUnique({
            where: { id: params.id }
          });
          if (!session) throw new Error("Session not found");
          return context.providers.database.session.update({
            where: { id: params.id },
            data: {
              expiresAt: params.expiresAt,
              token: params.token,
              updatedAt: params.updatedAt,
              ipAddress: params.ipAddress,
              userAgent: params.userAgent,
              userId: params.userId,
            }
          });
        },
        delete: async (params: { id: string }): Promise<{ id: string }> => {
          await context.providers.database.session.delete({
            where: { id: params.id }
          });
          return { id: params.id };
        }
      }
    };
  },
});
