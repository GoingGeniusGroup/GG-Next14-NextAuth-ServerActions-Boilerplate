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
        stiffness: 100,
        damping: 20,
        mass: 1,
      }}
      style={{
        position: "absolute",
        transformStyle: "preserve-3d",
        transform: `translate3d(${x}px, 0, ${z}px)`,
      }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div
        className={`w-72 h-96 transition-all duration-300 ${
          index === active ? "z-10" : "z-0"
        }`}
      >
        <UserProfile
          username={user.username}
          name={user.firstName}
          role={user.role}
          avatarUrl={user.image}
          isUserLoggedIn={isUserLoggedIn}
          toggleModal={toggleModal}
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
      setRotation(targetRotation);
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
      const delta = (x - dragStartX.current) * 0.01;
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
      autoPlayIntervalRef.current = setInterval(handleNext, 3000);
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
      <div className="absolute inset-x-0 bottom-8 flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
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
