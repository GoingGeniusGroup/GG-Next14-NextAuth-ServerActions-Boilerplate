"use client";

import { useState } from "react";
// import SignUpComponent from "@/components/SignUp/SignUpComponent";
// import { FcGoogle } from "react-icons/fc";
// import { FaApple } from "react-icons/fa";
// import SignInComponent from "@/components/SignUp/SignInComponent";
// import { useUser } from "@/UserClientProvider";
// import { LogosFacebook } from "@/logo/LogosFacebook";
import ProfileComponent from "./ProfileComponent";

export default function SideProfile() {
  // const { user } = useUser();
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  const toggleSignIn = () => {
    setShowSignIn(!showSignIn);
  };

  return (
    <div className="flex h-full flex-col">
      <ProfileComponent />

      {/* Show Signup and signin of user is not logged in */}
    </div>
  );
}

// {!user && (
//   <div className="flex size-full items-center justify-center rounded-lg bg-gray-200 text-black dark:bg-black dark:text-white">
//     {/* Display either signup or signin component based on state */}
//     {showSignUp ? (
//       <SignUpComponent
//         toggleSignIn={toggleSignIn}
//         toggleSignUp={toggleSignUp}
//       />
//     ) : (
//       <SignInComponent
//         toggleSignIn={toggleSignIn}
//         toggleSignUp={toggleSignUp}
//       />
//     )}
//   </div>
// )}
