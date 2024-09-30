"use client";
import { useEffect, useState } from "react";
// import Add from "./Add";
import { Product, ProductVariant } from "@prisma/client";

import AddCart from "../Cart/AddCart";

const CustomizeProducts = ({
  productId,
  variants,
  productOptions,
  quantityInStock,
  setVarPriceDiscout,
  amount
}: {
  productId: string;
  variants: any[];
  productOptions?: any[];
  quantityInStock: number;
  setVarPriceDiscout: (priceDiscount: [string, number]) => void;
  amount:number
}) => {
  const [selectedOptions, setSelectedOptions] = useState<
    { [key: string]: string[] }[]
  >([]);

  const productVarIds = selectedOptions.map((selectVar) => {
    return Object.values(selectVar).map((v) => {
      return productOptions?.find(
        (product_var) => product_var.option.value === v[0]
      )?.id;
    })[0];
  });

  const presentVarient = (var_opt: string): boolean => {
    return !productOptions?.find(
      (product_var) => product_var.option.value === var_opt
    );
  };

  const handleClick = (var_name: string, var_opt: string) => {
    setSelectedOptions((prevOptions) => {
      const options = [...prevOptions]; // Copy previous options
      const productVar = productOptions?.find(
        (product_var) =>
          product_var.option.value === var_opt &&
          product_var.variant.name === "Size"
      );
      const index = options.findIndex(
        (option) => Object.keys(option)[0] === var_name
      );

      if (index > -1) {
        // Create a shallow copy of the object at index
        const optionCopy = { ...options[index] };
        const isPresent = optionCopy[var_name].includes(var_opt);

        if (isPresent) {
          // If the option is present, remove it
          optionCopy[var_name] = optionCopy[var_name].filter(
            (opt_name) => opt_name !== var_opt
          );
          // setVarPriceDiscout(["", 0])
        } else {
          // If the option is not present, add it
          optionCopy[var_name] = [
            ...optionCopy[var_name].filter((opt_name) => opt_name !== var_opt),
            var_opt,
          ];

          // setVarPriceDiscout([productVar?.discount , productVar?.salePrice ])
        }

        // Update the object at the correct index
        options[index] = optionCopy;
      } else {
        // If the key doesn't exist, create a new object
        options.push({ [var_name]: [var_opt] });
        //setVarPriceDiscout([productVar?.discount , productVar?.salePrice ])
      }

      options.forEach((selectVar) => {
        for (const [key, value] of Object.entries(selectVar)) {
          if (key === "Size") {
            const opt_value = value[value.length - 1]; // Get the last element
            const productVar = productOptions?.find(
              (product_var) => product_var.option.value === opt_value
            );


            if (productVar) {
              setVarPriceDiscout([productVar.discount, productVar.salePrice]);
            } else {
              setVarPriceDiscout(["", 0]);
            }
          }
        }
      });

      return options;
    });
  };

  const isClicked = (var_name: string, var_opt: string) => {
    const index = selectedOptions.findIndex(
      (option) => Object.keys(option)[0] === var_name
    );
    if (index > -1) {
      return selectedOptions[index][var_name].includes(var_opt);
    }
    return false;
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        {variants.map((varient) =>
          varient.name === "Size" ? (
            <div className="flex flex-col gap-4" key={varient.value}>
              <h4 className="font-medium">Choose a {varient.name}</h4>
              <ul className="flex items-center gap-3">
                {/* Size */}
                {varient.options?.map((option) => (
                  <li
                    className="ring-1 ring-lama text-lama rounded-md py-1 px-4 text-sm"
                    style={{
                      cursor: presentVarient(option.value)
                        ? "not-allowed"
                        : "pointer",
                      backgroundColor: isClicked(varient.name, option.value)
                        ? "#f35c7a"
                        : presentVarient(option.value)
                        ? "#FBCFE8"
                        : "white",
                      color:
                        isClicked(varient.name, option.value) ||
                        presentVarient(option.value)
                          ? "white"
                          : "#f35c7a",
                      boxShadow: presentVarient(option.value) ? "none" : "",
                    }}
                    key={varient.id}
                    onClick={() => {
                      if (!presentVarient(option.value)) {
                        handleClick(varient.name, option.value);
                      }
                    }}
                  >
                    {option.value}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <>
              {/* COLOR */}

              <div className="flex flex-col gap-4" key={varient.value}>
                <h4 className="font-medium">Choose a {varient.name}</h4>
                <ul className="flex items-center gap-3">
                  {varient.options?.map((option) => (
                    <li
                      className="w-8 h-8 rounded-full ring-1 ring-gray-300 relative flex items-center justify-center "
                      style={{
                        cursor: presentVarient(option.value)
                          ? "not-allowed"
                          : "pointer",
                        backgroundColor: option.value,

                        boxShadow: presentVarient(option.value) ? "none" : "",
                      }}
                      key={varient.id}
                      onClick={() => handleClick(varient.name, option.value)}
                    >
                      {isClicked(varient.name, option.value) && (
                        <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      )}
                      {presentVarient(option.value) && (
                        <div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )
        )}

        <AddCart
          productId={productId}
          stockNumber={quantityInStock}
          productVariantIds={productVarIds}
          amount= { amount}
        />
      </div>
    </>
  );
};

export default CustomizeProducts;
