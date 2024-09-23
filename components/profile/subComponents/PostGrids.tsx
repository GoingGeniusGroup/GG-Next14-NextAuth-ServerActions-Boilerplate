"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown, Shuffle, SortAsc } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const shuffleArray = <T,>(array: T[]): T[] => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

type Post = {
  id: number;
  title: string;
  content: string;
  image: string;
};

type PostsGridProps = {
  posts: Post[];
  layout: "full" | "headings" | "compact" | "gap";
};

const PostsGrid: React.FC<PostsGridProps> = ({ posts, layout }) => {
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    setDisplayedPosts(posts);
  }, [posts]);

  const handleShuffle = () => setDisplayedPosts(shuffleArray(posts));
  const handleSort = () =>
    setDisplayedPosts(
      [...displayedPosts].sort((a, b) => a.title.localeCompare(b.title))
    );
  const handleFilter = (filter: string) => {
    setFilter(filter);
    setDisplayedPosts(
      filter
        ? posts.filter((post) =>
            post.title.toLowerCase().startsWith(filter.toLowerCase())
          )
        : posts
    );
  };

  const gridClasses = {
    full: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    headings: "grid-cols-1",
    compact: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    gap: "grid-cols-1 sm:grid-cols-2 gap-y-16",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={handleShuffle}
          variant="outline"
          size="sm"
          className="flex items-center"
        >
          <Shuffle className="w-4 h-4 mr-2" />
          Randomize
        </Button>
        <Button
          onClick={handleSort}
          variant="outline"
          size="sm"
          className="flex items-center"
        >
          <SortAsc className="w-4 h-4 mr-2" />
          Sort by Title
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center">
              Filter by Title
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["A", "B", "C"].map((letter) => (
              <DropdownMenuItem
                key={letter}
                onClick={() => handleFilter(letter)}
              >
                Starts with {letter}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem onClick={() => handleFilter("")}>
              Clear Filter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className={`grid gap-4 ${gridClasses[layout]}`}>
        {displayedPosts.map((post) => (
          <Card
            key={post.id}
            className="overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            <CardContent className="p-0">
              {(layout === "full" || layout === "gap") && (
                <div className="relative w-full h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h2
                  className={`font-semibold ${
                    layout === "compact" ? "text-sm" : "text-lg"
                  } mb-2`}
                >
                  {post.title}
                </h2>
                {(layout === "full" || layout === "gap") && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {post.content}
                  </p>
                )}
              </div>
              {(layout === "headings" || layout === "compact") && (
                <div className="absolute top-0 right-0 w-16 h-16">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PostsGrid;
