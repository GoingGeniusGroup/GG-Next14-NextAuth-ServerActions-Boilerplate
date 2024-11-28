import GalleryGridSkeleton from "@/components/comp/gallery/GalleryGridSkeleton";

export default function GalleryLoading() {
  return (
    <>
      <div className="flex justify-center font-bold w-full text-yellow-500">
        GALLERY LOADING ...
      </div>
      <GalleryGridSkeleton />
    </>
  );
}
