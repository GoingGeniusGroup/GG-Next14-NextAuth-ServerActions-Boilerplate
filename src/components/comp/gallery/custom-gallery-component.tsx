import { Suspense } from "react";
import { GalleryGrid } from "@/src/ui/grids/gallery-grid";
import { getUserData } from "@/app/actions/auth/user-data";
import { getUserByUsername } from "@/services/user";
import { getImageUrls } from "@/actions/image-post";
import UploadGalleryDialog from "../Modal/gallery/UploadGalleryDialog";

export default async function CustomGalleryComponent({
  username,
}: {
  username: string;
}) {
  const [currentUser, profileOwner] = await Promise.all([
    getUserData(),
    getUserByUsername(username),
  ]);

  const isLoggedUserProfile = currentUser?.username === username;

  const imagePosts = await getImageUrls(
    isLoggedUserProfile,
    isLoggedUserProfile ? undefined : profileOwner?.gg_id
  );

  const cards =
    imagePosts?.map((img_post, index) => ({
      img_id: img_post.img_id,
      index,
      content: (
        <div>
          <h3 className="font-bold md:text-4xl text-xl text-white">
            {img_post.caption || ""}
          </h3>
          <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
            {img_post.description || ""}
          </p>
        </div>
      ),
      className: index % 2 === 0 ? "md:col-span-2" : "col-span-1",
      thumbnail: img_post.image_url,
    })) || [];

  return (
    <div className="relative h-full">
      {/* {isLoggedUserProfile && currentUser && (
        <div className="absolute -top-7 -right-3 z-40">
          <UploadGalleryDialog
            gg_id={currentUser.gg_id}
            currentGalleryImages={imagePosts}
          />
        </div>
      )} */}

      <Suspense fallback={<div>Loading Images</div>}>
        <div className="flex-1 size-full overflow-x-hidden overflow-y-auto py-2">
          {imagePosts?.length ? (
            <GalleryGrid
              cards={cards}
              gg_id={profileOwner?.gg_id}
              loggedUserProfile={isLoggedUserProfile}
            />
          ) : (
            <div className="flex justify-center font-bold w-full text-yellow-500">
              GALLERY IS EMPTY
            </div>
          )}
        </div>
      </Suspense>
    </div>
  );
}
