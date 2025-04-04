import { prisma } from "@/providers/prisma";
import { auth } from "@/providers/auth";
import { authClient } from "@/providers/auth-client";

/**
 * @description Create the context of the application
 *
 * @returns {Object} The application context containing providers
 */
export const createIgniterAppContext = () => {
  return {
    providers: {
      database: prisma,
      auth: auth,
      authClient: authClient,
    }
  }
}

/**
 * @description The context of the application  
 * 
 * @type {Object} context The context object containing providers
 * @property {Object} providers The providers used in the application
 * @property {Object} providers.database The Prisma database provider
 */
export type IgniterAppContext = Awaited<ReturnType<typeof createIgniterAppContext>>;