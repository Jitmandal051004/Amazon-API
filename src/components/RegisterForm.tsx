"use client"
import { Button, Field, Fieldset, Input, Label, Legend } from '@headlessui/react'
// import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import Buttons from './Buttons'
import { register } from '@/actions/actions'
import { useRef } from 'react';

export default function RegisterForm() {
    const refer = useRef<HTMLFormElement>(null);
    return (
        <div className="w-full max-w-lg px-4">
            <form action={async formData => {
                refer.current?.reset() 
                await register(formData)
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
                    <Buttons 
                        item='Register with Password'
                    />
                    <div className='border-gray-400 border-2 w-[85%]'></div>
                    <Button type='submit' className="font-semibold rounded-lg bg-sky-600 py-2 px-4 text-lg text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700 w-[85%]">
                        Register with Google
                    </Button>
                </Fieldset>
            </form>
        </div>
    )
}