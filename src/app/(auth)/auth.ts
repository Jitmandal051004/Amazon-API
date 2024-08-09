import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/connect"
import authConfig from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    ...authConfig,
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    callbacks: {
        async jwt({token, user}){
            const dbUser = await prisma.user.findFirst({
                where: {
                email: token.email ?? '',
                }
            })
            if(!dbUser){
                if(user?.id){
                token.id = user!.id
                }
                return token
            }
            console.log(token, dbUser.username)
            return{
                ...token,
                id: dbUser.id,
                username: dbUser.username
            };
        },
        async session({session, token}){
            console.log("session callback", {session, token});
            if(token){
                session.user.id = token.id
                session.user.name = token.username
            }
            return session
        }
    },
})