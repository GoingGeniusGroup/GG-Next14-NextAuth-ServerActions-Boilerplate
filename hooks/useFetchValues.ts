import { create } from "zustand";


interface Option {
  id: string;
  label: string;
  value: string;
}
import { Product } from "@prisma/client";
import { getProducts } from "../services/product";

interface ListOptions {
  categories: Option[];
  suppliers: Option[];
  products: Product[];
  getValues: () => void;
  fetchProducts: () => void;
  isLoading: boolean;
}
//https://chatgpt.com/c/66e7ad37-9600-8003-a4e9-09f30ee60bde ( for optimization)
export const useFetchValues = create<ListOptions>((set) => ({
  categories: [{ id: "", label: "", value: "" }],
  suppliers: [{ id: "", label: "", value: "" }],
  products:[],
  isLoading: false,
  fetchProducts: async() => {
    set({ isLoading: true });
    try {
      const productData = await getProducts();
      set({
        products: productData ||null,
        isLoading:false
      })
    } catch (error) {
      console.error("Failed to fetch values:", error);
        set({ isLoading: false });
    }

  },
  getValues: async () => {
    set({ isLoading: true });
    try {
        const categoriesData = await getCategories();
        const suppliersData = await getSuppliers();
    
        set({
          categories: categoriesData?.map((category:  any) =>
            "categoryName" in category
              ? {
                  id: category.id,
                  label: category.categoryName,
                  value: category.categoryName.toUpperCase(),
                }
              : category
          ),
          suppliers: suppliersData?.map((sup: any) =>
            "supplierName" in sup
              ? {
                  id: sup.id,
                  label: sup.supplierName,
                  value: sup.supplierName.toUpperCase(),
                }
              : sup
          ),
          isLoading:false
        });
    } catch (error) {
        console.error("Failed to fetch values:", error);
        set({ isLoading: false });
    }
  },
}));
