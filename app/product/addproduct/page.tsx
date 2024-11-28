"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

type form = {
  productName: string;
  productId: number;
  expiryDate: Date;
  receivedDate: Date;
  discount: number;
  mrp: number;
  price: number;
  description: string;
  image: string;
  category: string;
  quantity: number;
  brand: string;
  subCategory: string;
  barcode: string;
};

const containerVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 100 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.42, 0, 0.58, 1],
      staggerChildren: 0.15,
    },
  },
  exit: { opacity: 0, y: 100, transition: { duration: 0.3, ease: "easeIn" } },
};

function Form() {
  const form = useForm<form>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  // console.log(form);

  const onSubmit = (data: form) => {
    console.log("form submitted", data);
  };

  return (
    <div className="flex flex-col items-center min-h-dvh pt-6 rounded-md overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100 h-full w-full">
      <h2 className="text-white text-center capitalize">add product</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-[rgba(35,35,37,0.51)] rounded-lg capitalize transition-all duration-300 m-5 p-4"
      >
        {/* <div className="flex justify-end">
                        <button title="Close" className="p-1.5 bg-white rounded-full "
                            onClick={toggleHidden}
                        ><IoClose className="text-2xl font-extrabold" /></button>
                    </div> */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-3 justify-end"
          noValidate
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 w-full">
            <div className="flex flex-col justify-center mt-5 gap-2">
              <label
                htmlFor="productImage"
                className="text-white/90 capitalize"
              >
                product image
              </label>
              <input
                type="file"
                name="productImage"
                aria-label="Select product image"
                className="p-2 rounded-md border-none"
              />
            </div>

            <div className="flex flex-col justify-center mt-5 gap-2">
              <label htmlFor="email" className="text-white/90 capitalize">
                product name
              </label>
              <input
                type="text"
                {...register("productName", {
                  required: {
                    value: true,
                    message: "enter product name",
                  },
                })}
                className="p-2 rounded-md"
                placeholder="enter product name"
              />
              <p className="text-red-400"> {errors.productName?.message} </p>
            </div>

            <div className="flex flex-col justify-center mt-5 gap-2">
              <label htmlFor="channel" className="text-white capitalize">
                product id
              </label>
              <input
                type="number"
                {...register("productId", {
                  required: {
                    value: true,
                    message: "enter product id",
                  },
                })}
                className="p-2 rounded-md"
                placeholder="enter product id"
              />
              <p className="text-red-400"> {errors.productId?.message} </p>
            </div>

            <div className="flex flex-col justify-center mt-5 gap-2">
              <label htmlFor="expiryDate" className="text-white">
                expiry date
              </label>
              <input
                type="date"
                {...register("expiryDate", {
                  required: {
                    value: true,
                    message: "invalid date format",
                  },
                })}
                className="p-2 rounded-md border-none"
              />
              <p className="text-red-400"> {errors.expiryDate?.message} </p>
            </div>

            <div className="flex flex-col justify-center mt-5 gap-2">
              <label htmlFor="receivedDate" className="text-white">
                received date
              </label>
              <input
                type="date"
                {...register("receivedDate", {
                  required: {
                    value: true,
                    message: "invalid date format",
                  },
                })}
                className="p-2 rounded-md border-none"
              />
              <p className="text-red-400"> {errors.receivedDate?.message} </p>
            </div>

            <div className="flex flex-col justify-center mt-5 gap-2">
              <label htmlFor="price" className="text-white">
                price
              </label>
              <input
                type="number"
                {...register("price", {
                  required: {
                    value: true,
                    message: "enter price",
                  },
                })}
                className="p-2 rounded-md border-none"
                placeholder="enter price"
              />
              <p className="text-red-400"> {errors.price?.message} </p>
            </div>

            <div className="flex flex-col justify-center mt-5 gap-2">
              <label htmlFor="barcode" className="text-white">
                barcode
              </label>
              <input
                type="text"
                {...register("barcode", {
                  required: {
                    value: true,
                    message: "invalid barcode format",
                  },
                })}
                className="p-2 rounded-md border-none"
                placeholder="enter barcode"
              />
              <p className="text-red-400"> {errors.barcode?.message} </p>
            </div>
            <div className="flex flex-col justify-center mt-5 gap-2">
              <label htmlFor="barcode" className="text-white">
                barcode
              </label>
              <input
                type="text"
                {...register("barcode", {
                  required: {
                    value: true,
                    message: "invalid barcode format",
                  },
                })}
                className="p-2 rounded-md border-none"
                placeholder="enter barcode"
              />
              <p className="text-red-400"> {errors.barcode?.message} </p>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="mt-5 p-2 rounded-lg w-28 bg-blue-500 text-white/80 hover:text-white hover:bg-blue-700 ">
              Submit
            </button>
          </div>
        </form>
      </motion.div>

      {/* <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className={`absolute bottom-4 ${!hidden ? 'hidden' : ''}`}
                >
                    <button onClick={toggleHidden} className="mt-5 p-3 bg-gray-400 rounded-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 text-white/80 hover:text-white capitalize flex justify-center gap-8 border border-blue-800 items-center">
                        <span className="pl-2.5">add product</span>
                        <span className="h-full w-8 rounded-full inline-block bg-blue-500 text-2xl">+</span>
                    </button>
                </motion.div>
            </AnimatePresence> */}
    </div>
  );
}

export default Form;
