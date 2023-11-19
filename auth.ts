import NextAuth, {NextAuthConfig} from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import {PrismaAdapter} from "@auth/prisma-adapter";
import db from "@/lib/db";
import {cache} from "react";

export const authConfig = {
    trustHost: true,
    adapter: PrismaAdapter(db),
    providers:[GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
    })],
    pages: {
        signIn: '/login',
    },
    callbacks: {
         async signIn({ profile}) {

             const email = profile?.email;

             if(!email) return false;

             const allowedEmails = process.env.ALLOWED_EMAILS?.split(',') ?? [];
            return allowedEmails.includes(email!);
        }
    }
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);

export const getSession = cache(async () => await auth());
