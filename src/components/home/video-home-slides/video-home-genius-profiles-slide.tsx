"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/src/ui/button/button";
import { LoginForm } from "@/src/components/form/login-form";
import { RegisterForm } from "@/src/components/form/register-form";
import { GeniusProfileCarousel } from "../../comp/GeniusUserProfile/ProfileCard/genius-profile-carousel";

export default function VideoHomeGeniusProfilesSlide({
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
      <div className="absolute inset-0 flex items-center justify-center">
        <GeniusProfileCarousel
          users={staticUsers}
          toggleModal={toggleModal}
          isUserLoggedIn={isUserLoggedIn}
        />
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
