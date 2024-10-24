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
  sales: number
}

export function SellerListComponent() {
  const [sellers, setSellers] = useState<Seller[]>([
    { id: 1, name: "John Doe", email: "john@example.com", sales: 100 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", sales: 150 },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", sales: 75 },
  ])

  const [editingSeller, setEditingSeller] = useState<Seller | null>(null)

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Seller List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Sales</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sellers.map((seller) => (
            <TableRow key={seller.id}>
              <TableCell>{seller.name}</TableCell>
              <TableCell>{seller.email}</TableCell>
              <TableCell>${seller.sales}</TableCell>
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
  const [sales, setSales] = useState(seller.sales.toString())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...seller, name, email, sales: parseInt(sales, 10) })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="sales">Sales</Label>
        <Input
          id="sales"
          type="number"
          value={sales}
          onChange={(e) => setSales(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  )
}