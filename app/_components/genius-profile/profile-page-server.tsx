import { cache } from "react";
import { getCurrentUser } from "@/app/actions/genius-profile/userAndGuild";
import { getUserByUsername } from "@/app/services/user";
import { getImageUrls } from "@/app/actions/image-post";
import { getExperiencesByUserId } from "@/app/services/experience";
import ProfilePageClient from "@/src/components/genius-profile-v2/profile-page-client";
import UserNotFound from "@/src/components/genius-profile-v2/user-not-found";

// Cache the data fetching functions
const getCachedCurrentUser = cache(getCurrentUser);
const getCachedUserByUsername = cache(getUserByUsername);
const getCachedImageUrls = cache(getImageUrls);
const getCachedExperiences = cache(getExperiencesByUserId);

export default async function ProfilePage({ username }: { username: string }) {
  try {
    // Use Promise.allSettled to handle potential failures gracefully
    const [currentUserResult, profileOwnerResult] = await Promise.allSettled([
      getCachedCurrentUser(),
      getCachedUserByUsername(username),
    ]);

    const currentUser =
      currentUserResult.status === "fulfilled" ? currentUserResult.value : null;
    const profileOwner =
      profileOwnerResult.status === "fulfilled"
        ? profileOwnerResult.value
        : null;

    if (!profileOwner || !currentUser) {
      throw new Error("Required data not available");
    }

    const isLoggedUserProfile = currentUser.username === username;
    const user = isLoggedUserProfile ? currentUser : profileOwner;

    // Prefetch the next data to prevent waterfall
    const [imagePosts, experiences] = await Promise.all([
      getCachedImageUrls(
        isLoggedUserProfile,
        isLoggedUserProfile ? undefined : user.gg_id
      ),
      getCachedExperiences(user.gg_id),
    ]);

    const profileData = {
      username,
      fullName: `${user.first_name} ${user.last_name}`,
      firstName: user.first_name || "",
      lastName: user.last_name || "",
      dob: user.dob || "",
      bio: user.description || "",
      address: user.address || "",
      gg_id: user.gg_id || "No gg_id provided",
      avatarUrl:
        user.avatar?.[0]?.avatar_url ||
        "https://models.readyplayer.me/66fbd22e36a151e549ea8397.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0",
      profilePic: user.image || "/default-pictures/profile.png",
      coverPic:
        user.cover_images[user.cover_images.length - 1] ||
        "/default-pictures/cover-image.png",
      xp: 5000,
      level: 10,
    };

    return (
      <ProfilePageClient
        key={username} // Add a key to force re-render on username change
        profileData={profileData}
        isLoggedUserProfile={isLoggedUserProfile}
        imagePosts={imagePosts}
        experiences={experiences}
        loggedUserAvatarUrl={
          currentUser.avatar?.[0]?.avatar_url ||
          "https://models.readyplayer.me/658be9e8fc8bec93d06806f3.glb?morphTargets=ARKit,Eyes Extra&textureAtlas=none&lod=0"
        }
      />
    );
  } catch (error) {
    console.error("Error loading profile:", error);
    return <UserNotFound username={username} />;
  }
}
