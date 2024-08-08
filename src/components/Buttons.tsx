"use client"
import { Button } from '@headlessui/react'
import { useFormStatus } from 'react-dom'

type content = {
    item : string
}

const Buttons = ({item}:content) => {
    const {pending} =  useFormStatus()
    return (
        <Button type='submit' className="font-semibold rounded-lg bg-sky-600 py-2 px-4 text-lg text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700 w-[85%]">
            {
                pending ? "Saving in Process..." : item
            }
        </Button>
    )
}

export default Buttons