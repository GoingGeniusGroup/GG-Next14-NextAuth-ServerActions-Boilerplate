"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/"); // Navigate back to the home page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 via-blue-700 to-purple-800 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <Image
          src="/logo.png"
          alt="Going Genius Logo"
          width={100}
          height={100}
          priority
        />
      </div>
      <div className="bg-opacity-70 bg-gray-800 p-8 sm:p-10 rounded-xl shadow-2xl max-w-md w-full space-y-8 text-white">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-gray-300">Log in to your account</p>
        </div>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-left text-sm font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              aria-label="Email"
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-left text-sm font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              aria-label="Password"
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-600 hover:to-purple-600 transition font-semibold shadow-lg"
            >
              Log In
            </button>
          </div>
        </form>
        <div className="mt-6 flex justify-between items-center">
          <a href="#" className="text-sm hover:underline">
            Forgot password?
          </a>
          <button
            onClick={handleBackClick}
            className="text-sm hover:underline"
            aria-label="Back to Home"
          >
            Back to Home
          </button>
        </div>
        <div className="mt-6 text-center text-sm">
          <p>Or log in with</p>
          <div className="mt-4 flex justify-center space-x-4">
            <button
              className="flex items-center bg-blue-600 hover:bg-blue-700 transition py-2 px-4 rounded-lg"
              aria-label="Log in with Facebook"
            >
              <Image
                src="/facebook.png"
                alt="Facebook"
                width={20}
                height={20}
                className="mr-2"
              />
              Facebook
            </button>
            <button
              className="flex items-center bg-red-600 hover:bg-red-700 transition py-2 px-4 rounded-lg"
              aria-label="Log in with Google"
            >
              <Image
                src="/google.png"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Google
            </button>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>
            Don&apos;t have an account?{" "}
            <a href="/new/adarshaSignup" className="text-purple-400 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
