import { igniter } from "@/igniter";
import type { Verification, CreateVerificationDTO, UpdateVerificationDTO, VerificationQueryParams } from "../verification.interface";

export const VerificationFeatureProcedure = igniter.procedure({
  name: "VerificationFeatureProcedure",
  handler: async (_, { context }) => {
    return {
      verification: {
        findMany: async (query: VerificationQueryParams): Promise<Verification[]> => {
          return context.providers.database.verification.findMany({
            where: query.search ? {
              OR: [
                { identifier: { contains: query.search } },
                { value: { contains: query.search } },
              ]
            } : undefined,
            skip: query.page ? (query.page - 1) * (query.limit || 10) : undefined,
            take: query.limit,
            orderBy: query.sortBy ? {[query.sortBy]: query.sortOrder || 'asc'} : undefined
          });
        },
        findOne: async (params: { id: string }): Promise<Verification | null> => {
          return context.providers.database.verification.findUnique({
            where: {
              id: params.id
            }
          });
        },
        create: async (input: CreateVerificationDTO): Promise<Verification> => {
          return context.providers.database.verification.create({
            data: {
              identifier: input.identifier,
              value: input.value,
              expiresAt: input.expiresAt,
              updatedAt: input.updatedAt,
            }
          });
        },
        update: async (params: { id: string } & UpdateVerificationDTO): Promise<Verification> => {
          const verification = await context.providers.database.verification.findUnique({
            where: { id: params.id }
          });
          if (!verification) throw new Error("Verification not found");
          return context.providers.database.verification.update({
            where: { id: params.id },
            data: {
              identifier: params.identifier,
              value: params.value,
              expiresAt: params.expiresAt,
              updatedAt: params.updatedAt,
            }
          });
        },
        delete: async (params: { id: string }): Promise<{ id: string }> => {
          await context.providers.database.verification.delete({
            where: { id: params.id }
          });
          return { id: params.id };
        }
      }
    };
  },
});
