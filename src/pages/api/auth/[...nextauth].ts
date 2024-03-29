import NextAuth from "next-auth";
import type { Session, SessionStrategy, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;


if (!GOOGLE_CLIENT_ID) {
    throw new Error("Google ID is missing in .env file WTH OMG :O >:(");
}
if (!GOOGLE_CLIENT_SECRET) {
    throw new Error("Google secret is missing in .env file WTH OMG :O >:(");
}
if (!DISCORD_CLIENT_ID) {
    throw new Error("Discord ID is missing in .env file WTH OMG :O >:(");
}
if (!DISCORD_CLIENT_SECRET) {
    throw new Error("Discord secret is missing in .env file WTH OMG :O >:(");
}

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt' as SessionStrategy | undefined,
        maxAge: 30 * 60
    },
    secret: process.env.JWT_SECRET,
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        }),
        DiscordProvider({
            clientId: DISCORD_CLIENT_ID,
            clientSecret: DISCORD_CLIENT_SECRET
        }),
        CredentialsProvider({
            type: 'credentials',
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                contrasenia: { label: "Contrasenia", type: "password" }
            },
            async authorize(credentials) {
                const { email, contrasenia } = credentials as {
                    email: string;
                    contrasenia: string;
                };
                const res = await fetch("https://desaigner.vercel.app/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        contrasenia,
                    })
                })

                if (res.ok) {
                    return {
                        id: email,
                    };
                }
                else {
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
        signOut: "/settings",
    },
    callbacks: {
        jwt({ token, user }: {
            token: JWT;
            user: User;
        }) {
            if (user) {
                token.email = user.id;
            }

            return token;
        },
        session({ session, token }: {
            session: Session;
            token: JWT;
        }) {
            if (token) {
                session.user.email = token.email as string;
            }

            return session;
        }
    }
}

export default NextAuth(authOptions);
