'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileIcon, AlertTriangleIcon, CheckCircleIcon } from 'lucide-react'

const formSchema = z.object({
    file: z.instanceof(File).refine((file) => file.name.endsWith('.xlsx') || file.name.endsWith('.xls'), {
        message: "File must be an Excel spreadsheet (.xlsx or .xls)",
    }),
    supplierName: z.string().min(2, {
        message: "Supplier name must be at least 2 characters.",
    }),
})

// Mock function to simulate processing Excel data
const processExcelData = (file: File): Promise<any[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulated data
            resolve([
                { productId: 'P001', productName: 'Widget A', quantity: 100, unitPrice: 10.99 },
                { productId: 'P002', productName: 'Gadget B', quantity: 50, unitPrice: 24.99 },
                { productId: 'P003', productName: 'Doohickey C', quantity: 75, unitPrice: 15.50 },
            ])
        }, 1500)
    })
}

export default function BulkOrderUploadComponent() {
    const [fileData, setFileData] = useState<any[] | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            supplierName: "",
        },
    })

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setIsProcessing(true)
            try {
                const data = await processExcelData(file)
                setFileData(data)
                toast({
                    title: "File processed successfully",
                    description: `${data.length} items found in the spreadsheet.`,
                })
            } catch (error) {
                toast({
                    title: "Error processing file",
                    description: "There was an error processing the Excel file. Please try again.",
                    variant: "destructive",
                })
            } finally {
                setIsProcessing(false)
            }
        }
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!fileData) {
            toast({
                title: "No data to submit",
                description: "Please upload and process an Excel file before submitting.",
                variant: "destructive",
            })
            return
        }

        setIsSubmitting(true)
        // Simulate API call
        setTimeout(() => {
            console.log('Submitting order:', { supplier: values.supplierName, orders: fileData })
            toast({
                title: "Bulk order submitted",
                description: `${fileData.length} orders have been submitted to ${values.supplierName}.`,
            })
            setIsSubmitting(false)
            setFileData(null)
            form.reset()
        }, 2000)
    }

    return (
        <div className="container py-8 bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100 rounded-md">
            <h1 className="text-3xl font-bold mb-6">Bulk Order Upload</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload Excel File</CardTitle>
                            <CardDescription>Upload an Excel file (.xlsx or .xls) containing the bulk order details.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="file"
                                render={({ field: { onChange, value, ...field } }) => (
                                    <FormItem>
                                        <FormLabel>Excel File</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept=".xlsx,.xls"
                                                onChange={(e) => {
                                                    onChange(e.target.files?.[0])
                                                    onFileChange(e)
                                                }}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Upload an Excel file containing the product IDs, names, quantities, and unit prices.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    {isProcessing && (
                        <Alert>
                            <AlertTriangleIcon className="h-4 w-4" />
                            <AlertTitle>Processing File</AlertTitle>
                            <AlertDescription>
                                Please wait while we process your Excel file. This may take a few moments.
                            </AlertDescription>
                        </Alert>
                    )}

                    {fileData && (
                        <Card>
                            <CardHeader>
                                <CardTitle>File Preview</CardTitle>
                                <CardDescription>Review the data extracted from your Excel file.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Product ID</TableHead>
                                            <TableHead>Product Name</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Unit Price</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {fileData.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.productId}</TableCell>
                                                <TableCell>{item.productName}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                                <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    )}

                    <FormField
                        control={form.control}
                        name="supplierName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Supplier Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter supplier name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isSubmitting || !fileData}>
                        {isSubmitting ? "Submitting..." : "Submit Bulk Order"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}