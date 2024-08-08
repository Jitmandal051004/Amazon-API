import { Authbox, RegisterForm } from '@/components'
import React from 'react'

const page = () => {
    return (
        <div className="flex h-screen w-full justify-center items-center">
            <div className='w-full flex justify-center items-center'>
                <RegisterForm />
            </div>
        </div>
    )
}

export default page