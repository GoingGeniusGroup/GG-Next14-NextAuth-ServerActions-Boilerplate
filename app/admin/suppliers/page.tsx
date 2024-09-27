
import PageHeader from "@/app/_components/PageHeader";
import SupplierTable from "./_components/SupplierTable";
import SupplierModel from "@/components/Model/SupplierModel";


const page = async () => {
  
  return (
    <>
      <div className="container mx-auto flex justify-between items-center gap-4">
        <PageHeader>All Suppliers</PageHeader>
        <SupplierModel/>
      </div>
      <SupplierTable />
    </>
  );
};

export default page;
