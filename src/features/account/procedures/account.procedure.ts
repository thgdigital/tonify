import { igniter } from "@/igniter";
import type { Account, CreateAccountDTO, UpdateAccountDTO, AccountQueryParams } from "../account.interface";

export const AccountFeatureProcedure = igniter.procedure({
  name: "AccountFeatureProcedure",
  handler: async (_, { context }) => {
    return {
      account: {
        findMany: async (query: AccountQueryParams): Promise<Account[]> => {
          return context.providers.database.account.findMany({
            where: query.search ? {
              OR: [
                { accountId: { contains: query.search } },
                { providerId: { contains: query.search } },
                { userId: { contains: query.search } },
                { accessToken: { contains: query.search } },
                { refreshToken: { contains: query.search } },
                { idToken: { contains: query.search } },
                { scope: { contains: query.search } },
                { password: { contains: query.search } },
              ]
            } : undefined,
            skip: query.page ? (query.page - 1) * (query.limit || 10) : undefined,
            take: query.limit,
            orderBy: query.sortBy ? {[query.sortBy]: query.sortOrder || 'asc'} : undefined
          });
        },
        findOne: async (params: { id: string }): Promise<Account | null> => {
          return context.providers.database.account.findUnique({
            where: {
              id: params.id
            }
          });
        },
        create: async (input: CreateAccountDTO): Promise<Account> => {
          return context.providers.database.account.create({
            data: {
              accountId: input.accountId,
              providerId: input.providerId,
              userId: input.userId,
              accessToken: input.accessToken,
              refreshToken: input.refreshToken,
              idToken: input.idToken,
              accessTokenExpiresAt: input.accessTokenExpiresAt,
              refreshTokenExpiresAt: input.refreshTokenExpiresAt,
              scope: input.scope,
              password: input.password,
              updatedAt: input.updatedAt,
            }
          });
        },
        update: async (params: { id: string } & UpdateAccountDTO): Promise<Account> => {
          const account = await context.providers.database.account.findUnique({
            where: { id: params.id }
          });
          if (!account) throw new Error("Account not found");
          return context.providers.database.account.update({
            where: { id: params.id },
            data: {
              accountId: params.accountId,
              providerId: params.providerId,
              userId: params.userId,
              accessToken: params.accessToken,
              refreshToken: params.refreshToken,
              idToken: params.idToken,
              accessTokenExpiresAt: params.accessTokenExpiresAt,
              refreshTokenExpiresAt: params.refreshTokenExpiresAt,
              scope: params.scope,
              password: params.password,
              updatedAt: params.updatedAt,
            }
          });
        },
        delete: async (params: { id: string }): Promise<{ id: string }> => {
          await context.providers.database.account.delete({
            where: { id: params.id }
          });
          return { id: params.id };
        }
      }
    };
  },
});
