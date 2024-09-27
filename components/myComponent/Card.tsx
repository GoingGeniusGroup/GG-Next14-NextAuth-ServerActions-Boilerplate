"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";


interface Images {
  qr: React.ReactElement;
  qrgif: React.ReactElement;
  flag: React.ReactElement;
  nfc: React.ReactElement;
}

type form = {
  couponCode: string
  recharge: number
  security: number
}

const Card: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const couponForm = useForm<form>();
  const { register: registerCoupon, handleSubmit: handleSubmitCoupon, formState: formStateCoupon } = couponForm;
  const { errors: errorsCoupon } = formStateCoupon;

  const codeForm = useForm<form>();
  const { register: registerCode, handleSubmit: handleSubmitCode, formState: formStateCode } = codeForm;
  const { errors: errorsCode } = formStateCode;

  const couponSubmit = (data: form) => {
    console.log('Coupon form submitted', data);
  };

  const codeSubmit = (data: form) => {
    console.log('Code form submitted', data);
  };

  const images: Images = useMemo(
    () => ({
      qr: <Image src='/mixed/qr.svg' height={72} width={72} alt="QR" className="absolute top-16 right-8" />,
      qrgif: <Image src="/mixed/qr.gif" height={116} width={116} alt="QR Animation" className="absolute top-[42px] right-[10.6px] opacity-0 hover:opacity-100 transition-opacity duration-300" />,
      flag: <Image src='/mixed/flag.svg' height={22} width={22} alt="flag" />,
      nfc: <Image src="/mixed/NFC.svg" height={27} width={27} alt="NFC" />,
    }),
    []
  );

  const handleFlip = (): void => {
    setIsFlipped((prev) => !prev);
  };

  return (

    <div className="flex flex-col items-center text-white w-[340px]  bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100 rounded-md" >
      <div
        className={`w-[318px] h-[201px] rounded-lg bg-transparent shadow-xl p-3 bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border border-gray-100 relative duration-300 mt-4 ${isFlipped ? "" : ""
          }`}
      >
        {isFlipped ? (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-[#FFD700] bg-black/25 rounded-full px-3">GG</h2>
            </div>
            <div className="pl-4 pt-[18px]">
              <h3 className="text-xs font-bold mb-[42px]">Skill</h3>
              <h3 className="text-xs font-bold">Tools</h3>
            </div>
            <div>
              {images.qr}
              {images.qrgif}
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center">
              {images.flag}
              <h2 className="text-lg font-bold text-[#FFD700] bg-black/25 rounded-full px-3">GG</h2>
            </div>
            <div className="pl-5 pt-6">
              <h1 className="text-xs font-bold mb-2">12D019H810N</h1>
              <div className="flex justify-between flex-row mb-2">
                <p className="text-2xl font-bold">ROHIT SHRESTHA</p>
                {images.nfc}
              </div>
              <p className="text-xs font-bold">21</p>
            </div>
          </>
        )}
        <div className="text-right mt-7">
          <a
            className="text-[#00BBFF] text-xs hover:bg-slate-400 cursor-pointer absolute right-4 bottom-1 px-3 py-2 rounded-md"
            onClick={handleFlip}
          >
            {isFlipped ? "Back" : "View More"}
          </a>
        </div>
      </div>
      <div className="w-11/12 p-4">
        <div className="flex flex-col gap-2 mt-2 w-full">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold">Coupon Code</p>
            <form onSubmit={handleSubmitCoupon(couponSubmit)}>
              <input type="text" className="bg-blue-200 text-white p-2 rounded-md w-full 3/5" {...registerCoupon("couponCode", {
                required: {
                  value: true,
                  message: 'enter coupon code'
                }
              })} placeholder="Enter coupon code" />
              <p className={`text-red-500 text-xs ${errorsCoupon.couponCode ? 'bg-black/60 rounded-md mt-2 inline-block p-1.5' : ''}`}> {errorsCoupon.couponCode?.message} </p>
              <button className="bg-blue-500 text-white p-2.5 rounded-md w-full mt-4" >Redeem</button>
            </form>
          </div>
          <hr className="w-full" />
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold">Enter code</p>
            <form onSubmit={handleSubmitCode(codeSubmit)}>
              <div className="flex flex-row justify-between gap-2">
                <input type="text" className="bg-blue-200 text-white p-2 rounded-md w-full 3/5" {...registerCode("recharge", {
                  required: {
                    value: true,
                    message: 'enter recharge amount'
                  }
                })} placeholder="Enter recharge amount" />
                <input type="number" className="bg-blue-200 text-white p-2 rounded-md w-3/4" {...registerCode("security", {
                  required: {
                    value: true,
                    message: 'enter security code'
                  }
                })} placeholder="Enter security code" />
              </div>

              <p className={`text-red-500 text-xs ${errorsCode.security ? 'bg-black/60 rounded-md mt-2 inline-block p-1.5' : ''}`}> {errorsCode.security?.message} </p>
              <div className="flex justify-between mt-4">
                <button className="bg-blue-500 text-white p-2.5 rounded-md w-full"  >Top-up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;


