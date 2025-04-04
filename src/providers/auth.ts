import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { emailOTP, magicLink } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth";

const client = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(client, {
        provider: "postgresql",
    }),
    appName: "Tonify",
    plugins: [
        magicLink({
            sendMagicLink({ email, token, url }, request) {
                // Send email with magic link

                console.log("Sending magic link to email:", email);
                console.log("Magic link token:", token);
                console.log("Magic link URL:", url);
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
