import { igniter } from "@/igniter";
import type { IgniterAppContext } from "@/igniter.context";

export const BetterAuthFeatureProcedure = () =>
  igniter.procedure<IgniterAppContext, { session: any; userId: string }>({
    name: "BetterAuthFeatureProcedure",
    handler: async (_, { context }) => {
      const session = await context.providers.auth.api.getSession({
        headers: new Headers()
      });
      
      if (!session || !session.user || !session.user.id) {
        throw new Error("Unauthorized");
      }

      return {
        session,
        userId: session.user.id,
      };
    }
  });