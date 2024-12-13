"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { UserRound } from "lucide-react";

import { Button } from "@/src/ui/button/button";
import { UserProfilesCarousel } from "../GeniusUserProfile/ProfileCard/user-profile-carousel";
import { LoginForm } from "@/src/components/form/login-form";
import { RegisterForm } from "@/src/components/form/register-form";

export default function HomePage({
  user,
  profilePic,
  staticUsers,
}: {
  user: any;
  profilePic: string;
  staticUsers: any[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const isUserLoggedIn = user ? true : false;

  useEffect(() => {
    // Only proceed if we have auth_redirect parameter
    if (searchParams.get("auth_redirect") === "true") {
      // Show the toast
      toast.error(`Please log in to access this page`, {
        position: "top-center",
        icon: "🔒",
        duration: 4000,
        style: {
          background: "#DC262690",
          backdropFilter: "blur(4px)",
          color: "#fff",
          padding: "8px",
          borderRadius: "8px",
        },
      });

      // Clean up URL parameters
      const newUrl = window.location.pathname;
      router.replace(newUrl);

      setTimeout(() => {
        setShowModal(true);
      }, 500);
    }
  }, [searchParams, router]);

  const handleGetStarted = () => {
    if (user) {
      router.push(`/genius-profile/${user.username}`);
    } else {
      setShowModal(true);
    }
  };

  const toggleModal = () => setShowModal((prev) => !prev);

  return (
    <div className="flex justify-center items-center">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="w-[800px]">
          <h1 className="text-center text-2xl font-bold leading-10 text-white lg:text-6xl">
            One Genius ID for every
            <br />
            <p className="mt-4">Genius Tech</p>
          </h1>
          <p className="mt-10 text-center text-sm text-white lg:text-2xl">
            Keep all your Genius Services secured with 1 Genius ID <br />{" "}
            Developer Features Coming Soon
          </p>
          <div className="flex justify-center">
            <Button
              className="relative mt-8 rounded-full bg-black dark:bg-white px-6 py-2 text-sm font-medium text-white dark:text-black transition-transform duration-300 hover:scale-105 hover:bg-gray-200 "
              onClick={handleGetStarted}
              aria-label="get started button"
            >
              Get Started
              <div className="absolute right-0 top-0 size-3 animate-ping rounded-full bg-blue-300"></div>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-6 right-4 w-[350px] h-[170px] rounded flex flex-col justify-center">
          <div className="flex justify-center font-semibold text-md text-white">
            GENIUS PROFILES
          </div>
          <UserProfilesCarousel
            users={staticUsers}
            toggleModal={toggleModal}
            isUserLoggedIn={isUserLoggedIn}
          />
        </div>
      </div>
      <div className="absolute bottom-4 left-10 bg-gradient-to-b bg-white/70 to-gray-100/30 p-4 rounded-lg shadow-sm flex flex-col items-center max-w-xs w-full">
        <div className="text-xl  flex gap-2 font-semibold text-gray-800">
          <Avatar className="size-7 relative rounded-full border border-white/50 overflow-hidden">
            <AvatarImage src={profilePic} />
            <AvatarFallback>
              <UserRound className="size-6 text-black" />
            </AvatarFallback>
          </Avatar>
          {user?.first_name ? (
            <span>
              Hello {user?.first_name} {user?.last_name}
            </span>
          ) : (
            <span>Hello {user?.username}</span>
          )}
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={toggleModal}
        >
          <div
            className="bg-transprent backdrop-blur-md border-2 dark:border-white/20 border:white hover:border-yellow-600 transition-all duration-300 ease-in-out p-6 rounded-lg w-[90%] max-w-md shadow-lg text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {isLogin ? (
              <LoginForm isMobile={true} />
            ) : (
              <RegisterForm isMobile={true} />
            )}

            <div
              className="size-4 absolute top-3 right-3 cursor-pointer bg-red-600 rounded-full"
              onClick={toggleModal}
            ></div>

            <div className="mt-2 flex flex-col justify-center gap-2">
              <span className="w-full flex justify-center text-xs">
                {isLogin
                  ? "Not Yet a Genius User? Register Here"
                  : "Already a Genius User? Login Here"}
              </span>
              <Button
                variant="black"
                className="border hover:bg-black/60"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Go to Register" : "Go to Login"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
