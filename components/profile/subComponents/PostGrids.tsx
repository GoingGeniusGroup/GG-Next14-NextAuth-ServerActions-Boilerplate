import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

// Helper function to shuffle the array
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
  const [shuffledPosts, setShuffledPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Shuffle posts each time the component renders
    setShuffledPosts(shuffleArray(posts));
  }, [posts]);

  return (
    <div
      className={`grid gap-4 ${
        layout === "full"
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          : layout === "headings"
          ? "grid-cols-1"
          : layout === "compact"
          ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-16" // Custom layout for gap
      }`}
    >
      {shuffledPosts.map((post) => (
        <Card
          key={post.id}
          className={`bg-white bg-opacity-80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300 ${
            layout === "gap" ? "mt-4" : "" // Add top margin for gap layout
          }`}
        >
          <CardContent
            className={`p-4 ${
              layout === "headings" || layout === "compact"
                ? "flex items-center"
                : ""
            }`}
          >
            {(layout === "full" || layout === "gap") && (
              <div className="relative w-full h-32 mb-4">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="rounded object-cover"
                />
              </div>
            )}

            <div
              className={
                layout === "headings" || layout === "compact"
                  ? "flex-grow"
                  : ""
              }
            >
              <h2
                className={`font-semibold ${
                  layout === "compact" ? "text-sm" : "text-lg"
                } mb-2`}
              >
                {post.title}
              </h2>
              {(layout === "full" || layout === "gap") && (
                <p className="text-sm text-gray-600">{post.content}</p>
              )}
            </div>

            {(layout === "headings" || layout === "compact") && (
              <div
                className={`relative ml-4 ${
                  layout === "compact" ? "w-12 h-12" : "w-16 h-16"
                }`}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="rounded object-cover"
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PostsGrid;
