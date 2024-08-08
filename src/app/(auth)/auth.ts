import NextAuth from "next-auth"
import google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/connect"
import credentials from "next-auth/providers/credentials"
import { signInSchema } from "@/lib/zod"
import bcrypt from "bcryptjs"
import { ZodError } from "zod"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    providers: [
        credentials({
            id: "Credentials",
            name: "Credentials",
            credentials: {
                username: {},
                email: {},
                password: {},
            },
            async authorize(credentials): Promise<any> {
                try {
                    let user = null;
                    const {email, password} = await signInSchema.parseAsync(credentials)

                    const pwHash = await bcrypt.hash(password, 10)
                    user = await prisma.user.findFirst({
                        where:{
                            email: email,
                        }
                    })
                    if(!user){
                        throw new Error("User not found.")
                    }
                    const hashPwd = user.hashPwd as string
                    const isPwdCorrect = await bcrypt.compare(pwHash, hashPwd)
                    if(isPwdCorrect){
                        return user
                    }else{
                        throw new Error ("Incorrect Password")
                    }
                } catch (error:any) {
                    if (error instanceof ZodError) {
                        // Return `null` to indicate that the credentials are invalid
                        return null
                    }
                }
            }
        }),
        google],
    pages: {
        signIn: "/sign-in",
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
                session.user.name = token.name
            }
            return session
        }
    }
})