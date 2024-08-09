// "use client"
import { auth, signOut } from "@/app/(auth)/auth"
import { Button } from "@headlessui/react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const UserInfo = async () => {
    const session = await auth()
    const username = session?.user.name
    const userEmail = session?.user.email

    return (
        <div className="w-full max-w-lg px-4">
            <div className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10 flex flex-col items-center">
                <p className="text-2xl font-semibold text-white text-center mb-3"> 
                    Hello, {username} [{userEmail}]
                </p>
                <form
                action={async()=>{
                    "use server"
                    await signOut()
                }}>
                    <Button type='submit' className="font-semibold rounded-lg bg-sky-600 py-2 px-4 text-lg text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700 w-full">
                        Signout
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default UserInfo