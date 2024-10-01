import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "lucide-react"

// Define types for seller data
type SellerStatus = 'Active' | 'Inactive';

interface Seller {
    id: number;
    name: string;
    email: string;
    phone: string;
    totalSales: number;
    rating: number;
    status: SellerStatus;
    joinDate: string;
}

// Type for the sellers array
type Sellers = Seller[];


// Mock data for sellers
const sellers: Sellers = [
    {
        id: 1,
        name: "Alice Johnson",
        email: "alice@example.com",
        phone: "+1 (555) 123-4567",
        totalSales: 150000,
        rating: 4.8,
        status: "Active",
        joinDate: "2022-03-15",
    },
    {
        id: 2,
        name: "Bob Smith",
        email: "bob@example.com",
        phone: "+1 (555) 987-6543",
        totalSales: 98000,
        rating: 4.5,
        status: "Active",
        joinDate: "2022-05-20",
    },
    {
        id: 3,
        name: "Charlie Brown",
        email: "charlie@example.com",
        phone: "+1 (555) 246-8135",
        totalSales: 75000,
        rating: 4.2,
        status: "Inactive",
        joinDate: "2022-01-10",
    },
    {
        id: 4,
        name: "Diana Prince",
        email: "diana@example.com",
        phone: "+1 (555) 369-2580",
        totalSales: 200000,
        rating: 4.9,
        status: "Active",
        joinDate: "2021-11-05",
    },
    {
        id: 5,
        name: "Ethan Hunt",
        email: "ethan@example.com",
        phone: "+1 (555) 741-8520",
        totalSales: 120000,
        rating: 4.6,
        status: "Active",
        joinDate: "2022-07-01",
    },
]

export default function Component() {
    return (
        <div className="container bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100 py-5">
            <h1 className="text-2xl font-bold mb-4">Seller List</h1>
            <Table>

                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Total Sales</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Join Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sellers.map((seller) => (
                        <TableRow key={seller.id}>
                            <TableCell className="font-medium">{seller.name}</TableCell>
                            <TableCell>{seller.email}</TableCell>
                            <TableCell>{seller.phone}</TableCell>
                            <TableCell>${seller.totalSales.toLocaleString()}</TableCell>
                            <TableCell>
                                <div className="flex items-center">
                                    {seller.rating.toFixed(1)}
                                    <StarIcon className="w-4 h-4 text-yellow-400 ml-1" />
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant={seller.status === "Active" ? "default" : "secondary"}>
                                    {seller.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{seller.joinDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}