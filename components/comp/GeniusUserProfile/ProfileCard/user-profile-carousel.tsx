import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { UserProfile } from "./user-profile";

// Mock data for demonstration
const users = [
  {
    id: "1",
    name: "Alice Johnson",
    role: "Designer",
    avatarUrl: "/placeholder.svg?height=96&width=96",
  },
  {
    id: "2",
    name: "Bob Smith",
    role: "Developer",
    avatarUrl: "/placeholder.svg?height=96&width=96",
  },
  {
    id: "3",
    name: "Charlie Brown",
    role: "Manager",
    avatarUrl: "/placeholder.svg?height=96&width=96",
  },
  {
    id: "4",
    name: "Diana Ross",
    role: "Product Owner",
    avatarUrl: "/placeholder.svg?height=96&width=96",
  },
  {
    id: "5",
    name: "Ethan Hunt",
    role: "QA Engineer",
    avatarUrl: "/placeholder.svg?height=96&width=96",
  },
  {
    id: "6",
    name: "Ethan Hunt",
    role: "QA Engineer",
    avatarUrl: "/placeholder.svg?height=96&width=96",
  },
  {
    id: "7",
    name: "Ethan Hunt",
    role: "QA Engineer",
    avatarUrl: "/placeholder.svg?height=96&width=96",
  },
  {
    id: "8",
    name: "Ethan Hunt",
    role: "QA Engineer",
    avatarUrl: "/placeholder.svg?height=96&width=96",
  },
];

export function UserProfilesCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-[80%]"
    >
      <CarouselContent>
        {users.map((user) => (
          <CarouselItem key={user.id} className="md:basis-1/2 lg:basis-1/4">
            <div className="p-1">
              <UserProfile {...user} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
