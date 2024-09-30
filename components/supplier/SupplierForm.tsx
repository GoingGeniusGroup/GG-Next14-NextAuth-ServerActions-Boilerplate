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
import { Supplier } from "@prisma/client";
import { addSupplier, updateSupplier } from "@/actions/supplier";
import Modal from "../ui/model";
import { supplierSchema } from "@/schemas";

const SupplierForm = ({
  edit = false,
  supplier,
}: {
  edit: boolean;
  supplier?: Supplier;
}) => {
  const router = useRouter();
  type suppilerType = Zod.infer<typeof supplierSchema>;

  const [isPending, startTransition] = useTransition();

  const form = useForm<suppilerType>({
    resolver: zodResolver(supplierSchema),
    mode: "onChange",
    defaultValues: {
      suppliername: supplier ? supplier.supplierName : "",
      email: supplier?.email ?? undefined,
      phone: supplier?.phone ?? undefined,
      address: supplier?.address ?? undefined,
    },
  });

  const onSubmit = async (values: suppilerType) => {
    const formData = new FormData();
    Object.entries(values).forEach((value) => {
      formData.append(value[0], value[1]);
    });

    startTransition(async () => {
      edit
        ? await updateSupplier(supplier!.id, formData)
        : await addSupplier(formData)
            .then((data) => {
              if (!data) return;
              if (!data.success) {
                return toast.error(data.error.message);
              }
              toast.success(data.message, {
                autoClose: 2000,
              });

              router.push("/admin/suppliers");
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
    <>
      <div className="container mx-auto flex items-center justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset disabled={isPending} className="group">
              <FormInput
                control={form.control}
                name="suppliername"
                type="text"
                placeholder="Enter supplier name"
                isPending={isPending}
                label="SupplierName"
              />
              <FormInput
                control={form.control}
                name="email"
                type="text"
                placeholder="Enter supplier email"
                isPending={isPending}
                label="Email"
              />
              <FormInput
                control={form.control}
                name="phone"
                type="number"
                placeholder="Enter supplier phone"
                isPending={isPending}
                label="Phone"
              />
              <FormInput
                control={form.control}
                name="address"
                type="text"
                placeholder="Enter supplier address"
                isPending={isPending}
                label="Address"
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
    </>
  );
};

export default SupplierForm;
