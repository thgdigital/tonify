import { igniter } from "@/igniter";


export const SocketFeatureProcedure = igniter.procedure({
  name: "SocketFeatureProcedure",
  handler: async (_, { context }) => {
    return {
      socket: {
        hello: async (): Promise<{ message: string }> => {

context.providers.database


          return { message: 'Hello from Socket feature!' };
        }
      }
    };
  },
});
