'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpIcon, ArrowDownIcon, PackageIcon } from "lucide-react"

// Mock data for the report

type Trend = 'up' | 'down';

interface TopSellingItem {
    id: number;
    name: string;
    sales: number;
    trend: Trend;
}

interface SlowMovingItem {
    id: number;
    name: string;
    sales: number;
    daysInStock: number;
}

interface ItemNeedingRestock {
    id: number;
    name: string;
    currentStock: number;
    reorderPoint: number;
}

const topSellingItems: TopSellingItem[] = [
    { id: 1, name: "Wireless Earbuds", sales: 1200, trend: "up" },
    { id: 2, name: "Smart Watch", sales: 950, trend: "up" },
    { id: 3, name: "Portable Charger", sales: 800, trend: "down" },
]

const slowMovingItems: SlowMovingItem[] = [
    { id: 4, name: "Desk Lamp", sales: 50, daysInStock: 60 },
    { id: 5, name: "Keyboard Cover", sales: 30, daysInStock: 90 },
    { id: 6, name: "Mouse Pad", sales: 20, daysInStock: 120 },
]

const itemsNeedingRestock: ItemNeedingRestock[] = [
    { id: 7, name: "USB-C Cable", currentStock: 5, reorderPoint: 20 },
    { id: 8, name: "Phone Case", currentStock: 8, reorderPoint: 25 },
    { id: 9, name: "Screen Protector", currentStock: 3, reorderPoint: 15 },
]
export default function ProductSummaryReportComponent() {
    return (
        <div className="space-y-6">

            <Card className="bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100">
                <CardHeader>
                    <CardTitle>Product Summary Report</CardTitle>
                    <CardDescription>Overview of product performance and inventory status</CardDescription>
                </CardHeader>
            </Card>

            <Card className="bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100">
                <CardHeader>
                    <CardTitle>Top Selling Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Sales</TableHead>
                                <TableHead>Trend</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {topSellingItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.sales}</TableCell>
                                    <TableCell>
                                        {item.trend === "up" ? (
                                            <Badge variant="default" className="bg-green-500">
                                                <ArrowUpIcon className="w-4 h-4 mr-1" />
                                                Up
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary" className="bg-yellow-500">
                                                <ArrowDownIcon className="w-4 h-4 mr-1" />
                                                Down
                                            </Badge>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card className="bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100">
                <CardHeader>
                    <CardTitle>Slow Moving Items</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Sales</TableHead>
                                <TableHead>Days in Stock</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {slowMovingItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.sales}</TableCell>
                                    <TableCell>{item.daysInStock}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card className="bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100">
                <CardHeader>
                    <CardTitle>Items Needing Restock</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Current Stock</TableHead>
                                <TableHead>Reorder Point</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {itemsNeedingRestock.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.currentStock}</TableCell>
                                    <TableCell>{item.reorderPoint}</TableCell>
                                    <TableCell>
                                        <Badge variant="destructive" className="bg-red-500">
                                            <PackageIcon className="w-4 h-4 mr-1" />
                                            Restock
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}