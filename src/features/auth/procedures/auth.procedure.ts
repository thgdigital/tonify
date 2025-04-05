import { igniter } from "@/igniter";

export const AuthFeatureProcedure = igniter.procedure({
  name: "AuthFeatureProcedure",
  handler: async (options, ctx) => {
    return {
      auth: {
        signIn: async (email: string) => {
          const response =  await ctx.context.providers.auth.api.signInMagicLink({
             headers: ctx.request.headers,
             body: {
                  email,
             }
           })
           return response;
         },
        signOut: async () => {
          const response = await ctx.context.providers.auth.api.signOut({
            headers: ctx.request.headers,
          });
          return response;
         },
         getSession: async () => {
          const session = await ctx.context.providers.auth.api.getSession({
            headers: ctx.request.headers,
          });
          return session;
         },
         user: async () => {
          const user = await ctx.context.providers.auth.api.getSession({
            headers: ctx.request.headers,
          });
          return user?.user;
         }
      },
    };
  },
});
