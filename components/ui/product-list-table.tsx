'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const products = [
  {
    id: "PRD001",
    name: "Organic Apples",
    expDate: "2023-12-31",
    receivedDate: "2023-06-15",
    quantity: 500,
    status: "In Stock",
  },
  {
    id: "PRD002",
    name: "Whole Grain Bread",
    expDate: "2023-07-10",
    receivedDate: "2023-06-20",
    quantity: 100,
    status: "Low Stock",
  },
  {
    id: "PRD003",
    name: "Fresh Milk",
    expDate: "2023-07-05",
    receivedDate: "2023-06-25",
    quantity: 200,
    status: "In Stock",
  },
  {
    id: "PRD004",
    name: "Chicken Breast",
    expDate: "2023-07-08",
    receivedDate: "2023-06-28",
    quantity: 150,
    status: "In Stock",
  },
  {
    id: "PRD005",
    name: "Cheddar Cheese",
    expDate: "2023-08-15",
    receivedDate: "2023-06-10",
    quantity: 80,
    status: "Low Stock",
  },
]

export function ProductListTableComponent() {
  return (
    <Table>
      <TableCaption>List of Products in Inventory</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Product ID</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Exp. Date</TableHead>
          <TableHead>Received Date</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.expDate}</TableCell>
            <TableCell>{product.receivedDate}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>{product.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}