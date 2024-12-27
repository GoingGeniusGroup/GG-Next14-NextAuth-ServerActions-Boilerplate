import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/app/actions/genius-profile/userAndGuild";
import { getUserByUsername } from "@/app/services/user";
import { getImageUrls } from "@/app/actions/image-post";
import { getExperiencesByUserId } from "@/app/services/experience";
import ProfilePageClient from "@/src/components/genius-profile-v2/profile-page-client";
import ProfileSkeleton from "@/src/components/genius-profile-v2/profile-skeleton";

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
    dob: user.dob || "No date of birth provided",
    bio: user.description || "No bio available",
    gg_id: user.gg_id || "No gg_id provided",
    avatarUrl: user.avatar?.[0]?.avatar_url || "/default-pictures/avatar.png",
    profilePic: user.image || "/default-pictures/profile.png",
    coverPic:
      user.cover_images[user.cover_images.length - 1] ||
      "/default-pictures/cover-image.png",
    xp: 5000, // Replace with actual XP calculation
    level: 10, // Replace with actual level calculation
  };

  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfilePageClient
        profileData={profileData}
        isLoggedUserProfile={isLoggedUserProfile}
        imagePosts={imagePosts}
        experiences={experiences}
      />
    </Suspense>
  );
}
