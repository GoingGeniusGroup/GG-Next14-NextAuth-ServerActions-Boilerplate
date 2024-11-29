import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfileProps {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
}

export function UserProfile({ id, name, role, avatarUrl }: UserProfileProps) {
  return (
    <Link
      href={`/profile/${id}`}
      className="block transition-transform hover:scale-105"
    >
      <Card className="w-[160px] h-[130px] bg-white dark:bg-black rounded-lg overflow-hidden">
        <CardContent className="flex flex-col items-center p-2">
          <Avatar className="size-[70px] mb-2">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h3 className="text-sm font-semibold">{name}</h3>
          <p className="text-xs text-muted-foreground">{role}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
