import { getCurrentUser } from "@/actions/userAndGuild";
import { LayoutGrid } from "@/components/ui/grids/layout-grid";
import { getUserByUsername } from "@/services/user";
import UploadGalleryDialog from "../Modal/gallery/UploadGalleryDialog";
import GalleryGridSkeleton from "./GalleryGridSkeleton";

export default async function CustomGalleryComponent({
  username,
}: {
  username: string;
}) {
  const currentUser = await getCurrentUser();
  const LoggedUserProfile = currentUser?.username === username;
  const profileOwner = await getUserByUsername(username);

  const images = LoggedUserProfile
    ? currentUser?.image_urls
    : profileOwner?.image_urls;

  const cards =
    images?.map((url, index) => ({
      id: index + 1,
      content: <DynamicSkeleton index={index} />,
      className: index % 2 === 0 ? "md:col-span-2" : "col-span-1",
      thumbnail: url,
    })) || [];

  return (
    <div className="relative h-screen w-full px-2">
      {LoggedUserProfile && currentUser && (
        <div className="absolute top-2 right-2 z-50">
          <UploadGalleryDialog
            gg_id={currentUser.gg_id}
            currentGalleryImages={currentUser.image_urls}
          />
        </div>
      )}
      {images ? (
        images.length > 0 ? (
          <LayoutGrid cards={cards} />
        ) : (
          <GalleryGridSkeleton />
        )
      ) : (
        <GalleryGridSkeleton />
      )}
    </div>
  );
}

const DynamicSkeleton = ({ index }: { index: number }) => {
  const titles = [
    "House in the woods",
    "House above the clouds",
    "Greens all over",
    "Rivers are serene",
  ];

  const descriptions = [
    "A serene and tranquil retreat, this house in the woods offers a peaceful escape from city life.",
    "Perched high above the world, this house offers breathtaking views and a unique living experience.",
    "A house surrounded by greenery and nature's beauty, perfect for relaxing and unwinding.",
    "A house by the river that offers peace and tranquility.",
  ];

  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        {titles[index % titles.length]}
      </p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {descriptions[index % descriptions.length]}
      </p>
    </div>
  );
};
