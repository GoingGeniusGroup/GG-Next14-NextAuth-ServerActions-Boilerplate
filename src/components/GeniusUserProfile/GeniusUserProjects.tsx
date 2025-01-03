"use client";

import React, { useState } from "react";
import {
  BentoGridHover,
  BentoGridHoverItem,
} from "@/src/ui/bento-grid/bento-grid-hover";
import ExperienceDialog from "../comp/Modal/experience/AddUpdateExperienceDialog";
import { DeleteExperienceDialog } from "../comp/Modal/experience/DeleteExperienceDialog";

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
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <BentoGridHover className="relative py-10">
      {LoggedUserProfile && (
        <div className="absolute top-2 right-2 z-40">
          <ExperienceDialog gg_id={userInfo.gg_id} />
        </div>
      )}
      {items.map((item, idx) => (
        <BentoGridHoverItem
          key={idx}
          title={
            <div className="flex justify-between items-center gap-2">
              <span>{item.name}</span>
              {LoggedUserProfile && (
                <div className="flex gap-2">
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
          header={item.project_pictures[item.project_pictures.length - 1]}
          skills={item.project_skills}
          tools={item.tools}
          className={idx === 3 || idx === 6 ? "md:col-span-2" : ""}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          isHovered={hoveredIndex === idx}
        />
      ))}
    </BentoGridHover>
  );
}
