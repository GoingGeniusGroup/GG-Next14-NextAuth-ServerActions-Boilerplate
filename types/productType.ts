
export type productType = {
    name: string;
    id: string;
    image: string | null;
    description: string | null;
    costPrice: number;
    quantityInStock: number;
    discount: number | null;
    taxId?: string | null;
    tax?:{
      rate: number
    };
    salePrice: number | null;
    status: boolean;
    category: {
        categoryName: string;
    }

};


export type category =  {
    id: string;
    categoryName: string;
    description: string | null;

}[] | null



