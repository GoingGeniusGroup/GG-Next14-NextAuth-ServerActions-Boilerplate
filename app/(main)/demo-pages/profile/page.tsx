// "use client";

import PublicProfile from "@/src/components/comp/PublicProfileComponent/PublicProfile";

// import { ProfileForm } from "@/components/form/profile-form";
// import { ExtendedUser } from "@/types/next-auth";
// import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import ProfileMobileView from "@/components/comp/profile/ProfileMobileView";

// export default function ProfilePage({
//   params,
// }: {
//   params: { username: string };
// }) {
//   const { data: session, update: updateSession } = useSession();
//   const [user, setUser] = useState<ExtendedUser | null>(null);

//   const username = params.username;

//   useEffect(() => {
//     if (session?.user) {
//       setUser(session.user as ExtendedUser);
//     }
//   }, [session]);

//   const handleProfileUpdate = async (updatedUser: ExtendedUser) => {
//     setUser(updatedUser);
//     await updateSession({ user: updatedUser });
//   };

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="relative flex justify-center">
//       <div className="border rounded-lg shadow-lg shadow-black/40 p-8 max-w-md w-full">
//         <h2 className="text-2xl font-semibold text-center mb-6 dark:text-white text-black">
//           Profile Settings
//         </h2>
//         <ProfileForm user={user} onProfileUpdate={handleProfileUpdate} />
//       </div>
//       <div className="w-[300px] absolute top-9 right-12">
//         <ProfileMobileView username={username} />
//       </div>
//     </div>
//   );
// }

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <PublicProfile username={"ram"} />
    </div>
  );
}
