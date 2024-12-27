import { getCurrentUser } from "@/app/actions/genius-profile/userAndGuild";
import { getImageUrls } from "@/app/actions/image-post";
import { getExperiencesByUserId } from "@/app/services/experience";
import { getUserByUsername } from "@/app/services/user";
import { imagePostType } from "@/src/components/comp/Forms/UploadImagesGalleryForm";
import ProfilePageClient from "@/src/components/genius-profile-v2/profile-page-client";
import Image from "next/image";

export default async function ProfilePageServer({
  username,
}: {
  username: string;
}) {
  const currentUser = await getCurrentUser();
  const profileOwner = await getUserByUsername(username);

  // Handle cases where user data is not found
  if (!profileOwner || !currentUser) {
    return <div>User with this username not found</div>;
  }

  const LoggedUserProfile = currentUser?.username === username;

  // Define profile details
  const fullName = LoggedUserProfile
    ? `${currentUser.first_name} ${currentUser.last_name}`
    : `${profileOwner.first_name} ${profileOwner.last_name}`;

  const dob = LoggedUserProfile
    ? currentUser.dob || "No title provided"
    : profileOwner.dob || "No title provided";

  const bio = LoggedUserProfile
    ? currentUser.description || "No bio available"
    : profileOwner.description || "No bio available";

  const gg_id = LoggedUserProfile
    ? currentUser.gg_id || "No gg_id provided"
    : profileOwner.gg_id || "No gg_id provided";

  const avatarUrl = LoggedUserProfile
    ? currentUser?.avatar?.[0]?.avatar_url ||
      "https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0"
    : profileOwner?.avatar?.[0]?.avatar_url ||
      "https://models.readyplayer.me/66fbd22e36a151e549ea8397.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0";

  // Get images based on whose profile we're viewing
  const imagePosts = await getImageUrls(
    LoggedUserProfile,
    LoggedUserProfile ? undefined : profileOwner?.gg_id
  );

  const profilePic = LoggedUserProfile
    ? currentUser.image || "/default-pictures/profile.png"
    : profileOwner.image || "/default-pictures/profile.png";

  const coverPic = LoggedUserProfile
    ? currentUser.cover_images[currentUser.cover_images.length - 1] ||
      "/default-pictures/cover-image.png"
    : profileOwner.cover_images[profileOwner.cover_images.length - 1] ||
      "/default-pictures/cover-image.png";

  // Convert the images to imagePostType
  const convertedImagePosts: imagePostType[] =
    imagePosts?.map(
      (img_post: {
        img_id: string;
        description: string | null;
        image_url: string;
        caption: string;
      }) => ({
        img_id: img_post.img_id,
        image_url: img_post.image_url,
        caption: img_post.caption || "",
        description: img_post.description || "",
      })
    ) || [];

  const cards =
    convertedImagePosts.map((img_post, index) => ({
      img_id: img_post.img_id,
      index: index,
      content: (
        <div className="flex flex-col justify-between h-full">
          <div className="flex-1">
            <Image
              src={img_post.image_url}
              alt="gallery"
              width={100}
              height={100}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex justify-between items-center py-2">
            <div className="text-sm font-bold">{img_post.caption}</div>
          </div>
        </div>
      ),
      className: index % 2 === 0 ? "md:col-span-2" : "col-span-1",
      thumbnail: img_post.image_url,
    })) || [];

  const experiences = await getExperiencesByUserId(gg_id);

  // Render the client-side profile component
  return (
    <ProfilePageClient
      username={username}
      fullName={fullName}
      dob={dob}
      bio={bio}
      avatarUrl={avatarUrl}
      gg_id={gg_id}
      convertedImagePosts={convertedImagePosts}
      cards={cards}
      loggedUserProfile={LoggedUserProfile}
      imagePosts={imagePosts}
      experiences={experiences}
      profilePic={profilePic}
      coverPic={coverPic}
    />
  );
}
