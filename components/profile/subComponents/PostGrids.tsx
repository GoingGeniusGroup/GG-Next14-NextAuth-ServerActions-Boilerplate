"use client";

import React, { useEffect, useState } from "react";
import { PostCard } from "./PostCard";
import { ControlPanel } from "./ControlPanel";

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

  useEffect(() => {
    setDisplayedPosts(posts);
  }, [posts]);

  const handleShuffle = () => setDisplayedPosts(shuffleArray(posts));
  const handleSort = () =>
    setDisplayedPosts(
      [...displayedPosts].sort((a, b) => a.title.localeCompare(b.title))
    );
  const handleFilter = (filter: string) => {
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
    <div className="relative space-y-6">
      <div className="sticky top-0 w-full bg-white/30 backdrop-blur-md z-20 rounded-lg p-1">
        <ControlPanel
          onShuffle={handleShuffle}
          onSort={handleSort}
          onFilter={handleFilter}
        />
      </div>

      <div className={`grid gap-4 ${gridClasses[layout]}`}>
        {displayedPosts.map((post) => (
          <PostCard key={post.id} post={post} layout={layout} />
        ))}
      </div>
    </div>
  );
};

export default PostsGrid;
