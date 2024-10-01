import { db } from "@/lib/db";
import { cache } from "@/lib/cache";
import { notFound } from "next/navigation";
export const getProducts = cache (async () => {
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
['/','getProducts'],
{
  revalidate: 30*60
}

)

export const getAproduct = cache (async( id:string ) => {

  try {
    const product = await db.product.findUnique({
      where: {
        id: id
      }
    })
    if(!product) return notFound()
    return product
    
    
  } catch (error) {
    return null
  }

},['/','getAproduct'],{
  revalidate: 30*60
})