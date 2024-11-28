import { getCurrentUser } from "@/actions/userAndGuild";
import { LayoutGrid } from "@/components/ui/grids/layout-grid";
import { getUserByUsername } from "@/services/user";
import UploadGalleryDialog from "../Modal/gallery/UploadGalleryDialog";
import GalleryGridSkeleton from "./GalleryGridSkeleton";
import { getImageUrls } from "@/actions/image-post";
import { imagePostType } from "../Forms/UploadImagesGalleryForm";

export default async function CustomGalleryComponent({
  username,
}: {
  username: string;
}) {
  const currentUser = await getCurrentUser();
  const imageposts = await getImageUrls()
  const LoggedUserProfile = currentUser?.username === username;
  const profileOwner = await getUserByUsername(username);
  console.log('====================================');
  console.log(imageposts);
  console.log('====================================');
  const images = LoggedUserProfile
    ? currentUser?.image_urls
    : profileOwner?.image_urls;

  const cards =
  imageposts?.map((img_post:imagePostType, index:number) => ({
      id: index,
      content: <DynamicSkeleton caption={ img_post.caption!} des={ img_post.description!} />,
      className: index % 2 === 0 ? "md:col-span-2" : "col-span-1",
      thumbnail: img_post.image_url,
    })) || [];

  return (
    <div className="relative h-screen w-full px-2">
      {LoggedUserProfile && currentUser && (
        <div className="absolute top-2 right-2 z-50">
          <UploadGalleryDialog
            gg_id={currentUser.gg_id}
            currentGalleryImages={imageposts}
          />
        </div>
      )}
      {images ? (
        images.length > 0 ? (
          <LayoutGrid cards={cards} />
        ) : (
          <>
            <div className="flex justify-center font-bold w-full text-yellow-500">
              GALLERY IS EMPTY
            </div>
            <GalleryGridSkeleton />
          </>
        )
      ) : (
        <>
          <div className="flex justify-center font-bold w-full text-yellow-500">
            GALLERY IS EMPTY
          </div>
          <GalleryGridSkeleton />
        </>
      )}
    </div>
  );
}

const DynamicSkeleton = ({ caption, des }: { 
  caption: string;
  des:string
 }) => {
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
        {caption}
      </p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {des}
      </p>
    </div>
  );
};
