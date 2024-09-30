"use server";
import { cache } from "@/lib/cache";
import { db } from "@/lib/db";
import { response, convertToCapitalized } from "@/lib/utils";
import { productSchema } from "@/schemas";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";

const writeImageToDisk = async (image: File) => {
  await fs.mkdir("public/products", { recursive: true });
  const imagepath = `/products/${crypto.randomUUID()}~${image.name}`;
  await fs.writeFile(
    `public${imagepath}`,
    Buffer.from(await image.arrayBuffer())
  );
  return imagepath;
};

export const addProduct = async (payload: FormData) => {
  const payloadObject: any = {};

  for (const [key, value] of payload.entries()) {
    try {
      // Try to parse JSON values (for arrays and objects)
      payloadObject[key] = JSON.parse(value as string);
    } catch (error) {
      // If parsing fails, assign the value as it is (for non-JSON values like strings or files)
      payloadObject[key] = value as string;
    }
  }

  const validatedFields = productSchema.safeParse(payloadObject);
  console.log(payloadObject, validatedFields.error);
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
    const imagepath = await writeImageToDisk(data.image);
    const supplierIds = data.suppliers.map((sup) => sup.id);

    const categoryId = (
      await db.category.findFirst({
        where: { categoryName: convertToCapitalized(data.category as string) },
      })
    )?.id!;

    const product = await db.product.create({
      data: {
        name: data.name,
        image: imagepath,
        costPrice: data.costPrice,
        quantityInStock: data.quantityInStock,
        categoryId: categoryId,
        description: data.description,
        validity: data.validity,
        discount: data.discount || null,
        salePrice: data.salePrice,
        margin: data.margin || null,
        suppliers: {
          connect: supplierIds.map((id) => ({ id })),
        },
      },
    });

    if (product) {
      revalidatePath("/products");
      return response({
        success: true,
        code: 201,
        message: "Product created successfully",
        data: product,
      });
    } else {
      return response({
        success: false,
        error: {
          code: 500,
          message: "Failed to create product",
        },
      });
    }
  } catch (error) {
    console.error(error);

    return response({
      success: false,
      error: {
        code: 500,
        message: "Unknown error occurred",
      },
    });
  }
};


export const getProducts = cache(
  async () => {
    try {
      const products = await db.product.findMany({
        select: {
          id: true,
          name: true,

          description: true,
          quantityInStock: true,

          salePrice: true,
          costPrice: true,
          status: true,
          category: {
            select: {
              categoryName: true,
            },
          },
        },
      });

      return products;
    } catch (error) {
      console.log(error);

      return null;
    }
  },
  ["/admin/products", "getProducts"],
  { revalidate: 2 }
);
