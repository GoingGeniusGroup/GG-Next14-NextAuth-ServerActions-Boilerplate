'use client'

import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

type Category = {
  id: string
  name: string
  iconName: keyof typeof LucideIcons // Only store the icon name
}

export default function ProductCategoriesComponent() {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Electronics', iconName: 'Smartphone' },
    { id: '2', name: 'Clothing', iconName: 'Shirt' },
    { id: '3', name: 'Books', iconName: 'BookOpen' },
  ])

  const [newCategory, setNewCategory] = useState<Omit<Category, 'id'>>({ name: '', iconName: 'HelpCircle' })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.iconName) {
      setCategories([...categories, { ...newCategory, id: Date.now().toString() }])
      setNewCategory({ name: '', iconName: 'HelpCircle' })
      setIsDialogOpen(false)
    } else {
      alert('Please fill in all fields.')
    }
  }

  const IconComponent = ({ iconName }: { iconName: keyof typeof LucideIcons }) => {
    const Icon = LucideIcons[iconName] as React.ElementType
    return Icon ? <Icon className="h-6 w-6" /> : null
  }

  return (
    <div className="container bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100 py-5">
      <h1 className="text-2xl font-bold mb-5">Product Categories</h1>
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconComponent iconName={category.iconName} />
                {category.name}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-[74px] w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Create a new product category with a custom icon.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="icon" className="text-right">
                  Icon
                </Label>
                <Input
                  id="icon"
                  type='file'
                  value={newCategory.iconName}
                  onChange={(e) => setNewCategory({ ...newCategory, iconName: e.target.value as keyof typeof LucideIcons })}
                  className="col-span-3"
                  placeholder="e.g., Smartphone, Shirt, BookOpen"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddCategory}>Add Category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
