import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DropDownTable } from "@/components/DropDown/Actions";
import { getSuppliers } from "@/actions/supplier";

type Supplier = {
  id: string;
  supplierName: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  _count: {
    products: number;
  };
};

type SupplierClient = {
  id: string;
  label: string;
  value: string;
};

const SupplierTable = async () => {
  const suppliers = await getSuppliers();

  const isSupplierClient = (
    supplier: Supplier | SupplierClient
  ): supplier is SupplierClient => {
    return (supplier as SupplierClient).label !== undefined;
  };

  if (suppliers?.length === 0) return <p>No Suppliers found</p>;

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Supplier Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Total products</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {suppliers?.map((supplier) =>
            !isSupplierClient(supplier) ? (
              <TableRow key={supplier.id}>
                <TableCell>{supplier.supplierName}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.phone}</TableCell>
                <TableCell>{supplier.address}</TableCell>
                <TableCell>{supplier._count?.products}</TableCell>
                <TableCell>
                  <DropDownTable supplier={supplier} />
                </TableCell>
              </TableRow>
            ) : null 
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SupplierTable;
