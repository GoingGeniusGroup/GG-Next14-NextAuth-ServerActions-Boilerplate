import GalleryGridSkeleton from "./GalleryGridSkeleton";
import UploadGalleryDialog from "../Modal/gallery/UploadGalleryDialog";
import { getCurrentUser } from "@/actions/userAndGuild";
import { getImageUrls } from "@/actions/image-post";
import { getUserByUsername } from "@/services/user";
import { imagePostType } from "../Forms/UploadImagesGalleryForm";
import { GalleryGrid } from "@/components/ui/grids/gallery-grid";

export default async function CustomGalleryComponent({
  username,
}: {
  username: string;
}) {
  const currentUser = await getCurrentUser();
  const LoggedUserProfile = currentUser?.username === username;
  const profileOwner = await getUserByUsername(username);

  // Get images based on whose profile we're viewing
  const imagePosts = await getImageUrls(
    LoggedUserProfile,
    LoggedUserProfile ? undefined : profileOwner?.gg_id
  );

  // Convert the images to imagePostType
  const convertedImagePosts: imagePostType[] =
    imagePosts?.map(
      (img_post: {
        description: string | null;
        image_url: string;
        caption: string;
      }) => ({
        image_url: img_post.image_url,
        caption: img_post.caption || "",
        description: img_post.description || "",
      })
    ) || [];

  const cards =
    convertedImagePosts.map((img_post, index) => ({
      id: index,
      content: (
        <DynamicSkeleton
          caption={img_post.caption || ""}
          des={img_post.description || ""}
        />
      ),
      className: index % 2 === 0 ? "md:col-span-2" : "col-span-1",
      thumbnail: img_post.image_url,
    })) || [];

  return (
    <div className="relative h-full overflow-auto w-full px-2">
      {LoggedUserProfile && currentUser && convertedImagePosts && (
        <div className="absolute -top-7 -right-3 z-40">
          <UploadGalleryDialog
            gg_id={currentUser.gg_id}
            currentGalleryImages={convertedImagePosts}
          />
        </div>
      )}
      {imagePosts ? (
        imagePosts.length > 0 ? (
          <GalleryGrid cards={cards} />
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

const DynamicSkeleton = ({
  caption,
  des,
}: {
  caption: string;
  des: string;
}) => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">{caption}</p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {des}
      </p>
    </div>
  );
};
