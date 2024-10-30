import AvatarManagerServer from "@/components/comp/AvatarManager/avatar-manager-server";

export default function AvatarPage() {
  return (
    <div className="relative container mx-auto">
      <h1 className="text-2xl flex justify-center dark:text-white text-black font-bold mb-4">
        Avatar Management
      </h1>
      <AvatarManagerServer />
    </div>
  );
}
