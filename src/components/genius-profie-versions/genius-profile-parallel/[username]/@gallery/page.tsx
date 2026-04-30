import CustomGalleryComponent from "@/src/components/comp/gallery/CustomGalleryComponent";

interface GeniusUserGalleryProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function GeniusUserGallery(props: GeniusUserGalleryProps) {
  const params = await props.params;
  const { username } = params;
  return (
    <>
      <CustomGalleryComponent username={username} />
    </>
  );
}
