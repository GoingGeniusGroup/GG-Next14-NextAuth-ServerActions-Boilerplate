import AboutSection from "@/components/layouts/console/AboutSection";
import BottomSection from "@/components/layouts/console/BottomSection";
import CustomGalleryComponent from "@/components/layouts/gallery/CustomGalleryComponent";
import GeniusUserAvatar from "@/components/layouts/GeniusUserProfile/GeniusUserAvatar";
import GeniusUserHome from "@/components/layouts/GeniusUserProfile/GeniusUserHome";
import GeniusUserProjectsComponent from "@/components/layouts/GeniusUserProfile/GeniusUserProjectsComponent";
import BentoGridComponent from "@/components/layouts/grid/bento-grid-1";
import { CollapsibleSidebarTabs } from "@/components/ui/tabs/custom-tabs";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconExposure,
  IconFileBroken,
  IconHome,
  IconPhoto,
  IconSignature,
  IconTableColumn,
  IconTool,
} from "@tabler/icons-react";
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

  const images = [
    {
      title: "The Dawn of Innovation",
      description: "Explore the birth of groundbreaking ideas and inventions.",
      image:
        "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
      icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "The Digital Revolution",
      description: "Dive into the transformative power of technology.",
      image:
        "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
      icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "The Art of Design",
      description: "Discover the beauty of thoughtful and functional design.",
      image:
        "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
      icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "The Power of Communication",
      description:
        "Understand the impact of effective communication in our lives.",
      image:
        "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
      icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "The Pursuit of Knowledge",
      description: "Join the quest for understanding and enlightenment.",
      image:
        "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
      icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "The Joy of Creation",
      description: "Experience the thrill of bringing ideas to life.",
      image:
        "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
      icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    },
    {
      title: "The Spirit of Adventure",
      description: "Embark on exciting journeys and thrilling discoveries.",
      image:
        "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
      icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    },
  ];

  const tabs: Tab[] = [
    {
      title: "Home",
      value: "home",
      icon: <IconHome size={24} />,
      content: (
        <div>
          <GeniusUserHome username={username} />
        </div>
      ),
    },
    {
      title: "Gallery",
      value: "gallery",
      icon: <IconPhoto size={24} />,
      content: (
        <div>
          <CustomGalleryComponent items={images} />
        </div>
      ),
    },
    {
      title: "Projects",
      value: "projects",
      icon: <IconTool size={24} />,
      content: (
        <div>
          <GeniusUserProjectsComponent />
        </div>
      ),
    },
    {
      title: "Experience",
      value: "experience",
      icon: <IconExposure size={24} />,
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

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
