"use client";

import { productSchema } from "@/src/schemas";

import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import FormInput from "./FormInput";

import { Spinner } from "@/components/ui/Spinner";

import { SelectModel } from "@/components/ui/select";
import { addProduct } from "@/src/server-actions/product/product";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ImageInput from "./ImageInput";
import { Minus, Plus } from "lucide-react";

import { useSession } from "next-auth/react";
import { useFetchValues } from "@/src/hooks/useFetchValues";
import { onChange } from "react-toastify/dist/core/store";
import { error } from "console";
import { useFormState } from "react-dom";

const categories = [
  { label: "category1", value: "Category 1" },
  { label: "category2", value: "Category 2" },
];
const productstatus = [
  { label: "Available", value: "AVAILABLE" },
  { label: "Not Available", value: "NOTAVAILABLE" },
];

type Supplier = {
  id: string;
  supplier: string;
};

// type SupplierPros = Supplier[];
const ProductForm: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { categories, suppliers, isLoading, getValues } = useFetchValues();

  // const [state, action] =  useFormState(addProduct, undefined)

  const userId = session?.user?.id;

  useEffect(() => {
    if (userId) {
      const fetchValues = async () => {
        return await getValues();
      };
      fetchValues();
    }
  }, [userId]);

  const [isPending, startTransition] = useTransition();
  const [saving, setSaving] = useState<boolean>(false);
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
      discount: "",
      salePrice: undefined,
      margin: "",
      status: undefined,
      category: "",
      suppliers: [{ id: "", supplier: "" }],
    },
  });
  const { control, setValue } = form;
  const { fields, append, remove } = useFieldArray({
    name: "suppliers",
    control,
  });
  const selectedSuppliers = form.watch("suppliers") || [];

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

  // const onSubmit: SubmitHandler<productType> = (data:productType) => {
  //      setSaving(true);
  //     console.log("Submitted Data:", data);
  //   };
  //   const onInvalid: SubmitErrorHandler<FormData> = (errors) => {
  //     console.log("Validation Errors:", errors);
  //   };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (values: productType) => {
    const formData = new FormData();
    if (values.image) {
      formData.append("image", values.image);
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

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="container mx-auto flex items-center justify-center">
      <Form {...form}>
        <form
          // ref={formRef}
          // action={action}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <fieldset disabled={saving} className="group">
            <ImageInput
              control={form.control}
              name="image"
              label="Image"
              isPending={isPending}
            />

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
                  type="text"
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
              </div>
              <div className="space-y-4">
                {/* Status Select */}

                <SelectModel
                  control={form.control}
                  name="status"
                  options={productstatus}
                  isPending={isPending}
                  label="Status"
                  defaultValue="Select a status"
                />
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
                        Add new supplier
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
                className="inline-flex items-center justify-center rounded bg-indigo-500 px-12 py-4 text-sm font-medium text-white hover:bg-indigo-600 group-disabled:pointer-events-none"
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
