"use server"
import * as z from "zod";
import { registerInSchema, signInSchema } from "@/lib/zod"
import bcrypt from "bcryptjs"
import prisma from "@/lib/connect"
import { revalidatePath } from "next/cache";
import { signIn } from "@/app/(auth)/auth";
import { LoginForm } from "@/components";
import { AuthError } from "next-auth";


export const register = async (formdata: FormData) => {
    const value = {
        username: `${formdata.get("username") as string}`,
        email: `${formdata.get("email") as string}`,
        password: `${formdata.get("password") as string}`
    }
    const validatedFields = registerInSchema.safeParse(value)
    console.log("11")
    let existingUser = null
    if(!validatedFields.success){
        console.log("12")
        return {error : "Invalid Fields!😞"}
    }

    const {email, password, username} = validatedFields.data
    const pwHash = await bcrypt.hash(password, 10)

    existingUser = await prisma.user.findFirst({
        where:{
            email: email,
        }
    })

    if(existingUser){
        return {error: "Email already in use!😞"}
    }

    await prisma.user.create({
        data: {
            username,
            email,
            hashPwd: pwHash
        }
    })
    revalidatePath("/register")

    return {success: "User Registered Successfully!!🥳"}
}

export const login = async (formdata: FormData) => {
    const values = {
        email: `${formdata.get("email") as string}`,
        password: `${formdata.get("password") as string}`
    }
    const validatedFields = signInSchema.safeParse(values)
    if(!validatedFields.success){
        return {error: "Invalid fields!"}
    }
    const { email , password } = validatedFields.data
    console.log(email, password)
    try {
        const response = await signIn("credentials",{
            email: email,
            password: password,
            redirect: false,
        })
        console.log(response)
        return {success: "User Login Successfull!!"}
    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type){
                case "CredentialsSignin":
                    return {error: "Invalid credentials!"}
                default: 
                    return {error: "Something went wrong!"}
            }
        }
        throw error
    }
}
