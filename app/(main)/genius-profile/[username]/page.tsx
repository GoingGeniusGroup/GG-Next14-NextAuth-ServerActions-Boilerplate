import AboutSection from "@/components/layouts/console/AboutSection";
import BottomSection from "@/components/layouts/console/BottomSection";
import GeniusUserAvatar from "@/components/layouts/GeniusUserProfile/GeniusUserAvatar";
import GeniusUserHome from "@/components/layouts/GeniusUserProfile/GeniusUserHome";
import BentoGridComponent from "@/components/layouts/grid/bento-grid-1";
import { CollapsibleSidebarTabs } from "@/components/ui/tabs/custom-tabs";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface ProfileViewProps {
  params: {
    username: string;
  };
}

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
  icon: React.ReactNode;
};

export default function GeniusProfilePage({ params }: ProfileViewProps) {
  const username = params.username;

  const tabs: Tab[] = [
    {
      title: "Home",
      value: "home",
      icon: <ChevronRight size={24} />,
      content: (
        <div>
          <GeniusUserHome username={username} />
        </div>
      ),
    },
    {
      title: "Gallery",
      value: "gallery",
      icon: <ChevronRight size={24} />,
      content: (
        <div>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Projects",
      value: "projects",
      icon: <ChevronRight size={24} />,
      content: (
        <div>
          <BentoGridComponent />
        </div>
      ),
    },
    {
      title: "Experience",
      value: "experience",
      icon: <ChevronRight size={24} />,
      content: (
        <div>
          <BentoGridComponent />
        </div>
      ),
    },
  ];

  return (
    <div className="relative size-full">
      {/* Tabs */}
      <CollapsibleSidebarTabs tabs={tabs} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <Image
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQOmWaUAEICbwQ6IZFTNvszqzxitoRog0MQw&s"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
      unoptimized
    />
  );
};
