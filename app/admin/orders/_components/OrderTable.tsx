import React from "react";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {  MoreVertical } from "lucide-react";
import Link from "next/link";
import OrderStatusCell from "./OrderStatus";
import { getAllOrders } from "@/actions/order";

const OrderTable = async () => {
  const orders = await getAllOrders();
  console.log(orders, "orders");

  if (orders?.length === 0) return <p>No orders found</p>;
  return (
    <div className='className="container mx-auto mt-8 px-4"'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Delivery Status</TableHead>
            <TableHead>Items</TableHead>
            <TableHead className="w-0">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders?.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>
                {new Date(order.orderDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>{`${order.streetAddress}, ${order.city}, ${order.state}`}</TableCell>
              <TableCell>
                {" "}
                <OrderStatusCell status={order.status} />
              </TableCell>
              <TableCell>
                {" "}
                <ul className="list-disc list-inside">
                  {order.carts.map((cart, index) => (
                    <li key={index}>
                      {cart.quantity} x {cart.product.name}{" "}
                      {cart.variants.length > 0
                        ? `(${cart.variants.map(
                            (var_item) => var_item.option?.value
                          )})`
                        : ""}{" "}
                      -
                      {cart.variants.length > 0
                        ? cart.variants.find(
                            (var_product) => var_product.variant.name === "Size"
                          )?.salePrice || cart.product.salePrice
                        : cart.product.salePrice}{" "}
                      each
                    </li>
                  ))}
                </ul>
              </TableCell>

              <TableCell></TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link download href={`/admin/orders/${order.id}/download`}>
                        Download
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/orders/${order.id}/edit`}>
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/orders/view/${order.id}`}>
                        View
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    {/* <ActiveToggleDropdownItem
                    id={product.id}
                    isAvailableForPurchase={product.isAvailableForPurchase}
                  /> */}
                    {/* <DeleteDropdownItem
                    id={product.id}
                    disabled={product._count.orders > 0}
                  /> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderTable;
