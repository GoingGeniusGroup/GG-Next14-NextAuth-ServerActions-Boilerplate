import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

type Product = {
    id: string;
    name: string;
    expDate: string;
    receivedDate: string;
    quantity: number;
    status: "In Stock" | "Low Stock";
};

const products: Product[] = [
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
];

export default function InventoryPage() {
    return (
        <div className="container py-10 bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100 rounded-md">
            <h1 className="text-2xl font-bold mb-5">Inventory</h1>
            <Table>
                <TableCaption>List of Products in Inventory</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[120px]">Product ID</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Exp. Date</TableHead>
                        <TableHead>Received Date</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-sm">
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.expDate}</TableCell>
                            <TableCell>{product.receivedDate}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>{product.status}</TableCell>
                            <TableCell className="flex gap-2 justify-center items-center">
                                <Button>Edit</Button>
                                <Button>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}