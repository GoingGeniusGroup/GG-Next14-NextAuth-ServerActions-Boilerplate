import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type Post = {
  id: number;
  title: string;
  content: string;
  image: string;
};

type PostCardProps = {
  post: Post;
  layout: "full" | "headings" | "compact" | "gap";
};

export const PostCard: React.FC<PostCardProps> = ({ post, layout }) => {
  return (
    <Card className="overflow-hidden rounded-md bg-white hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-0">
        {(layout === "full" || layout === "gap") && (
          <div
            className="relative w-full h-48 overflow-hidden"
            style={{ aspectRatio: "16/9" }}
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded object-cover"
              priority={post.id <= 3}
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
            <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
          )}
        </div>
        {(layout === "headings" || layout === "compact") && (
          <div className="relative w-16 h-16 ml-4">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="64px"
              className="rounded object-cover"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
