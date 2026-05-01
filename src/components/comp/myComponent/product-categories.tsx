"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Button } from "@/src/ui/button";
import { Input } from "@/src/ui/input";
import { CardHeader, CardTitle } from "@/src/ui/card";
import { CardSpotlight } from "@/src/ui/card/card-spotlight";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/ui/dialog";
import { Label } from "@/src/ui/label";

type Category = {
  id: string;
  name: string;
  iconName: keyof typeof LucideIcons; // Only store the icon name
};

export default function ProductCategoriesComponent() {
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Electronics", iconName: "Smartphone" },
    { id: "2", name: "Clothing", iconName: "Shirt" },
    { id: "3", name: "Books", iconName: "BookOpen" },
  ]);

  const [newCategory, setNewCategory] = useState<Omit<Category, "id">>({
    name: "",
    iconName: "HelpCircle",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.iconName) {
      if (!(newCategory.iconName in LucideIcons)) {
        alert("Invalid icon name. Please use a valid Lucide icon name (e.g., Smartphone, Heart, Star).");
        return;
      }
      setCategories([
        ...categories,
        { ...newCategory, id: Date.now().toString() },
      ]);
      setNewCategory({ name: "", iconName: "HelpCircle" });
      setIsDialogOpen(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const IconComponent = ({
    iconName,
  }: {
    iconName: keyof typeof LucideIcons;
  }) => {
    const Icon = LucideIcons[iconName] as any;
    return Icon ? <Icon className="h-6 w-6" /> : null;
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Product Categories
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 border-cyan-500/50 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300">
              <PlusCircle className="h-5 w-5 text-cyan-500" />
              <span>Add Category</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] border-cyan-500/20 backdrop-blur-xl bg-white/80 dark:bg-black/80">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-cyan-500">Add New Category</DialogTitle>
              <DialogDescription>
                Create a new product category with a custom Lucide icon.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-6">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Category Name
                </Label>
                <Input
                  id="name"
                  placeholder="e.g. Gaming, Home, Beauty"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  className="border-cyan-500/20 focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="icon" className="text-sm font-medium">
                  Lucide Icon Name
                </Label>
                <Input
                  id="icon"
                  type="text"
                  placeholder="e.g. Smartphone, Shirt, BookOpen"
                  value={newCategory.iconName}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      iconName: e.target.value as keyof typeof LucideIcons,
                    })
                  }
                  className="border-cyan-500/20 focus:border-cyan-500 focus:ring-cyan-500"
                />
                <p className="text-xs text-muted-foreground">
                  View all icons at <a href="https://lucide.dev/icons" target="_blank" rel="noreferrer" className="text-cyan-500 hover:underline">lucide.dev</a>
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddCategory} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-none shadow-lg shadow-cyan-500/25">
                Add Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {categories.map((category) => (
          <CardSpotlight key={category.id} className="group relative overflow-hidden border-cyan-500/10 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative z-10 text-center flex flex-col items-center py-8">
              <div className="mb-4 p-4 rounded-2xl bg-cyan-500/10 text-cyan-500 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-500 shadow-inner">
                <IconComponent iconName={category.iconName} />
              </div>
              <CardTitle className="text-lg font-bold group-hover:text-cyan-500 transition-colors duration-300">
                {category.name}
              </CardTitle>
            </CardHeader>
          </CardSpotlight>
        ))}
      </div>
    </div>
  );
}
