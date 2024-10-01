// import VideoHome from "@/components/HomePage/VideoHome";
import { currentUser } from "@/lib/auth";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const user = await currentUser();
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center max-w-sm w-full">
        <div className="text-xl font-semibold text-gray-800 mb-6">
          Hello {user?.name}
        </div>
        <nav className="flex flex-col w-full space-y-3">
          <Link
            href="/shop-test"
            className="text-gray-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-md text-center bg-gray-50 hover:bg-gray-100"
          >
            Shop
          </Link>
          <Link
            href="/avatar"
            className="text-gray-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-md text-center bg-gray-50 hover:bg-gray-100"
          >
            Avatar
          </Link>
          <Link
            href="/profile"
            className="text-gray-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-md text-center bg-gray-50 hover:bg-gray-100"
          >
            Profile
          </Link>
          <Link
            href="/steam"
            className="text-gray-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-md text-center bg-gray-50 hover:bg-gray-100"
          >
            Steam
          </Link>
        </nav>
      </div>
    </div>
  );
}
