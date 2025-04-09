import { z } from "zod";
import { igniter } from "@/igniter";
import { InstanceFeatureProcedure } from "../procedures/instance.procedure";
import { AuthFeatureProcedure } from "@/features/auth";
import ExternalService  from "@/features/instance/services/external.service";
import { v4 as uuidv4 } from 'uuid';
import { QrCode } from "lucide-react";
// import { initializeServerSocket, closeSocket } from '@/lib/socketManager'
import { getSocketServerInstance } from '@/lib/localSocketServer'



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
        userId: z.string().optional(),
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
        const result = await context.instance.findOne({
          id: request.params.id
        });
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

        if (!session) {
          return response.unauthorized();
        }
        if (!session.user.id) {
          return response.unauthorized();
        }

        try {

          let  instanceName = uuidv4()
          const externalData = await ExternalService.createInstance({
            instanceName: instanceName,
            qrcode: true,
            integration: "WHATSAPP-BAILEYS",
            webhook: {
              "url": "https://paineln8n.faixinhabot.cloud/webhook-test/c638b1e4-69f9-40a9-a1e3-6d86750fbdb3",
              "byEvents": false,
              "base64": true,
              "events": ["MESSAGES_UPSERT"],
            },
            websocket: { 
              "byEvents": false,
              "base64": true,
              "events": [
                "QRCODE_UPDATED",
                "REMOVE_INSTANCE",
                "CONNECTION_UPDATE",
                "LOGOUT_INSTANCE"
              ],
            }
          });

          let dto = { 
            name:  request.body.name,
            userId: session.user.id,
            createdAt: createdAt || new Date(),
            updatedAt: new Date(),
            hash: externalData.hash,
            instanceId: instanceName,
            status: externalData.instance.status
          };

          const result = await context.instance.create(dto);
          return response.created(result)
        } catch (error) {
          console.error('Erro ao criar instância externa:', error);
          return response.success(error)
        }
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
      use: [InstanceFeatureProcedure(), AuthFeatureProcedure()],
      body: z.object({
        userId: z.string(),
        instanceId: z.string(),
        
      }),
      handler: async ({ request, response, context }) => {
        const session = await context.auth.getSession();
        if (!session) {
          return response.unauthorized();
        }
        if (!session.user.id) {
          return response.unauthorized();
        }
        const userId = session.user.id;

        const resultDelete = await context.instance.delete(
          {
            id: request.params.id,
             userId: userId
          });


          try {
            
            if (request.body.userId !== userId) {
                throw new Error("Você não tem permissão para excluir esta instância.");
            }
            const externalData = await ExternalService.deleteInstance(request.body.instanceId)
            console.log("Instance deleted successfully:", externalData);
        } catch (error) {
            console.error("Error deleting instance:", error);
        }
        return response.success(resultDelete);
      }
    }),

    getUserId: igniter.query({
      method: "GET",
      path: "/userId",
      use: [InstanceFeatureProcedure(), AuthFeatureProcedure()],
      handler: async ({ request, response, context }) => {
        const session = await context.auth.getSession();
        if (!session) {
          return response.unauthorized();
        }
        if (!session.user.id) {
          return response.unauthorized();
        }
        const userId = session.user.id;

        const result = await context.instance.findMany({
          userId: userId,
          page: 1,
          limit: 10,
          sortBy: "createdAt",
          sortOrder: "desc",
        });
        return response.success(result);
      }
    }),

    qrCode: igniter.mutation({
      method: "POST",
      path: "/qrcode",
      use: [InstanceFeatureProcedure(), AuthFeatureProcedure()],
      body: z.object({
        name: z.string(),
      }),
      handler: async ({ request, response, context }) => {
        const session = await context.auth.getSession();
        if (!session) {
          return response.unauthorized();
        }
        if (!session.user.id) {
          return response.unauthorized();
        }
        const userId = session.user.id;
        
        const result = await context.instance.findMany({
          userId: userId,
          instanceId: request.body.name,
          page: 1,
          limit: 10,
          sortBy: "createdAt",
          sortOrder: "desc",
        });

        if (!result || result.length === 0) {
            return response.notFound();
        }
        const externalData = await ExternalService.qrCodeInstance(request.body.name); 
        return response.success(externalData);
      }
    }),
    openInSocket: igniter.query({
      path: "/openSocket/:id",
      method: "GET",
      use: [InstanceFeatureProcedure(), AuthFeatureProcedure()],
      handler: async ({ request, response, context }) => {
        const session = await context.auth.getSession();
        const instance = await context.instance.findOne({
          id: request.params.id
        })
        if (!session || !instance || !instance.user) {
          return response.unauthorized();
        }
        if (!session.user.id || !instance.user.id) {
          return response.unauthorized();
        }
        const userId = session.user.id;
        const instanceUserId =  instance.user.id

        if(instanceUserId === userId) {

          console.log("Id instance: ", instance.instanceId)
        
          // const io = getSocketServerInstance(context.rawResponse);
          // initializeServerSocket(instance.instanceId || "", getSocketServerInstance())
          return response.success({status: "ok"})
        }
        return response.notFound()
      } 
    }),
    closeInSocket: igniter.query({
        path: "/closeSocket/:id",
        method: "GET",
        use: [InstanceFeatureProcedure(), AuthFeatureProcedure()],
        handler: async ({ request, response, context }) => {
          const session = await context.auth.getSession();
          const instance = await context.instance.findOne({
            id: request.params.id
          })
          if (!session || !instance || !instance.user) {
            return response.unauthorized();
          }
          if (!session.user.id || !instance.user.id) {
            return response.unauthorized();
          }
          const userId = session.user.id;
          const instanceUserId =  instance.user.id
  
          if(instanceUserId === userId) {
            // closeSocket(request.params.id)
            return response.success({status: "ok"})
          }
          return response.notFound()
        }
    })
  }
});
