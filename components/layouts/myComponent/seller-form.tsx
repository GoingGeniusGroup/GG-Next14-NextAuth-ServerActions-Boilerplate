"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { toast } from "@/components/ui/use-toast"

interface Seller {
  id: number
  name: string
  email: string
  sales: number
}

export function SellerFormComponent() {
  const [sellers, setSellers] = useState<Seller[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [sales, setSales] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !sales) {
      // toast({
      //   title: "Error",
      //   description: "Please fill in all fields.",
      //   variant: "destructive",
      // })
      // return
    }

    const newSeller: Seller = {
      id: Date.now(),
      name,
      email,
      sales: parseFloat(sales),
    }

    setSellers([...sellers, newSeller])
    // toast({
    //   title: "Success",
    //   description: "Seller added successfully!",
    // })

    // Reset form fields
    setName("")
    setEmail("")
    setSales("")
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add New Seller</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter seller's name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter seller's email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sales">Sales</Label>
            <Input
              id="sales"
              type="number"
              value={sales}
              onChange={(e) => setSales(e.target.value)}
              placeholder="Enter sales amount"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Add Seller
          </Button>
        </form>
      </CardContent>
      <CardContent>
        <h2 className="text-xl font-semibold mb-2">Seller List</h2>
        {sellers.length === 0 ? (
          <p>No sellers added yet.</p>
        ) : (
          <ul className="space-y-2">
            {sellers.map((seller) => (
              <li key={seller.id} className="border p-2 rounded">
                <strong>{seller.name}</strong> - {seller.email} - ${seller.sales}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}