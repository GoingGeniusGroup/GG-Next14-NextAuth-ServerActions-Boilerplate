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
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
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
            <p className="text-sm text-gray-600 line-clamp-2">{post.content}</p>
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
  );
};