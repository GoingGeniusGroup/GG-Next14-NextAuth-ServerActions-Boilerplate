import AvatarManagerServer from "@/components/comp/AvatarManager/avatar-manager-server";

export default function AvatarPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Avatar Management</h1>
      <AvatarManagerServer />
    </div>
  );
}
