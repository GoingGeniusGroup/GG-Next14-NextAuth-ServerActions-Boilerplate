import Navbar from "@/app/_components/navbar";
import { Layout } from "@/components/dom/Layout";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Layout>
        <Navbar />
        <main>{children}</main>
      </Layout>
    </>
  );
}
