import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, Package, TrendingDown, Truck } from "lucide-react";

interface PurchaseReport {
  id: number;
  timestamp: string;
  product: string;
  quantity: number;
  amount: number;
  supplier: string;
}

export default function PurchaseReport() {
  const purchaseData: PurchaseReport[] = [
    {
      id: 1,
      timestamp: "2023-01-15 10:30:00",
      product: "Raw Material A",
      quantity: 1000,
      amount: 5000.0,
      supplier: "Supplier X",
    },
    {
      id: 2,
      timestamp: "2023-02-22 14:45:30",
      product: "Component B",
      quantity: 500,
      amount: 2500.0,
      supplier: "Supplier Y",
    },
    {
      id: 3,
      timestamp: "2023-03-10 09:15:22",
      product: "Packaging Material",
      quantity: 10000,
      amount: 1000.0,
      supplier: "Supplier Z",
    },
    {
      id: 4,
      timestamp: "2023-04-05 11:30:45",
      product: "Raw Material C",
      quantity: 750,
      amount: 3750.0,
      supplier: "Supplier X",
    },
    {
      id: 5,
      timestamp: "2023-05-18 16:55:10",
      product: "Component D",
      quantity: 250,
      amount: 1250.0,
      supplier: "Supplier Y",
    },
  ];

  const totalPurchases = purchaseData.reduce(
    (sum, purchase) => sum + purchase.amount,
    0
  );
  const totalItems = purchaseData.reduce(
    (sum, purchase) => sum + purchase.quantity,
    0
  );
  const uniqueSuppliers = new Set(
    purchaseData.map((purchase) => purchase.supplier)
  ).size;

  return (
    <Card className="w-full mx-auto bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100">
      <CardHeader>
        <CardTitle>All-Time Purchase Report</CardTitle>
        <CardDescription>Overview of all purchase activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardContent className="flex flex-row items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Purchases
                </p>
                <p className="text-2xl font-bold">
                  ${totalPurchases.toFixed(2)}
                </p>
              </div>
              <DollarSign className="h-6 w-6 text-muted-foreground" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-row items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Items Purchased
                </p>
                <p className="text-2xl font-bold">{totalItems}</p>
              </div>
              <Package className="h-6 w-6 text-muted-foreground" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-row items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Unique Suppliers
                </p>
                <p className="text-2xl font-bold">{uniqueSuppliers}</p>
              </div>
              <Truck className="h-6 w-6 text-muted-foreground" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-row items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Avg. Purchase Value
                </p>
                <p className="text-2xl font-bold">
                  ${(totalPurchases / purchaseData.length).toFixed(2)}
                </p>
              </div>
              <TrendingDown className="h-6 w-6 text-muted-foreground" />
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
              <TableHead>Supplier</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseData.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell>{purchase.timestamp}</TableCell>
                <TableCell>{purchase.product}</TableCell>
                <TableCell>{purchase.quantity.toLocaleString()}</TableCell>
                <TableCell>${purchase.amount.toFixed(2)}</TableCell>
                <TableCell>{purchase.supplier}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
