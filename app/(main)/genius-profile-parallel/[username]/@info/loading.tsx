export default function InfoLoading() {
  return (
    <div className="flex w-full justify-between p-4 animate-pulse space-x-4">
      {/* Left Section - Profile Skeleton */}
      <div className="w-[35%] pr-4">
        <div className="p-4 border flex flex-col gap-4 rounded-lg">
          <div className="flex items-center space-x-3 w-full">
            {/* Profile Image */}
            <div className="size-8 bg-gray-300 rounded-full"></div>
            {/* Username */}
            <div className="flex flex-col space-y-2 w-[70%]">
              <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* User Info Skeleton */}
          <div className="space-y-2 bg-gray-300 rounded-lg p-2">
            <div className="h-4 w-full bg-gray-500 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-500 rounded"></div>
            <div className="h-4 w-4/5 bg-gray-500 rounded"></div>
          </div>
          <div className="space-y-2 bg-gray-300 rounded-lg p-2">
            <div className="h-4 w-5/6 bg-gray-500 rounded"></div>
            <div className="h-4 w-4/5 bg-gray-500 rounded"></div>
          </div>
        </div>

        {/* Achievements Skeleton */}
        <div className="border rounded-lg p-4 mt-4">
          <div className="flex gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="size-10 bg-gray-300 rounded-full"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section - Projects Skeleton */}
      <div className="w-[35%] space-y-4 pl-4">
        <div className="p-2 rounded-lg border flex gap-x-2">
          <div className="h-[116px] w-full bg-white/20 rounded-md"></div>
          <div className="h-[116px] w-full bg-white/20 rounded-md"></div>
        </div>
        <div className="grid grid-cols-2 border rounded-lg p-2 gap-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-full h-24 bg-gray-300 rounded-lg flex items-center p-1"
            >
              <div className="size-full bg-gray-200 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
