"use client"
import { Button, Field, Fieldset, Input, Label, Legend } from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import Buttons from './Buttons'
import { register } from '@/actions/actions'
import { useRef, useState } from 'react';
import Link from 'next/link'
import StatusMsg from './StatusMsg'

interface RegisterErrorResponse {
    error: string;
    success?: undefined;
}

interface RegisterSuccessResponse {
    success: string;
    error?: undefined;
}

type RegisterResponse = RegisterErrorResponse | RegisterSuccessResponse;

export default function RegisterForm() {
    const refer = useRef<HTMLFormElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const handleClick = () => {
        alert("Amazon API credential doesn't exist")
    }
    return (
        <div className="w-full max-w-lg px-4">
            <form ref={refer} action={async formData => {
                refer.current?.reset() 
                const {error, success}: RegisterResponse = await register(formData)
                if(error){
                    setError(error ?? null)
                    setSuccess(null)
                }else if(success){
                    setSuccess(success ?? null);
                    setError(null);
                }
                
            }}>
                <Fieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10 flex flex-col items-center">
                    <Legend className="text-2xl font-semibold text-white text-center mb-3">
                        Amazon Login
                    </Legend>
                    <Field className="w-[85%]">
                        <Label className="text-lg font-medium text-white">
                            Username
                        </Label>
                        <Input
                            id='username'
                            name='username'
                            type='text'
                            className={clsx(
                            'mt-3 block w-full rounded-lg border-none bg-white/5 py-2.5 px-3 text-sm/6 text-white',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                            )}
                        />  
                    </Field>
                    <Field className="w-[85%]">
                        <Label className="text-lg font-medium text-white">
                            Email
                        </Label>
                        <Input
                            id='email'
                            name='email'
                            type='text'
                            className={clsx(
                            'mt-3 block w-full rounded-lg border-none bg-white/5 py-2.5 px-3 text-sm/6 text-white',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                            )}
                        />  
                    </Field>
                    <Field className="w-[85%]">
                        <Label className="text-lg font-medium text-white">
                            Password
                        </Label>
                        <Input
                            id='password'
                            name='password'
                            type='text'
                            className={clsx(
                            'mt-3 block w-full rounded-lg border-none bg-white/5 py-2.5 px-3 text-sm/6 text-white',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                            )}
                        />  
                    </Field>
                    {error && <StatusMsg msg={error} StatColor="red"/>}
                    {success && <StatusMsg msg={success} StatColor="green"/>}
                    <Buttons 
                        item='Register with Password'
                    />
                    <div className='border-gray-400 border-2 w-[85%]'></div>
                    <Button onClick={handleClick} type='submit' className="font-semibold rounded-lg bg-sky-600 py-2 px-4 text-lg text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700 w-[85%]">
                        Register with Amazon
                    </Button>
                    <Link href="/login" className='hover:text-zinc-400 hover:border-zinc-400 border-zinc-300 border-b-2 px-1'>Already User, Please Login from here</Link>
                </Fieldset>
            </form>
        </div>
    )
}