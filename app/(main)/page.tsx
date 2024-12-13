import { Metadata } from "next";
import VideoHomeServer from "../_components/home/video-home-server";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  return <VideoHomeServer />;
}
