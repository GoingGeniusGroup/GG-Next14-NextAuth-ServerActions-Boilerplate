"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";


interface Images {
  qr: React.ReactElement;
  qrgif: React.ReactElement;
  flag: React.ReactElement;
  nfc: React.ReactElement;
}

const Card: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleFlip = (): void => {
    setIsFlipped((prev) => !prev);
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

  return (
    <div className="flex items-center justify-center text-white">
      <div
        className={`w-[318px] h-[201px] rounded-lg bg-transparent shadow-xl p-3 bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border border-gray-100 relative duration-300 ${isFlipped ? "" : ""
          }`}
      >
        {isFlipped ? (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-[#FFD700]">GG</h2>
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
              <h2 className="text-lg font-bold text-[#FFD700]">GG</h2>
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
    </div>
  );
};

export default Card;


