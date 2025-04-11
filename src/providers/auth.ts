import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { emailOTP, magicLink } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth";
import { sendMagicLinkEmail } from "@/lib/mail/sendMagicLink"


const client = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(client, {
        provider: "postgresql",
    }),
    appName: "Tonify",
    plugins: [
        magicLink({
            async sendMagicLink({ email, url }) {
              await sendMagicLinkEmail(email, url);
              console.log("✅ Magic link enviado para:", email);
            },
          }),
        emailOTP({
            async sendVerificationOTP({ email, otp, type }, request) {
                // Send email with OTP
            },
        }),
        nextCookies(),
    ],
});
