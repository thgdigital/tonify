import { z } from "zod";
import { igniter } from "@/igniter";
import { InstanceFeatureProcedure } from "../procedures/instance.procedure";
import { AuthFeatureProcedure } from "@/features/auth";
import ExternalService  from "@/features/instance/services/external.service";


export const InstanceController = igniter.controller({
  name: "instance",
  path: "/instance",
  actions: {
    findMany: igniter.query({
      method: "GET",
      path: "/",
      use: [InstanceFeatureProcedure()],
      query: z.object({
        page: z.number().optional(),
        limit: z.number().optional(),
        sortBy: z.string().optional(),
        sortOrder: z.enum(['asc', 'desc']).optional(),
        search: z.string().optional()
      }),
      handler: async ({ response, request, context }) => {
        const result = await context.instance.findMany(request.query);
        return response.success(result);
      }
    }),
    findOne: igniter.query({
      method: "GET",
      path: "/:id" as const,
      use: [InstanceFeatureProcedure()],
      handler: async ({ request, response, context }) => {
        const result = await context.instance.findOne(request.params);
        return response.success(result);
      }
    }),
    create: igniter.mutation({
      method: "POST",
      path: "/",
      use: [InstanceFeatureProcedure(), AuthFeatureProcedure()],
      body: z.object({
        id: z.string().optional().nullable(),
        name: z.string(),
        createdAt: z.date().optional().nullable(),
      }),
      handler: async ({ request, response, context }) => {
        const { id, createdAt, ...data } = request.body;
        const session = await context.auth.getSession();


        console.log('Session:', session);
        if (!session) {
          return response.unauthorized();
        }
        if (!session.user.id) {
          return response.unauthorized();
        }

        try {
          const externalData = await ExternalService.createInstance({
            instanceName: data.name,
            qrcode: true,
            integration: "WHATSAPP-BAILEYS",
            webhook: {
              "url": "https://paineln8n.faixinhabot.cloud/webhook-test/c638b1e4-69f9-40a9-a1e3-6d86750fbdb3",
              "byEvents": false,
              "base64": true,
              "events": ["MESSAGES_UPSERT"],
            },
          });

          let dto = { 
            ...data,
            userId: session.user.id,
            createdAt: createdAt || new Date(),
            updatedAt: new Date(),
            hash: externalData.hash,
            instanceId: externalData.instance.instanceId,
          };

          console.log('Dados recebidos:', dto);

          console.log('Dados externos recebidos:', externalData);
          const result = await context.instance.create(dto);
          return response.created(externalData)
        } catch (error) {
          console.error('Erro ao criar instância externa:', error);
          return response.success(error)
        }

        // const result = await context.instance.create(dto);
        return response.success({status: "true"});
      }
    }),
    update: igniter.mutation({
      method: "PUT",
      path: "/:id" as const,
      use: [InstanceFeatureProcedure()],
      body: z.object({
        name: z.string().optional(),
        userId: z.string().optional(),
        createdAt: z.date().optional().nullable(),
        updatedAt: z.date().optional(),
      }),
      handler: async ({ request, response, context }) => {
        const { createdAt, ...data } = request.body;
        // const result = await context.instance.update({
        //   ...request.params,
        //   ...data
        // });

        return response.success(null);
      }
    }),
    delete: igniter.mutation({
      method: "DELETE",
      path: "/:id" as const,
      use: [InstanceFeatureProcedure()],
      handler: async ({ request, response, context }) => {
        await context.instance.delete(request.params);
        return response.success(null);
      }
    })
  }
});
