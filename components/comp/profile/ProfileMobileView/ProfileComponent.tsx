// "use client";

// import React, { useState, useCallback } from "react";
// import { ProfileForm } from "@/components/form/profile-form";
// import { useSession } from "next-auth/react";
// import { UserRole } from "@prisma/client";
// import { User } from "next-auth";

// export default function ProfileComponent() {
//   const { data: session, update: updateSession } = useSession();
//   const [user, setUser] = useState(session?.user);

//   const handleProfileUpdate = useCallback(
//     async (
//       updatedUser: React.SetStateAction<
//         | (User & {
//             role: UserRole;
//             isTwoFactorEnabled: boolean;
//             isOAuth: boolean;
//           })
//         | undefined
//       >
//     ) => {
//       setUser(updatedUser);
//       await updateSession({ user: updatedUser });
//     },
//     [updateSession]
//   );

//   if (!user) {
//     return <div>Not authenticated</div>;
//   }

//   return (
//     <div className="size-full px-2 overflow-y-auto">
//       <h1 className="sticky top-0 uppercase font-bold text-xl flex justify-center mb-7 p-2 z-20 bg-white/40 backdrop-blur-md rounded-md">
//         Profile
//       </h1>
//       <ProfileForm user={user} onProfileUpdate={handleProfileUpdate} />
//     </div>
//   );
// }
