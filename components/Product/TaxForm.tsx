"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormInput from "../form/FormInput";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/Spinner";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Tax } from "@prisma/client";
import { addTax, updateTax } from "@/actions/tax"; 
import Modal from "../ui/model";
import { taxSchema } from "@/schemas";
import { SelectType } from "@/types/orderType";

const TaxForm = ({
  edit = false,
  tax,
  setTax
}: {
  edit: boolean;
  tax?: Tax; 
   setTax: (tax:SelectType) =>void
}) => {
  const router = useRouter();
  type taxType = Zod.infer<typeof taxSchema>;

  const [isPending, startTransition] = useTransition();

  const form = useForm<taxType>({
    resolver: zodResolver(taxSchema),
    mode: "onChange",
    defaultValues: {
      name: tax ? tax.name : "",
      rate: tax?.rate ?? undefined,
      description: tax?.description ?? undefined,
    },
  });

  const onSubmit = async (values: taxType) => {
    const formData = new FormData();
    Object.entries(values).forEach((value) => {
      formData.append(value[0], value[1]);
    });

    startTransition(async () => {
      edit
        ? await updateTax(tax!.id, formData)
        : await addTax(formData)
            .then((data) => {
              if (!data) return;
              if (!data.success) {
                return toast.error(data.error.message);
              }
              toast.success(data.message, {
                autoClose: 2000,
              });
             setTax(data.data)
            //   router.push("/admin/taxes");
            })
            .catch((error) => {
              console.log(error);
              toast.error("Something went wrong.", {
                autoClose: 2000,
              });
            });
    });
  };

  return (
    <div className=" flex items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset disabled={isPending} className="group">
            <FormInput
              control={form.control}
              name="name"
              type="text"
              placeholder="Enter tax name"
              isPending={isPending}
              label="Tax Name"
            />
            <FormInput
              control={form.control}
              name="rate"
              type="number"
              placeholder="Enter tax rate"
              isPending={isPending}
              label="Rate"
            />
            <FormInput
              control={form.control}
              name="description"
              type="text"
              placeholder="Enter tax description"
              isPending={isPending}
              label="Description"
            />

            <div className="mt-8 space-x-6 text-center mb-5">
              <Modal.Close className="rounded px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-600">
                Cancel
              </Modal.Close>

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

export default TaxForm;
