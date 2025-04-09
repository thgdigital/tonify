import { igniter } from "@/igniter";
import { SocketFeatureProcedure } from "../procedures/socket.procedure";

export const SocketController = igniter.controller({
  name: "socket",
  path: "/socket",
  actions: {
    hello: igniter.query({
      method: "GET",
      path: "/hello",
      use: [SocketFeatureProcedure()],
      handler: async ({ response, context }) => {
        console.log("teste")
        const result = await context.socket.hello();
        return response.success(result);
      }
    }),


  }
});
