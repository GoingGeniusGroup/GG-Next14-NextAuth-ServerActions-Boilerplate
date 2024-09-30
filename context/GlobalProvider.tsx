"use client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, {
  ReactNode,
  useState,
  createContext,
  useRef,
  useEffect,
  RefObject,
  useContext,
} from "react";
import { sendInvoiceEmail } from "../lib/mail";
import { toast } from "react-toastify";
import { arrayBufferToBase64 } from "../lib/utils";
import { useCartStore } from "../hooks/useCartStore";
import { useSession } from "next-auth/react";
import { InvoiceType } from "@/types/orderType";

interface GlobalContextType {
    cartRef: RefObject<HTMLDivElement>;
    isCartOpen: boolean;
    cartToogle: (isCartOpen: boolean) => void
    setCartOpen: (isCartOpen: boolean) => void
    pdfRef: RefObject<HTMLDivElement>;
    refPdf: HTMLDivElement | null;
    setRefPdf: (refPdf: HTMLDivElement | null) => void;
    handleGeneratePdf: ( inputData: HTMLDivElement, invoiceId:string, download: boolean,toEmail?: string ) =>  Promise<void>;

    order: InvoiceType | null,
    setOrder: ( order: InvoiceType ) => void
    cartDetails: {
      subTotal: number,
      totaltax: number,
      cart: any[]
    }
}

const globalContext = createContext<GlobalContextType | null>(null);

interface Props {
  children: ReactNode;
}
export const GlobalProvider: React.FC<Props> = (props) => {
  const { children } = props;

  const [isCartOpen, setCartOpen] = useState<boolean>(false);
  const [refPdf, setRefPdf] = useState<HTMLDivElement | null>(null);
  
  const cartRef = useRef<HTMLDivElement>(null);
  const [ order, setOrder ] = useState<InvoiceType| null>(null)
  
  const cartToogle = () => setCartOpen(!isCartOpen)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(e.target as Node)
      ) {
        setCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartRef]);
  const pdfRef = useRef(null);

 const handleGeneratePdf = async (inputData: HTMLDivElement | null, invoiceId:string,  download:boolean,toEmail?: string  ) => {
  // const inputData = pdfRef.current;
  try {
    if(!inputData){
      return 
    }
    const canvas = await html2canvas(inputData);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: "a4",
    });

    const width = pdf.internal.pageSize.getHeight();
    const height = (canvas.height * width) / canvas.height;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    const buffer = pdf.output('arraybuffer')
  
    // const bufferStr = uint8ArrayToString(buffer)
    const bufferStr = arrayBufferToBase64(buffer);
    // console.log(bufferStr,buffer);
    if(download){
      pdf.save(`invoice-${invoiceId}.pdf`);
    }

    else{
        "use server"
        
         await sendInvoiceEmail(toEmail="santzukarki37@gmail.com",invoiceId,bufferStr ).then(data => {
          if(!data.success){
            toast.error(data.error.message,{
              autoClose:2000})
              return

          }
          
          toast.success(data.message,{
            autoClose:2000})

         }) 
        
    }

  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};

const { getCart, cart } = useCartStore();
const { data: session } = useSession();
useEffect (() => {
  if(session?.user){
    getCart(session?.user.id)
  }

}, [session])
// const { data: session } = useSession();
const subTotal = cart.length > 0?  cart.reduce((sum, cart) => {
  return sum + cart.amount
 },0 ) : 0
const totaltax = cart.length > 0?  cart.reduce((sum, item) => {
  const productPrice =
          item.variants.length > 0
            ? item.variants.find(
                (var_p) => var_p.variant.name === "Size"
              )?.salePrice || item.product.salePrice
            : item.product.salePrice;
  return sum + item.product.tax.rate/ 100 * productPrice
 },0 ) : 0


 const cartDetails = { subTotal, totaltax, cart}
  return (
    <>
      <globalContext.Provider value={{ cartRef, isCartOpen,cartToogle, setCartOpen,pdfRef,setRefPdf,refPdf ,handleGeneratePdf, 
      order, setOrder,
        cartDetails
      }}>
        {children}
      </globalContext.Provider>
    </>
  );
};

export default function useGloabalContext() {
  const context = useContext(globalContext);
  if (!context) {
    throw new Error("useGloabalContext must be used within a GlobalProvider");
  }
  return context;
}


