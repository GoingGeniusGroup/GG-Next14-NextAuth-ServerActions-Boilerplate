import UploadGalleryDialog from "../Modal/gallery/UploadGalleryDialog";
import { imagePostType } from "../Forms/UploadImagesGalleryForm";
import { GalleryGrid } from "@/src/ui/grids/gallery-grid";

type Card = {
  img_id?: string;
  index: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
};

export default function GalleryClient({
  gg_id,
  convertedImagePosts,
  cards,
  loggedUserProfile,
  imagePosts,
}: {
  gg_id: string;
  convertedImagePosts: imagePostType[];
  cards: Card[];
  loggedUserProfile: boolean;
  imagePosts: any;
}) {
  return (
    <>
      <div className="relative h-full">
        {loggedUserProfile && (
          <div className="absolute -top-7 -right-3 z-40">
            <UploadGalleryDialog
              gg_id={gg_id}
              currentGalleryImages={convertedImagePosts}
            />
          </div>
        )}
        <div className="flex-1 size-full overflow-x-hidden overflow-y-auto py-2">
          {imagePosts ? (
            imagePosts.length > 0 ? (
              <>
                <GalleryGrid
                  cards={cards}
                  gg_id={gg_id}
                  loggedUserProfile={loggedUserProfile}
                />
              </>
            ) : (
              <>
                <div className="flex justify-center font-bold w-full text-yellow-500">
                  GALLERY IS EMPTY
                </div>
              </>
            )
          ) : (
            <>
              <div className="flex justify-center font-bold w-full text-yellow-500">
                GALLERY IS EMPTY
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
