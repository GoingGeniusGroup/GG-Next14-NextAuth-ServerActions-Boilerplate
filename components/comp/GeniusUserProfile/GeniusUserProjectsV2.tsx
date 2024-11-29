"use client";

import React, { useState } from "react";
import ExperienceDialog from "../Modal/experience/AddUpdateExperienceDialog";
import { DeleteExperienceDialog } from "../Modal/experience/DeleteExperienceDialog";
import {
  BentoGridHoverItemV2,
  BentoGridHoverV2,
} from "@/components/ui/bento-grid/bento-grid-hover-v2";

interface ItemsProp {
  items: {
    title: string;
    description: string;
    image: string;
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
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <BentoGridHoverV2 className="relative pb-10">
      {LoggedUserProfile && (
        <div className="absolute -top-7 -right-3 z-40">
          <ExperienceDialog gg_id={userInfo.gg_id} />
        </div>
      )}
      {items.map((item, idx) => (
        <BentoGridHoverItemV2
          key={idx}
          topTitle={item.title}
          title={
            <div className="flex justify-between items-center gap-2">
              <span>{item.title}</span>
              {LoggedUserProfile && (
                <div className="flex gap-2 items-center">
                  <ExperienceDialog
                    gg_id={userInfo.gg_id}
                    experience_id={item.experience_id}
                    defaultValues={{
                      type: item.type,
                      name: item.title,
                      description: item.description,
                      tools: item.tools,
                      project_skills: item.project_skills,
                      project_pictures: [item.image],
                      link: item.link,
                    }}
                  />
                  <DeleteExperienceDialog
                    experienceId={item.experience_id}
                    experienceName={item.title}
                  />
                </div>
              )}
            </div>
          }
          description={item.description}
          header={item.image}
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
  );
}