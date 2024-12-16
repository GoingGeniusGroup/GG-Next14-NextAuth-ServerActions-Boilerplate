// import CustomGalleryComponent from "@/src/components/comp/gallery/CustomGalleryComponent";

import CustomGalleryComponent from "@/src/components/comp/gallery/custom-gallery-component";

interface GeniusUserGalleryProps {
  params: {
    username: string;
  };
}

export default async function GeniusUserGallery({
  params,
}: GeniusUserGalleryProps) {
  const { username } = params;
  return (
    <>
      <CustomGalleryComponent username={username} />
    </>
  );
}
