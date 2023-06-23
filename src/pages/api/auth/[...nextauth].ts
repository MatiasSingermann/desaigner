import NextAuth, {type NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { signOut } from "next-auth/react";

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



export default NextAuth ({
    session: {
        strategy: 'jwt'
    },
    adapter: PrismaAdapter(prisma),
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
            credentials: {
            email: { label: "Email", type: "email" },
            contrasenia: { label: "Contrasenia", type: "password" }
            },
            async authorize(credentials) {
                const {email,contrasenia}=credentials as {
                    email: string;
                    contrasenia: string;
                };
                const res = await fetch("http://localhost:3000/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        contrasenia,
                    })
                });

                if(res.ok){
                    console.log(res.json());
                    return res.json();
                }
                else{
                    return null;
                }
            }    
        }),
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: "/login",
        signOut: "/settings",
    },
    callbacks: {
        async jwt({ token, user, trigger, session }){
            if(trigger==="update"){
                return {...token, ...session.user}
            }
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user.email = token.email as string;
            return session;
        },
    },
});
