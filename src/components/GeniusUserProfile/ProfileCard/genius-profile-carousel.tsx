"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/src/ui/button";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { UserProfile } from "./user-profile";

interface User {
  username: string;
  firstName: string;
  role: string;
  image: string;
}

function ProfileCard({
  index,
  active,
  total,
  user,
  isUserLoggedIn,
  toggleModal,
  rotation,
}: {
  index: number;
  active: number;
  total: number;
  user: User;
  isUserLoggedIn: boolean;
  toggleModal: () => void;
  rotation: number;
}) {
  // Calculate the angle for each card based on its index
  const angle = (index / total) * 2 * Math.PI;
  // Adjust radius for better spacing
  const radius = 400;
  // Calculate x and z positions using sine and cosine
  const x = Math.sin(angle + rotation) * radius;
  const z = Math.cos(angle + rotation) * radius;
  // Calculate opacity based on z position for depth effect
  const opacity = z < 0 ? 0.3 : 1;
  // Calculate scale based on z position for perspective effect
  const scale = z < 0 ? 0.8 : 1;

  // Determine if the card is in the middle or front
  const isMiddleOrFront = z >= 0;

  return (
    <motion.div
      initial={false}
      animate={{
        x,
        z,
        scale,
        opacity,
        rotateY: (angle + rotation) * (180 / Math.PI),
      }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 15,
        mass: 1,
      }}
      style={{
        position: "absolute",
        transformStyle: "preserve-3d",
        transform: `translate3d(${x}px, 0, ${z}px)`,
      }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div
        className={`transition-all duration-300 ${
          index === active ? "z-10" : "z-0"
        } ${isMiddleOrFront ? "group" : ""}`} // Add group class for middle/front cards
      >
        <UserProfile
          username={user.username}
          name={user.firstName}
          role={user.role}
          avatarUrl={user.image}
          isUserLoggedIn={isUserLoggedIn}
          toggleModal={toggleModal}
          className={`
            ${
              isMiddleOrFront
                ? "group-hover:scale-105 group-hover:shadow-xl transition-transform duration-300"
                : ""
            }
          `}
        />
      </div>
    </motion.div>
  );
}

export function GeniusProfileCarousel({
  users,
  toggleModal,
  isUserLoggedIn,
}: {
  users: User[];
  toggleModal: () => void;
  isUserLoggedIn: boolean;
}) {
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const dragStartX = useRef(0);
  const dragStartRotation = useRef(0);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const rotateToIndex = useCallback(
    (index: number) => {
      const targetRotation = -((2 * Math.PI) / users.length) * index;
      setRotation((prevRotation) => {
        const shortestRotation =
          ((targetRotation - prevRotation + Math.PI) % (2 * Math.PI)) - Math.PI;
        return prevRotation + shortestRotation;
      });
      setActiveIndex(index);
    },
    [users.length]
  );

  const handleNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % users.length;
    rotateToIndex(nextIndex);
  }, [activeIndex, users.length, rotateToIndex]);

  const handlePrev = useCallback(() => {
    const prevIndex = (activeIndex - 1 + users.length) % users.length;
    rotateToIndex(prevIndex);
  }, [activeIndex, users.length, rotateToIndex]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    dragStartX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
    dragStartRotation.current = rotation;
  };

  const handleDragMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      const delta = (x - dragStartX.current) * 0.005; // Reduced sensitivity
      const newRotation = dragStartRotation.current + delta;
      setRotation(newRotation);

      // Calculate new active index based on rotation
      const newIndex =
        Math.round((-newRotation / (2 * Math.PI)) * users.length) %
        users.length;
      const normalizedIndex = newIndex < 0 ? users.length + newIndex : newIndex;
      setActiveIndex(normalizedIndex);
    },
    [isDragging, users.length]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    rotateToIndex(activeIndex);
  }, [activeIndex, rotateToIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayIntervalRef.current = setInterval(handleNext, 5000); // Increased interval
    }
    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [isAutoPlaying, handleNext]);

  // Event listeners for drag
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchmove", handleDragMove);
      window.addEventListener("touchend", handleDragEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  return (
    <div className="relative h-full w-full">
      {/* 3D scene container */}
      <div
        className="absolute inset-0 perspective-[1500px]"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence>
              {users.map((user, index) => (
                <ProfileCard
                  key={user.username}
                  index={index}
                  active={activeIndex}
                  total={users.length}
                  user={user}
                  isUserLoggedIn={isUserLoggedIn}
                  toggleModal={toggleModal}
                  rotation={rotation}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 top-20 flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 cursor-pointer"
          onClick={handlePrev}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        >
          {isAutoPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={handleNext}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
}
