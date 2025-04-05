import { igniter } from "@/igniter";
import type { Instance, CreateInstanceDTO, UpdateInstanceDTO, InstanceQueryParams } from "../instance.interface";

export const InstanceFeatureProcedure = igniter.procedure({
  name: "InstanceFeatureProcedure",
  handler: async (_, { context }) => {
    return {
      instance: {
        findMany: async (query: InstanceQueryParams): Promise<Instance[]> => {
          return context.providers.database.instance.findMany({
            where: query.search ? {
              OR: [
                { name: { contains: query.search } },
                { userId: { contains: query.search } },
                { instanceId: { contains: query.search } },
                { hash: { contains: query.search } },
              ]
            } : undefined,
            skip: query.page ? (query.page - 1) * (query.limit || 10) : undefined,
            take: query.limit,
            orderBy: query.sortBy ? {[query.sortBy]: query.sortOrder || 'asc'} : undefined,
            include: {
              user: true,
            },
          });
        },
        findOne: async (params: { id: string }): Promise<Instance | null> => {
          return context.providers.database.instance.findUnique({
            where: {
              id: params.id
            },
            include: {
              user: true,
            },
          });
        },
        create: async (input: CreateInstanceDTO): Promise<Instance> => {
          return context.providers.database.instance.create({
            data: {
              name: input.name,
              userId: input.userId,
              instanceId: input.instanceId,
              hash: input.hash,
              updatedAt: input.updatedAt,
            },
            include: {
              user: true,
            },
          });
        },
        update: async (params: { id: string } & UpdateInstanceDTO): Promise<Instance> => {
          const instance = await context.providers.database.instance.findUnique({
            where: { id: params.id },
            include: { user: true },
          });
          if (!instance) throw new Error("Instance not found");
          return context.providers.database.instance.update({
            where: { id: params.id },
            data: {
              name: params.name,
              userId: params.userId,
              instanceId: params.instanceId,
              hash: params.hash,
              updatedAt: params.updatedAt,
            },
            include: { user: true },
          });
        },
        delete: async (params: { id: string }): Promise<{ id: string }> => {
          await context.providers.database.instance.delete({
            where: { id: params.id }
          });
          return { id: params.id };
        }
      }
    };
  },
});
