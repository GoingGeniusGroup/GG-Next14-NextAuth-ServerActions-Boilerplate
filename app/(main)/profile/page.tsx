import { ProfileForm } from "@/components/form/profile-form";
import { currentUser } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const user = await currentUser();
  if (!user) return;

  return (
    <div className="flex justify-center items-center min-h-screen my-16 bg-white">
    <div className="bg-white rounded-lg shadow-lg shadow-black/40 p-8 max-w-md w-full">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Profile Settings
      </h2>
      <ProfileForm user={user}/>
    </div>
  </div>
  );
}
