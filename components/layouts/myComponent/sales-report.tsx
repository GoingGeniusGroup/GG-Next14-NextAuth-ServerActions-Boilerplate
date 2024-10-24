'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, TrendingUp, Users } from "lucide-react"

export function SalesReportComponent() {
  const salesData = [
    { id: 1, timestamp: "2023-06-01 09:23:15", product: "Widget A", quantity: 5, amount: 250.00, customer: "John Doe" },
    { id: 2, timestamp: "2023-06-01 10:45:30", product: "Gadget B", quantity: 2, amount: 150.00, customer: "Jane Smith" },
    { id: 3, timestamp: "2023-06-01 11:15:22", product: "Tool C", quantity: 1, amount: 75.00, customer: "Bob Johnson" },
    { id: 4, timestamp: "2023-06-01 13:30:45", product: "Widget A", quantity: 3, amount: 150.00, customer: "Alice Brown" },
    { id: 5, timestamp: "2023-06-01 14:55:10", product: "Gadget B", quantity: 1, amount: 75.00, customer: "Charlie Davis" },
  ]

  const totalSales = salesData.reduce((sum, sale) => sum + sale.amount, 0)
  const totalItems = salesData.reduce((sum, sale) => sum + sale.quantity, 0)
  const uniqueCustomers = new Set(salesData.map(sale => sale.customer)).size

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Sales Report</CardTitle>
        <CardDescription>Overview of recent sales activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <Card>
            <CardContent className="flex flex-row items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                <p className="text-2xl font-bold">${totalSales.toFixed(2)}</p>
              </div>
              <DollarSign className="h-6 w-6 text-muted-foreground" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-row items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Items Sold</p>
                <p className="text-2xl font-bold">{totalItems}</p>
              </div>
              <TrendingUp className="h-6 w-6 text-muted-foreground" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-row items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unique Customers</p>
                <p className="text-2xl font-bold">{uniqueCustomers}</p>
              </div>
              <Users className="h-6 w-6 text-muted-foreground" />
            </CardContent>
          </Card>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Customer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesData.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.timestamp}</TableCell>
                <TableCell>{sale.product}</TableCell>
                <TableCell>{sale.quantity}</TableCell>
                <TableCell>${sale.amount.toFixed(2)}</TableCell>
                <TableCell>{sale.customer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}