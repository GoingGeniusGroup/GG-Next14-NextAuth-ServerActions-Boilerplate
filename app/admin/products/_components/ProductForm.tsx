"use client";

import { productSchema } from "@/schemas";
import { useEffect, useState, useTransition } from "react";
import { useForm, useFieldArray,SubmitErrorHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form/FormInput";
import { Spinner } from "@/components/ui/Spinner";
import { addProduct } from "@/actions/product";
import { SelectModel } from "@/components/Model/SelectModel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import ImageInput from "@/components/form/ImageInput";

import { SelectType } from "@/types/orderType";
import TaxModel from "@/components/Model/TaxModel";

interface Props {
  userId: string | undefined;
  categories: SelectType[];
  suppliers: SelectType[];
  taxs: SelectType[];
}
const ProductForm: React.FC<Props> = (props) => {
  const { userId, categories, suppliers, taxs } = props;

  const router = useRouter();
  // const { categories, suppliers, getValues } = useFetchValues();

  // useEffect(() => {
  //   if (userId) {
  //     getValues();
  //   }
  // }, [userId]);
  const [tax, setTax] = useState<SelectType | null>(() => {
    const taxs = localStorage.getItem("tax");
    if (taxs) {
      return JSON.parse(taxs);
    } else {
      return null;
    }
  });

  useEffect(() => {
    if (tax) {
      localStorage.setItem("tax", JSON.stringify(tax));
    }
  }, [tax]);


  const [isPending, startTransition] = useTransition();
  type productType = z.infer<typeof productSchema>;
  const form = useForm<productType>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      image: undefined,
      costPrice: undefined,
      quantityInStock: undefined,
      validity: "",
      discount: undefined,
      salePrice: undefined,
      margin: "",
      tax: "",
      taxRate: tax?.label || "",
      imageUrl:"",
      category: "",
      suppliers: [{ id: "", supplier: "" }],
    },
  });

  const { control, setValue } = form;
  const { fields, append, remove } = useFieldArray({
    name: "suppliers",
    control,
  });


  useEffect(() => {
    if(tax){
      setValue('taxRate', tax.label)
    }
    
  }, [tax])

  const selectedSuppliers = form.watch("suppliers") || [];
  const imageUrl = form.watch("imageUrl") || null

  
  const getAvailableSuppliers = (index: string | number) => {
    const selectedSupplierIds = selectedSuppliers
      .filter((_, i) => i !== index)
      .map((supplier) => supplier?.supplier);

    return suppliers.filter(
      (option) => !selectedSupplierIds.includes(option.value)
    );
  };

  const handleSelectChange = (idx: number, value: string) => {
    const selectedSupplier = suppliers.find(
      (supplier) => supplier.value === value
    );
    if (selectedSupplier) {
      // Update the supplier ID and value in the form state
      setValue(`suppliers.${idx}.id`, selectedSupplier.id);
      setValue(`suppliers.${idx}.supplier`, value);
    }
  };

  const onSubmit = async (values: productType) => {
    const formData = new FormData();
    if (values.image) {
      formData.append("image", values.image);
    }else{
      formData.append("image", '')
    }

    // Append other form fields
    for (const [key, value] of Object.entries(values)) {
      if (key !== "image" && !Array.isArray(value)) {
        formData.append(key, value as string);
      } else if (Array.isArray(value)) {
        // Convert arrays to JSON string
        formData.append(key, JSON.stringify(value));
      }
    }

    startTransition(async () => {
      await addProduct(formData)
        .then((data) => {
          if (!data) return;
          if (!data.success) {
            return toast.error(data.error.message);
          }
          toast.success("product added sucsesfully", {
            autoClose: 2000,
          });

          return router.push("/admin/products");
        })
        .catch((error) => {
          console.log(error);

          toast.error("Something went wrong.", {
            autoClose: 2000,
          });
        });
    });
  };

  const onError: SubmitErrorHandler<productType> = (error: FieldErrors) => {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
  }
  return (
    <div className="container mx-auto flex items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit,onError)}>
          <fieldset disabled={isPending} className="group">
            <div className="flex gap-4 items-center">
             {!imageUrl ?
                <>
             
             <ImageInput
                control={form.control}
                name="image"
                label="Image"
                isPending={isPending}
              />
              <p className="text-gray-600"> OR </p>
              </>:
              " "
             }
              <div className="flex-grow">
                <FormInput
                  control={form.control}
                  name="imageUrl"
                  label="Image URL"
                  type="text"
                  placeholder="Enter image url"
                  isPending={isPending}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row space-y-6 gap-4">
              <div className="space-y-4 ">
                <FormInput
                  control={form.control}
                  name="name"
                  label="Product Name"
                  type="text"
                  placeholder="Enter product name"
                  isPending={isPending}
                />
                <FormInput
                  control={form.control}
                  name="description"
                  label="Description"
                  type="text"
                  placeholder="Enter product description"
                  isPending={isPending}
                />
                <FormInput
                  control={form.control}
                  name="costPrice"
                  label="Cost Price"
                  type="number"
                  placeholder="Enter cost price"
                  isPending={isPending}
                />

                <FormInput
                  control={form.control}
                  name="quantityInStock"
                  label="Quantity in Stock"
                  type="number"
                  placeholder="Enter quantity in stock"
                  isPending={isPending}
                />
                <FormInput
                  control={form.control}
                  name="validity"
                  label="Validity"
                  type="text"
                  placeholder="Enter validity period"
                  isPending={isPending}
                />
              </div>
              <div className="space-y-4">
                <FormInput
                  control={form.control}
                  name="discount"
                  label="Discount"
                  type="number"
                  placeholder="Enter discount"
                  isPending={isPending}
                />
                <FormInput
                  control={form.control}
                  name="salePrice"
                  label="Sale Price"
                  type="number"
                  placeholder="Enter sale price"
                  isPending={isPending}
                />

                <FormInput
                  control={form.control}
                  name="margin"
                  label="Margin"
                  type="text"
                  placeholder="Enter margin"
                  isPending={isPending}
                />

                <div className="flex flex-col gap-2 ">
                  {
                    !tax? <SelectModel
                    control={form.control}
                    name="tax"
                    options={taxs}
                    isPending={isPending}
                    label="Tax"
                    defaultValue="Select a Tax"
                  /> : ""

                  }
                  

                  {tax ? (
                    <FormInput
                      control={form.control}
                      name="taxRate"
                      label="Tax Rate"
                      type="text"
                      value={tax.label}
                      isPending={isPending}
                    />
                  ) : (
                    <>
                      <p className="text-gray-600 text-center"> or </p>

                      <TaxModel setTax={setTax} />
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-4 ">
                {/* Status Category */}

                <SelectModel
                  control={form.control}
                  name="category"
                  options={categories}
                  isPending={isPending}
                  label="Category"
                  defaultValue="Select a category"
                />
                {/* Status suppliers */}
                <div className=" gap-2 ">
                  {fields.map((field, index) => {
                    return (
                      <div
                        className=" form-control flex flex-col  gap-2"
                        key={field.id}
                      >
                        <SelectModel
                          control={form.control}
                          name={`suppliers.${index}.supplier` as const}
                          options={getAvailableSuppliers(index)}
                          isPending={isPending}
                          label={`Supplier ${index + 1}` as const}
                          idx={index}
                          onValueChange={handleSelectChange}
                          id={true}
                          defaultValue="Select a supplier"
                        />
                        {index > 0 && (
                          <Button
                            asChild
                            variant={"outline"}
                            onClick={() => remove(index)}
                          >
                            <div className="text-red-500  hover:text-red-700 cursor-pointer">
                              <Minus className=" h-6 w-6" />
                            </div>
                          </Button>
                        )}
                      </div>
                    );
                  })}
                  {selectedSuppliers.length === suppliers.length ? (
                    <div className="rounded-md p-2 cursor-pointer text-indigo-500 hover:text-indigo-700">
                      No more supplier
                    </div>
                  ) : (
                    <Button
                      asChild
                      variant={"outline"}
                      onClick={() => append({ id: "", supplier: "" })}
                      className="mt-4"
                    >
                      <div className="flex cursor-pointer text-indigo-500 hover:text-indigo-700">
                        <Plus className="mr-2 h-4 w-4 " />
                        Add another supplier
                      </div>
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 space-x-6 text-center mb-5">
              {/* <Modal.Close className="rounded px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-600">
              Cancel
            </Modal.Close> */}

              <Button
                type="submit"
                className=" w-full inline-flex items-center justify-center rounded bg-indigo-500 px-12 py-4 text-sm font-medium text-white hover:bg-indigo-600 group-disabled:pointer-events-none"
              >
                <Spinner className="absolute h-4 group-enabled:opacity-0" />
                <span className="group-disabled:opacity-0">Save</span>
              </Button>
            </div>
          </fieldset>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
