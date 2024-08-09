import google from "next-auth/providers/google"
import prisma from "@/lib/connect"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "@/lib/zod"
import bcrypt from "bcryptjs"
import { ZodError } from "zod"
import { NextAuthConfig } from "next-auth"
import { emit } from "process"
import email from "next-auth/providers/email"
import { Provider } from "next-auth/providers"
import { error } from "console"

export default {
    providers: [
        Credentials({
            async authorize(credentials): Promise<any> {
                try {
                    let user = null;
                    const validatedFields = await signInSchema.safeParse(credentials)
                    if(validatedFields.success){
                        const { email, password } = validatedFields.data
                        console.log("jkh",email, password)
                        user = await prisma.user.findFirst({
                            where:{
                                email: email,
                            }
                        })
                        if(!user || !user.hashPwd){
                            throw new Error("User not found")
                        }
                        console.log(user, user.hashPwd)
                        const isPwdCorrect = await bcrypt.compare(password, user.hashPwd)
                        if(isPwdCorrect){
                            console.log(isPwdCorrect)
                            return {
                                id: user.id,
                                username: user.username,
                                email: user.email
                            }
                        }
                    }
                } catch (error:any) {
                    if (error instanceof ZodError) {
                        return null
                    }
                }
            }
        })
    ]
} satisfies NextAuthConfig