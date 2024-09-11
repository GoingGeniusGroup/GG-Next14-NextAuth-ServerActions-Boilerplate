"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/'); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 via-blue-700 to-purple-800">
      <div className="text-center mb-8">
        <Image src='/logo.png' alt='logo' width={100} height={100} />
      </div>
      <div className="bg-opacity-70 bg-gray-800 p-10 rounded-xl shadow-2xl max-w-lg w-full space-y-8 text-white">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Create Your Account</h2>
          <p className="text-gray-300">Sign up to get started</p>
        </div>
        <form className="space-y-6">
          <div>
            <label htmlFor="first_name" className="block text-left text-sm font-semibold">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              placeholder="Enter your first name"
              required
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
          <div>
            <label htmlFor="last_name" className="block text-left text-sm font-semibold">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              placeholder="Enter your last name"
              required
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-left text-sm font-semibold">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-left text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-900 focus:ring-2 focus:ring-purple-500 transition"
                required
              />
            </div>
            <label htmlFor="terms" className="ml-2 text-sm font-semibold text-gray-300">
              I agree to the terms and conditions
            </label>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-600 hover:to-purple-600 transition font-semibold shadow-lg"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-6 flex justify-between items-center">
          <button onClick={handleBackClick} className="text-sm hover:underline">Back to Home</button>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>Already have an account? <a href="/new/adarsha" className="text-purple-400 hover:underline">Log in here</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
