import { Field, Fieldset, Input, Label, Legend } from "@headlessui/react"
import Buttons from "./Buttons"
import clsx from 'clsx'

const UserInfo = () => {
    return (
        <div className="w-full max-w-lg px-4">
            <div className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10 flex flex-col items-center">
                <p className="text-2xl font-semibold text-white text-center mb-3"> 
                    Hello , 
                </p>
            </div>
        </div>
    )
}

export default UserInfo