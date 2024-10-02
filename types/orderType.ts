// type for Product
// type Product = {
//     salePrice: number;
//     image: string | null;
//     description: string | null;
//     discount?: number | null;
//     taxId?: string | null;
//     tax?:{
//       rate: number
//     };
//     name: string
//   };
import { productType } from "./productType";
  
  // type for Variant Option
  type VariantOption= {
    value: string;
  }
  type User = {
    name: string;
    email: string;
  };
  
  // type for Variant
  type Variant = {
    salePrice: number;
    
    variant: {
      id: string;
      name: string;
      status: boolean;
    };
    discount: number | null;
    option: VariantOption;
  }
  
  // type for Cart Item
export type CartItem =  {
    quantity: number;
    product: productType;
    amount?: number;

    variants?: Variant[] ;
  }
  
  // type for Order
  export type OrderType ={
    id: string;
    orderDate: string;
    quantity: number;
    deliveryDate: string;
    amount: number | null;
    streetAddress: string;
    state: string;
    city: string;
    status: string;
    paymentStatus: boolean;
    paymentId: string | null;
    userId: string;
    carts: CartItem[];
    user: User ; 
  } | null
  
  
  export type InvoiceType = OrderType &{
    InvoiceId: string;
    invoiceDate: string;
    totalAmount: number; 
    
  };


  export type SelectType= {
    id: string;
    label: string;
    value: string ;

  }