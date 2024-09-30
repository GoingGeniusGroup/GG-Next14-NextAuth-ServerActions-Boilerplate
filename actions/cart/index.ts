"use server";

import { revalidatePath } from "next/cache";
import { cache } from "@/lib/cache";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";


export const getCarts = cache(
    async (id: string | undefined) => {
      
      
      try {
        if (id === undefined) return null;
      
        
        const cartItems = await db.cart.findMany({
            where: { userId: id as string,
              status: "PENDING"
             },
            include: {
              product: {
      
                select: {
                  discount:true,
                  salePrice:true,
                  name:true,
                  tax:{
                    select:{
                      rate:true
                    }
                  }
                }
              },  
              variants: {
                include:{
                  option:true,
                  variant:true
                }
              }
            }
          });
  
        if (cartItems == null || cartItems.length === 0) return notFound();
        return cartItems;
      } catch (error) {
        console.log(error);
  
        return null;
      }
    },
    ["/", "getCarts"],
  
    { revalidate: 2}
  );