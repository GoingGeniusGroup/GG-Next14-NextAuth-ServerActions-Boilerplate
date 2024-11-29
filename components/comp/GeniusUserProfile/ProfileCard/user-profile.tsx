import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface UserProfileProps {
  username: string;
  name: string;
  role: string;
  avatarUrl: string;
}

export function UserProfile({
  username,
  name,
  role,
  avatarUrl,
}: UserProfileProps) {
  return (
    <Link
      href={`/genius-profile/${username}`}
      className="block transition-transform hover:scale-105"
    >
      <Card className="group w-[160px] h-[160px] bg-white dark:bg-black rounded-lg overflow-hidden">
        <CardContent className="relative overflow-hidden  size-full flex items-center p-2">
          <div className="size-full">
            <Image
              src={avatarUrl}
              alt={name}
              fill
              unoptimized
              onError={(e) => {
                e.currentTarget.style.display = "none"; // Hide broken image
              }}
            />
          </div>
          <h3 className="absolute inset-0 opacity-50 group-hover:opacity-100 flex justify-center items-center text-xl font-bold uppercase text-black dark:text-white transition-all duration-300">
            {username}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
}
