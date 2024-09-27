import {
  deleteSupplier,
  getSuppliers,
} from "@/src/server-actions/supplier/supplier";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import {
  DeleteDropdownItem,
  DropDownTable,
  EditDropdownItem,
} from "@/src/components/DropDown/Actions";

const SupplierTable = async () => {
  const suppliers = await getSuppliers();

  if (suppliers?.length === 0) return <p>No Suppliers found</p>;
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Supplier Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Adress</TableHead>
            <TableHead>Total products</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {suppliers?.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell>{supplier.supplierName}</TableCell>
              <TableCell>{supplier.email}</TableCell>
              <TableCell>{supplier.phone}</TableCell>
              <TableCell>{supplier._count?.products}</TableCell>
              <TableCell>
               <DropDownTable supplier={supplier}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SupplierTable;
