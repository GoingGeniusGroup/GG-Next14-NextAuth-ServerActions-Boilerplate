'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2 } from 'lucide-react'

interface Customer {
    id: number
    name: string
    email: string
}

export default function CustomerList() {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [editingId, setEditingId] = useState<number | null>(null)

    const addCustomer = (e: React.FormEvent) => {
        e.preventDefault()
        if (editingId !== null) {
            setCustomers(customers.map(c => c.id === editingId ? { ...c, name, email } : c))
            setEditingId(null)
        } else {
            setCustomers([...customers, { id: Date.now(), name, email }])
        }
        setName('')
        setEmail('')
    }

    const editCustomer = (customer: Customer) => {
        setName(customer.name)
        setEmail(customer.email)
        setEditingId(customer.id)
    }

    const deleteCustomer = (id: number) => {
        setCustomers(customers.filter(c => c.id !== id))
    }

    return (
        <div className="container mx-auto p-4 space-y-4">
            <h1 className="text-2xl font-bold mb-4">Customer Management</h1>
            <form onSubmit={addCustomer} className="space-y-2">
                <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Button type="submit">{editingId !== null ? 'Update' : 'Add'} Customer</Button>
            </form>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {customers.map((customer) => (
                        <TableRow key={customer.id}>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button variant="outline" size="icon" onClick={() => editCustomer(customer)}>
                                        <Pencil className="h-4 w-4" />
                                        <span className="sr-only">Edit</span>
                                    </Button>
                                    <Button variant="outline" size="icon" onClick={() => deleteCustomer(customer.id)}>
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Delete</span>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}