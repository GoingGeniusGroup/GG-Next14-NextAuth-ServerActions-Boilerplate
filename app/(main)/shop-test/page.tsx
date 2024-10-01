import { getProducts } from "@/actions/product";
import ShopSection from "@/components/shop/ShopSection";
import { Metadata } from "next";
import { category, productType } from "@/types/productType";
import { getCategories } from "@/actions/category";

export const metadata: Metadata = {
  title: "Shop",
};

export default  async function Shop() {

  const products: productType = await getProducts()
  const categories: category = await getCategories()
  

  let categoriesObj= ['All']
  Object.entries(categories).map((obj) => {
    categoriesObj.push(obj[1].categoryName)
  })

  return (
    <div className="pt-20">
      <ShopSection products= {products} categories= {categoriesObj} />;
    </div>
  );
}
