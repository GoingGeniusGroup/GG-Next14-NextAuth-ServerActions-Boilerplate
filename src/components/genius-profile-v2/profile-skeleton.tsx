import { Skeleton } from "@/src/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-48 w-full" /> {/* Cover image */}
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" /> {/* Avatar */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" /> {/* Name */}
          <Skeleton className="h-4 w-[200px]" /> {/* Username */}
        </div>
      </div>
      <Skeleton className="h-4 w-full" /> {/* Bio */}
      <div className="flex space-x-2">
        <Skeleton className="h-10 w-20" /> {/* Tab 1 */}
        <Skeleton className="h-10 w-20" /> {/* Tab 2 */}
        <Skeleton className="h-10 w-20" /> {/* Tab 3 */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[200px]" /> /* Content items */
        ))}
      </div>
    </div>
  );
};

export default ProfileSkeleton;
