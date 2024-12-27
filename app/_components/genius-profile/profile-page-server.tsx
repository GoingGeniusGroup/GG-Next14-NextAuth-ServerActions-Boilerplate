import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/app/actions/genius-profile/userAndGuild";
import { getUserByUsername } from "@/app/services/user";
import { getImageUrls } from "@/app/actions/image-post";
import { getExperiencesByUserId } from "@/app/services/experience";
import ProfilePageClient from "@/src/components/genius-profile-v2/profile-page-client";

export default async function ProfilePage({ username }: { username: string }) {
  const [currentUser, profileOwner] = await Promise.all([
    getCurrentUser(),
    getUserByUsername(username),
  ]);

  if (!profileOwner || !currentUser) {
    notFound();
  }

  const isLoggedUserProfile = currentUser.username === username;
  const user = isLoggedUserProfile ? currentUser : profileOwner;

  const [imagePosts, experiences] = await Promise.all([
    getImageUrls(
      isLoggedUserProfile,
      isLoggedUserProfile ? undefined : user.gg_id
    ),
    getExperiencesByUserId(user.gg_id),
  ]);

  const profileData = {
    username,
    fullName: `${user.first_name} ${user.last_name}`,
    firstName: user.first_name || "No first name provided",
    lastName: user.last_name || "No last name provided",
    dob: user.dob || "No date of birth provided",
    bio: user.description || "No bio available",
    address: user.address || "No address provided",
    gg_id: user.gg_id || "No gg_id provided",
    avatarUrl:
      user.avatar?.[0]?.avatar_url ||
      "https://models.readyplayer.me/66fbd22e36a151e549ea8397.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0",
    profilePic: user.image || "/default-pictures/profile.png",
    coverPic:
      user.cover_images[user.cover_images.length - 1] ||
      "/default-pictures/cover-image.png",
    xp: 5000, // Replace with actual XP calculation
    level: 10, // Replace with actual level calculation
  };

  return (
    <Suspense fallback={<div className="text-cyan-500">Loading...</div>}>
      <ProfilePageClient
        profileData={profileData}
        isLoggedUserProfile={isLoggedUserProfile}
        imagePosts={imagePosts}
        experiences={experiences}
        loggedUserAvatarUrl={
          currentUser.avatar?.[0]?.avatar_url ||
          "https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0"
        }
      />
    </Suspense>
  );
}
