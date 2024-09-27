"use server";
import { cache } from "@/lib/cache";
import { db } from "@/lib/db";
import { response } from "@/lib/utils";
import { supplierSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

export const getSuppliers = cache(
  async (fromClient: boolean = false) => {
    try {
      const suppliers = await db.supplier.findMany({
        select: {
          id: true,
          supplierName: true,
          email: true,
          phone: true,
          _count: {
            select: {
              products: true,
            },
          },
        },
      });

      if (fromClient) {
        const supplersClient = suppliers.map((sup) => ({
          id: sup.id,
          label: sup.supplierName,
          value: sup.supplierName.toUpperCase(),
        }));
        return supplersClient;
      }
      return suppliers;
    } catch (error) {
      console.log(error);

      return null;
    }
  },
  ["admin/suppliers", "getSuppliers"],
  { revalidate: 24 * 60 * 60 }
);

export const addSupplier = async (payload: FormData) => {
  const validatedFields = supplierSchema.safeParse(
    Object.fromEntries(payload.entries())
  );
  console.log(validatedFields?.error);

  if (!validatedFields.success) {
    return response({
      success: false,
      error: {
        code: 422,
        message: "invalid fields",
      },
    });
  }

  try {
    const data = validatedFields.data;
    const supplier = await db.supplier.create({
      data: {
        supplierName: data.suppliername,
        email: data.email,
        phone: data.phone,
      },
    });
    if (supplier) {
      revalidatePath("/admin/suppliers");
      return response({
        success: true,
        code: 201,
        message: "Supplier added successfully",
      });
    }
  } catch (error) {
    console.log(error, "unkwnon");

    return response({
      success: false,

      error: {
        code: 500,
        message: "Unknown error occurred",
      },
    });
  }
};

export const updateSupplier = async (id: string, payload: FormData) => {
  const validatedFields = supplierSchema.safeParse(
    Object.fromEntries(payload.entries())
  );
 
  


  if (!validatedFields.success) {
    return response({
      success: false,
      error: {
        code: 422,
        message: "invalid fields",
      },
    });
  }
  try {
    const supplier = await db.supplier.findUnique({ where: { id } });
  
   
    if (supplier == null) return notFound();

    const data = validatedFields.data;
    const updatesupplier = await db.supplier.update({
      where: { id },

      data: {
        supplierName: data.suppliername,
        email: data.email,
        phone: data.phone,
      },
    });

    if (updatesupplier) {
      revalidatePath("/admin/suppliers");

      return response({
        success: true,
        code: 201,
        message: "Supplier updated successfully",
      });
    }
  } catch (error) {
    return null;
  }
};

export const deleteSupplier = async (id: string) => {
  try {
    const supplier = await db.supplier.delete({ where: { id } });
    if (supplier == null) return notFound();
    revalidatePath("/");
    revalidatePath("/admin/suppliers");
    return response({
      success: true,
      code: 201,
      message: "Supplier deleted successfully",
    });
  } catch (error) {
    return null;
  }
};
