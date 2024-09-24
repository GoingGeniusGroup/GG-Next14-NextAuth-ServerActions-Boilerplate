import { create } from "zustand";
import { Product, Supplier } from "@prisma/client";
import { getProducts } from "../services/product";
import { getCategories } from "@/actions/category";
import { getSuppliers } from "@/actions/supplier";

interface Option {
  id: string;
  label: string;
  value: string;
}
type ProductType = {
  category: {
      categoryName: string;
  };
  id: string;
  name: string;
  description: string | null;
  costPrice: number;
  quantityInStock: number;
  salePrice: number | null;
  status: boolean;
}
interface ListOptions {
  categories: Option[];
  suppliers: Option[];
  products: ProductType[];
  getValues: () => void;
  fetchProducts: () => void;
  isLoading: boolean;
}

export const useFetchValues = create<ListOptions>((set) => ({
  categories: [{ id: "", label: "", value: "" }],
  suppliers: [{ id: "", label: "", value: "" }],
  products: [],
  isLoading: false,
  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const productData = await getProducts();
      set({
        products: productData|| [],
        isLoading: false,
      });
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
        categories: categoriesData?.map((category: any) =>
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
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch values:", error);
      set({ isLoading: false });
    }
  },
}));
