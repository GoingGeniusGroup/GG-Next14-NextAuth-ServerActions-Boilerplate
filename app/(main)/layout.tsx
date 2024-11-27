import { Layout } from "@/components/comp/dom/Layout";
import { TooltipProvider } from "@/components/ui/tooltip/tooltip";
import { signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { currentUser } from "@/lib/auth";
import { getUserAvatars } from "@/actions/avatar";
import {
  AvatarProvider,
  AvatarType,
} from "@/components/comp/AvatarManager/provider/AvatarManagerContext";

export default async function MainLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  async function handleServerSignOut() {
    "use server";

    try {
      await signOut({ redirect: false });
      revalidatePath("/");
      return { success: true };
    } catch (error) {
      console.error("Server logout error:", error);
      return { success: false, error: "Failed to logout" };
    }
  }

  const user = await currentUser();

  if (!user) {
    return (
      <>
        <Layout handleServerSignOut={handleServerSignOut}>
          <TooltipProvider>{children}</TooltipProvider>
        </Layout>
      </>
    );
  }

  const avatarsResponse = await getUserAvatars(user.gg_id);
  const avatars: AvatarType[] =
    avatarsResponse.success && Array.isArray(avatarsResponse.data)
      ? avatarsResponse.data
      : [];

  return (
    <>
      <Layout handleServerSignOut={handleServerSignOut}>
        <TooltipProvider>
          <AvatarProvider initialAvatars={avatars} user={user}>
            {children}
          </AvatarProvider>
        </TooltipProvider>
      </Layout>
    </>
  );
}
