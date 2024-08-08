"use server"
import * as z from "zod";
import { registerInSchema } from "@/lib/zod"
import bcrypt from "bcryptjs"
import prisma from "@/lib/connect"
import { revalidatePath } from "next/cache";


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
        return {error : "Invalid Fields!"}
    }

    const {email, password, username} = validatedFields.data
    const pwHash = await bcrypt.hash(password, 10)

    existingUser = await prisma.user.findFirst({
        where:{
            email: email,
        }
    })

    if(existingUser){
        return {error: "Email already in use!"}
    }

    await prisma.user.create({
        data: {
            username,
            email,
            hashPwd: pwHash
        }
    })
    revalidatePath("/")

    return {success: "User Registered"}
}