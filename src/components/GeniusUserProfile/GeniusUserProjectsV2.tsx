"use client";

import React, { useState } from "react";
import ExperienceDialog from "../comp/Modal/experience/AddUpdateExperienceDialog";
import { DeleteExperienceDialog } from "../comp/Modal/experience/DeleteExperienceDialog";
import {
  BentoGridHoverItemV2,
  BentoGridHoverV2,
} from "@/src/ui/bento-grid/bento-grid-hover-v2";

interface ItemsProp {
  items: {
    name: string;
    description: string;
    project_pictures: string;
    icon: React.ReactNode;
    type: string;
    link: string;
    tools: string[];
    project_skills: string[];
    experience_id: string;
  }[];
  userInfo: {
    gg_id: string;
  };
  LoggedUserProfile: boolean;
}

export default function GeniusUserProjects({
  items,
  userInfo,
  LoggedUserProfile,
}: ItemsProp) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative px-2">
      {LoggedUserProfile && (
        <div className="absolute top-2 right-2 z-40">
          <ExperienceDialog gg_id={userInfo.gg_id} />
        </div>
      )}
      <BentoGridHoverV2 className="pb-10 h-full overflow-x-hidden overflow-y-auto z-10">
        {items.map((item, idx) => (
          <BentoGridHoverItemV2
            key={idx}
            topTitle={item.name}
            title={
              <div className="flex justify-between items-center gap-2">
                <span>{item.name}</span>
                {LoggedUserProfile && (
                  <div className="flex gap-2 items-center">
                    <ExperienceDialog
                      gg_id={userInfo.gg_id}
                      experience_id={item.experience_id}
                      defaultValues={{
                        type: item.type,
                        name: item.name,
                        description: item.description,
                        tools: item.tools,
                        project_skills: item.project_skills,
                        project_pictures: [item.project_pictures],
                        link: item.link,
                      }}
                    />
                    <DeleteExperienceDialog
                      experienceId={item.experience_id}
                      experienceName={item.name}
                    />
                  </div>
                )}
              </div>
            }
            description={item.description}
            header={item.project_pictures[0]}
            skills={item.project_skills}
            tools={item.tools}
            link={item.link}
            className={idx === 3 || idx === 6 ? "md:col-span-2" : ""}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            isHovered={hoveredIndex === idx}
          />
        ))}
      </BentoGridHoverV2>
    </div>
  );
}
