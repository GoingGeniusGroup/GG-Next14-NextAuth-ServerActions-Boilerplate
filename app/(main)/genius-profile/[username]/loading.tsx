import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black via-black to-purple-900 animate-pulse">
      {/* Main profile section */}
      <div className="relative">
        {/* Main profile image skeleton */}
        <div className="w-full aspect-[4/3] max-w-xl rounded-lg bg-gray-700/50 mb-4" />

        {/* Thumbnail strip */}
        <div className="flex gap-2 max-w-xl overflow-x-auto p-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="w-20 h-20 flex-shrink-0 rounded bg-gray-700/50"
            />
          ))}
        </div>

        {/* Profile info section */}
        <div className="mt-8 flex items-start gap-4">
          {/* Profile picture */}
          <div className="w-16 h-16 rounded-full bg-gray-700/50" />

          {/* Name and bio */}
          <div className="flex-1">
            <div className="h-7 w-48 bg-gray-700/50 rounded mb-2" />
            <div className="h-4 w-32 bg-gray-700/50 rounded mb-4" />
            <div className="h-4 w-full max-w-2xl bg-gray-700/50 rounded mb-2" />
            <div className="h-4 w-3/4 bg-gray-700/50 rounded" />
          </div>
        </div>

        {/* Achievements section */}
        <div className="mt-8 flex gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-24 h-24 bg-gray-700/50 rounded-lg" />
          ))}
        </div>

        {/* Level bar */}
        <div className="mt-8 p-4 bg-black/40 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gray-700/50 rounded" />
            <div className="h-4 w-24 bg-gray-700/50 rounded" />
          </div>
          <div className="h-2 w-full bg-gray-700/50 rounded-full" />
        </div>

        {/* Navigation tabs */}
        <div className="mt-8 flex gap-4">
          {["Gallery", "Projects", "Cards"].map((tab) => (
            <div key={tab} className="h-10 w-24 bg-gray-700/50 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
