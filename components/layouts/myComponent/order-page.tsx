"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SearchIcon, EyeIcon, DownloadIcon } from "lucide-react";

// Mock data for orders
const orders = [
  {
    id: "1",
    customer: "John Doe",
    date: "2023-09-15",
    total: "$120.00",
    status: "Completed",
  },
  {
    id: "2",
    customer: "Jane Smith",
    date: "2023-09-16",
    total: "$85.50",
    status: "Processing",
  },
  {
    id: "3",
    customer: "Bob Johnson",
    date: "2023-09-17",
    total: "$200.00",
    status: "Shipped",
  },
  {
    id: "4",
    customer: "Alice Brown",
    date: "2023-09-18",
    total: "$150.75",
    status: "Completed",
  },
  {
    id: "5",
    customer: "Charlie Davis",
    date: "2023-09-19",
    total: "$95.25",
    status: "Processing",
  },
];

export function OrderPageComponent() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.includes(searchTerm)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Orders</h1>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="pl-10 w-full md:w-1/2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" title="View Order">
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Download Invoice">
                    <DownloadIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
