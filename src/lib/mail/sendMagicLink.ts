// src/lib/mail/sendMagicLink.ts
"use server"
import { transporter } from "./transporter";


export async function sendMagicLinkEmail(email: string, magicLink: string) {
  await transporter.sendMail({
    to: email,
    from: '"Tonify" <no-reply@tonify.com>',
    subject: "Seu link mágico para login",
    html: `
      <h2>🎉 Bem-vindo ao Tonify!</h2>
      <p>Clique no link abaixo para acessar sua conta:</p>
      <a href="${magicLink}" target="_blank">${magicLink}</a>
      <p>Esse link expira em 10 minutos.</p>
    `,
  });
}