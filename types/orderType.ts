// type for Product
type Product = {
    salePrice: number;
    discount?: number | null;
    taxId?: string | null;
    tax?:{
      rate: number
    };
    name: string
  };
  
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
  type CartItem =  {
    quantity: number;
    amount: number;
    product: Product;
    variants: Variant[] ;
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