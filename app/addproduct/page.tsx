'use client'

import { useForm } from "react-hook-form"
import { useState } from "react"
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";


type form = {
    productName: string
    productId: number
    expiryDate: Date
    receivedDate: Date
    discount: number
    mrp: number
    price: number
    description: string
    image: string
    category: string
    quantity: number
    brand: string
    subCategory: string
    barcode: string
}

function Form() {
    const form = useForm<form>()
    const { register, control, handleSubmit, formState } = form
    const { errors } = formState

    const onSubmit = (data: form) => {
        console.log('form submitted', data)
    }

    const [hidden, setUnhidden] = useState(true)

    const toggleHidden = () => {
        setUnhidden(!hidden)
    }


    return (
        <div className="flex flex-col items-center bg-black min-h-dvh pt-6">
            <h2 className="text-white text-center capitalize"> add product </h2>
            <AnimatePresence>
                {
                    !hidden && <motion.div
                        initial={{
                            y: 220,
                            opacity: 0.5,
                            // scale: 0.5,
                        }}
                        animate={{
                            opacity: 0.8,
                            // scale: 1,
                            y: 0
                        }}
                        transition={{
                            duration: 0.6,
                            // delay: 0.5,
                            ease: 'easeOut'
                        }}
                        exit={{
                            opacity: 0,
                            // scale: 0.5
                            y: 250
                        }}
                        className={`bg-[rgba(92,136,218,0.51)] w-11/12 rounded-lg capitalize transition-all duration-300 m-5 p-4 `}>
                        <div className="flex justify-end">
                            <button title="Close" className="p-1.5 bg-white rounded-full"
                                onClick={toggleHidden}
                            ><IoClose className="text-2xl font-extrabold" /></button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center" noValidate>
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
                                    <input type="number" {...register("productId", {
                                        required: {
                                            value: true,
                                            message: 'enter product id'
                                        },
                                    })} className="p-2 rounded-md" placeholder="enter product id" />
                                    <p className="text-red-400"> {errors.productId?.message} </p>
                                </div>

                                <div className="flex flex-col justify-center mt-5 gap-2">
                                    <label htmlFor="password" className="text-white">expiry date</label>
                                    <input type="date" {...register("expiryDate", {
                                        required: {
                                            value: true,
                                            message: 'invalid date format'
                                        }
                                    })} className="p-2 rounded-md border-none" />
                                    <p className="text-red-400"> {errors.expiryDate?.message} </p>
                                </div>

                                <div className="flex flex-col justify-center mt-5 gap-2">
                                    <label htmlFor="password" className="text-white">received date</label>
                                    <input type="date" {...register("receivedDate", {
                                        required: {
                                            value: true,
                                            message: 'invalid date format'
                                        }
                                    })} className="p-2 rounded-md border-none" />
                                    <p className="text-red-400"> {errors.receivedDate?.message} </p>
                                </div>
                                <div className="flex flex-col justify-center mt-5 gap-2">
                                    <label htmlFor="password" className="text-white">price</label>
                                    <input type="number" {...register("price", {
                                        required: {
                                            value: true,
                                            message: 'enter price'
                                        }
                                    })} className="p-2 rounded-md border-none" placeholder="enter price" />
                                    <p className="text-red-400"> {errors.price?.message} </p>
                                </div>

                                <div className="flex flex-col justify-center mt-5 gap-2">
                                    <label htmlFor="password" className="text-white">barcode</label>
                                    <input type="text" {...register("barcode", {
                                        required: {
                                            value: true,
                                            message: 'invalid barcode format'
                                        }
                                    })} className="p-2 rounded-md border-none" placeholder="enter barcode" />
                                    <p className="text-red-400"> {errors.barcode?.message} </p>
                                </div>

                            </div>
                            <button className="mt-5 p-2 rounded-lg w-28 bg-blue-500 text-white/80 hover:text-white hover:bg-blue-700 ">Submit</button>
                        </form>
                    </motion.div>
                }
            </AnimatePresence>

            <div className={`absolute bottom-4 ${!hidden ? 'hidden' : ''}`}>
                <button onClick={toggleHidden} className="mt-5 p-3 bg-gray-400 rounded-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 text-white/80 hover:text-white capitalize flex justify-center gap-8 items-center"><span className="pl-2.5">add product</span> <span className="h-full w-8 rounded-full inline-block bg-blue-500 text-2xl">+</span></button>
            </div>
        </div>
    )
}

export default Form
