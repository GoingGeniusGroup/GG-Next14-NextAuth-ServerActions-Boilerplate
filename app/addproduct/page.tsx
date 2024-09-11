'use client'

import { useForm } from "react-hook-form"
import { DevTool } from '@hookform/devtools'
import { useState } from "react"

const renderCount: number = 0

type form = {
    productName: string
    productId: string
    expiryDate: string
    receivedDate: string
    discount: string
    mrp: string
    price: string
    description: string
    image: string
    category: string
    quantity: string
    brand: string
    subCategory: string
}

function Form() {
    const form = useForm<form>()
    const { register, control, handleSubmit, formState } = form
    const { errors } = formState

    const onSubmit = (data: form) => {
        console.log('form submitted', data)
    }

    const [hidden, setUnhidden] = useState(true)
    const [renderCount, setRenderCount] = useState(false)

    const toggleHidden = () => {
        setUnhidden(!hidden)    
    }
    const togglePopup = () => {
        setRenderCount(!renderCount)    
    }

    return (
        <div className="flex flex-col justify-center items-center bg-black min-h-dvh pt-6">
            <h2 className="text-white text-center capitalize"> add product </h2>

            <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col justify-center m-5 p-4 bg-[rgba(92,136,218,0.51)] w-11/12 rounded-lg capitalize transition-all duration-300 ${hidden ? 'hidden' : ''}`} noValidate>
                <div className="absolute top-[9.8rem] right-16">
                    <button className={`p-2 w-11 bg-gray-400 rounded-full text-white/80 hover:text-white`} onClick={togglePopup}><span className="text-lg">x</span ></button>
                </div>
                <div className="flex flex-wrap w-full gap-3">

                    <div className="flex flex-col justify-center mt-5 gap-2">
                        <label htmlFor="email" className="text-white/90 capitalize">product name</label>
                        <input type="text" {...register("productName", {
                            required: {
                                value: true,
                                message: 'enter product name'
                            }
                        })} className="p-2 rounded-md" placeholder="enter email" />
                        <p className="text-red-400"> {errors.productName?.message} </p>
                    </div>

                    <div className="flex flex-col justify-center mt-5 gap-2">
                        <label htmlFor="channel" className="text-white capitalize">product id</label>
                        <input type="text" {...register("productId", {
                            required: {
                                value: true,
                                message: 'enter product id'
                            },
                        })} className="p-2 rounded-md" placeholder="enter channel name" />
                        <p className="text-red-400"> {errors.productId?.message} </p>
                    </div>

                    <div className="flex flex-col justify-center mt-5 gap-2">
                        <label htmlFor="password" className="text-white">expiry date</label>
                        <input type="text" {...register("expiryDate", {
                            required: {
                                value: true,
                                message: 'enter product expiry date'
                            }
                        })} className="p-2 rounded-md border-none" placeholder="enter password" />
                        <p className="text-red-400"> {errors.expiryDate?.message} </p>
                    </div>

                    <div className="flex flex-col justify-center mt-5 gap-2">
                        <label htmlFor="password" className="text-white">received date</label>
                        <input type="text" {...register("receivedDate", {
                            required: {
                                value: true,
                                message: 'enter product receive date'
                            }
                        })} className="p-2 rounded-md border-none" placeholder="enter password" />
                        <p className="text-red-400"> {errors.receivedDate?.message} </p>
                    </div>
                    <div className="flex flex-col justify-center mt-5 gap-2">
                        <label htmlFor="password" className="text-white">price</label>
                        <input type="text" {...register("price", {
                            required: {
                                value: true,
                                message: 'enter price'
                            }
                        })} className="p-2 rounded-md border-none" placeholder="enter password" />
                        <p className="text-red-400"> {errors.price?.message} </p>
                    </div>

                    <div className="flex flex-col justify-center mt-5 gap-2">
                        <label htmlFor="password" className="text-white">barcode</label>
                        <input type="text" {...register("receivedDate", {
                            required: {
                                value: true,
                                message: 'invalid password'
                            }
                        })} className="p-2 rounded-md border-none" placeholder="enter password" />
                        <p className="text-red-400"> {errors.receivedDate?.message} </p>
                    </div>

                </div>
                <button className="mt-5 p-2 rounded-lg w-28 bg-blue-500 text-white/80 hover:text-white hover:bg-blue-700 ">Submit</button>
            </form>
            <div className={`relative mb-5 ${renderCount ? 'hidden' : ''}`}>
                <button onClick={toggleHidden} className="mt-5 p-3 bg-gray-400 rounded-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 text-white/80 hover:text-white capitalize flex justify-center gap-8 items-center"><span className="pl-2.5">add product</span> <span className="h-full w-8 rounded-full inline-block bg-blue-500 text-2xl">+</span></button>
            </div>
            <DevTool control={control} />
        </div>
    )
}

export default Form
