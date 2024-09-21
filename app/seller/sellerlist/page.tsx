"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface Seller {
    id: number
    name: string
    email: string
    contact: number
    address: string
    category: string
}

export default function SellerListComponent() {
    const [sellers, setSellers] = useState<Seller[]>([
        { id: 1, name: "John Doe", email: "john@example.com", contact: 1234567890, address: "123 Main St, Anytown, USA", category: "Category A" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", contact: 1234567890, address: "456 Elm St, Anytown, USA", category: "Category B" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", contact: 1234567890, address: "789 Oak St, Anytown, USA", category: "Category C" },
    ])

    const [editingSeller, setEditingSeller] = useState<Seller | null>(null)
    const [isAddingSeller, setIsAddingSeller] = useState(false)

    const handleDelete = (id: number) => {
        setSellers(sellers.filter((seller) => seller.id !== id))
    }

    const handleEdit = (seller: Seller) => {
        setEditingSeller(seller)
    }

    const handleSave = (updatedSeller: Seller) => {
        setSellers(sellers.map((seller) => (seller.id === updatedSeller.id ? updatedSeller : seller)))
        setEditingSeller(null)
    }

    const handleAdd = (newSeller: Omit<Seller, "id">) => {
        const id = Math.max(...sellers.map((s) => s.id), 0) + 1
        setSellers([...sellers, { ...newSeller, id }])
        setIsAddingSeller(false)
    }

    return (
        <div className="container mx-auto p-4 bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100">
            <h1 className="text-2xl font-bold mb-4">Seller List</h1>
            <Dialog open={isAddingSeller} onOpenChange={setIsAddingSeller}>
                <DialogTrigger asChild>
                    <Button className="absolute right-4 top-4">Add Seller</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Seller</DialogTitle>
                    </DialogHeader>
                    <AddSellerForm onSave={handleAdd} />
                </DialogContent>
            </Dialog>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact Number</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sellers.map((seller) => (
                        <TableRow key={seller.id}>
                            <TableCell>{seller.name}</TableCell>
                            <TableCell>{seller.email}</TableCell>
                            <TableCell>{seller.contact}</TableCell>
                            <TableCell>{seller.address}</TableCell>
                            <TableCell>{seller.category}</TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" className="mr-2" onClick={() => handleEdit(seller)}>
                                            Edit
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit Seller</DialogTitle>
                                        </DialogHeader>
                                        <EditSellerForm seller={seller} onSave={handleSave} />
                                    </DialogContent>
                                </Dialog>
                                <Button variant="destructive" onClick={() => handleDelete(seller.id)}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

interface EditSellerFormProps {
    seller: Seller
    onSave: (updatedSeller: Seller) => void
}

function EditSellerForm({ seller, onSave }: EditSellerFormProps) {
    const [name, setName] = useState(seller.name)
    const [email, setEmail] = useState(seller.email)
    const [contact, setContact] = useState(seller.contact.toString())
    const [address, setAddress] = useState(seller.address)
    const [category, setCategory] = useState(seller.category)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave({ ...seller, name, email, contact: parseInt(contact, 10), address, category })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="edit-name">Name</Label>
                <Input id="edit-name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input id="edit-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <Label htmlFor="edit-contact">Contact</Label>
                <Input
                    id="edit-contact"
                    type="number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="edit-address">Address</Label>
                <Input id="edit-address" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div>
                <Label htmlFor="edit-category">Category</Label>
                <Input id="edit-category" value={category} onChange={(e) => setCategory(e.target.value)} required />
            </div>
            <Button type="submit">Save Changes</Button>
        </form>
    )
}

interface AddSellerFormProps {
    onSave: (newSeller: Omit<Seller, "id">) => void
}

function AddSellerForm({ onSave }: AddSellerFormProps) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    const [category, setCategory] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave({ name, email, contact: parseInt(contact, 10), address, category })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="add-name">Name</Label>
                <Input id="add-name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <Label htmlFor="add-email">Email</Label>
                <Input id="add-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <Label htmlFor="add-contact">Contact</Label>
                <Input
                    id="add-contact"
                    type="number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="add-address">Address</Label>
                <Input id="add-address" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div>
                <Label htmlFor="add-category">Category</Label>
                <Input id="add-category" value={category} onChange={(e) => setCategory(e.target.value)} required />
            </div>
            <Button type="submit">Add Seller</Button>
        </form>
    )
}