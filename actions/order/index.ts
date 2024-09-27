"use server";

import { revalidatePath } from "next/cache";
import { cache } from "@/lib/cache";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";

export const getAllOrders = cache(
  async () => {
    try {
      const orders = await db.order.findMany({
        
        include: {
          carts: {
            select: {
              quantity: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  salePrice: true,
                },
              },
              variants: {
                select: {
                  salePrice: true,
                  variant:true,
                  option: {
                    select: {
                      value: true,
                    },
                    
                  },
                },
              },
            },
          },
        },
      });

      return orders;
    } catch (error) {
      console.log(error);

      return null;
    }
  },
  ["/admin/orders", "getAllOrders"],

  {
    revalidate: 2,
  }
);
export async function deleteOrder(formData: FormData): Promise<any> {
  try {
    const data = {
      id: formData.get("id"),
    };
    const order = await db.order.delete({
      where: {
        id: data?.id as string,
      },
    });

    revalidatePath("/");
  } catch (error) {
    return {
      error: " There was an error on deleting",
    };
  }
}

export const getAOrder = cache(
  async (id: string | undefined) => {
    
    
    try {
      if (id === undefined) return null;
    
      
      const order = await db.order.findUnique({
        where: {
          id: id as string,
        },
        include: {
          user:true
          ,
          carts: {
            select: {
              quantity: true,
              amount:true,
              product: {
                select: {
                  id: true,
                  name: true,
                  salePrice: true,
                },
              },
              variants: {
                select: {
                  salePrice: true,
                  variant:true,
                  option: {
                    select: {
                      value: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (order == null) return notFound();
      return order;
    } catch (error) {
      console.log(error);

      return null;
    }
  },
  ["/admin/orders/view/[id]", "getAOrder"],

  { revalidate: 2}
);
export const getUserOrder = cache(
  async (userId: string | undefined) => {
    
    
    try {
      if (userId === undefined) return null;
      console.log(userId);
      
      const orders = await db.order.findMany({
        where: {
          userId: userId as string,
        },
        include: {
          carts: {
            select: {
              quantity: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  salePrice: true,
                },
              },
              variants: {
                select: {
                  salePrice: true,
                  option: {
                    select: {
                      value: true,
                    },
                  },
                },
              },
            },
          },
        },
      });



      if (orders == null) return notFound();
      return orders;
    } catch (error) {
      console.log(error);

      return null;
    }
  },
  ["/order", "getUserOrder"],

  { revalidate: 2}
);
