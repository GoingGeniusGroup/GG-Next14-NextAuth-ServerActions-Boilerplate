"use client";

import { useEffect } from "react";
import Navbar from "@/components/adarsha/Navbar";
import ThreeScene from "@/components/adarsha/ThreeScene";
import SupplierModal from "@/components/adarsha/SupplierForm";
import Link from "next/link";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className="relative overflow-hidden h-screen bg-gradient-to-r from-blue-500 to-blue-800">
      <ThreeScene /> {/* Enhanced Three.js scene as a background */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10">
        <h1
          className="text-6xl font-extrabold mb-4 animate-bounce text-black"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Welcome to Going Genius
        </h1>
        <p className="text-lg mb-8">
          Transforming your vision into reality with cutting-edge solutions.
        </p>
        <Link href="#about">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-colors">
            Learn More
          </button>
        </Link>
      </div>
    </div>
  );
};

const AboutUs = () => {
  return (
    <section
      id="about"
      className="relative py-20 px-4 bg-gray-100 text-center text-gray-800"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-600 mb-6">About Us</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          We are a creative agency focused on providing cutting-edge solutions
          that drive innovation and growth. Our team is committed to excellence
          in every aspect of our work.
        </p>
        <ul className="space-y-4 text-lg">
          <li>Advanced Solutions</li>
          <li>Innovative Approaches</li>
          <li>Customer-Focused</li>
        </ul>
      </div>
    </section>
  );
};

const ContactUs = () => {
  return (
    <section
      id="contact"
      className="relative py-20 px-4 bg-gradient-to-r from-purple-300 to-purple-500 text-center text-white"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          Get in touch with us today and let&apos;s start something amazing together.
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="https://www.facebook.com/goinggenius"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/facebook.png"
              alt="Facebook"
              width={40}
              height={40}
              className="hover:scale-110 transition-transform"
            />
          </a>
          <a
            href="https://www.instagram.com/goinggenius"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/instagram.png"
              alt="Instagram"
              width={40}
              height={40}
              className="hover:scale-110 transition-transform"
            />
          </a>
          <a
            href="https://www.linkedin.com/company/going-genius-group-of-companies/mycompany/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/linkedin.png"
              alt="LinkedIn"
              width={40}
              height={40}
              className="hover:scale-110 transition-transform"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

const Page = () => {
  useEffect(() => {
    const handleScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A") {
        e.preventDefault();
        const href = target.getAttribute("href");
        if (href && href.startsWith("#")) {
          const section = document.querySelector(href);
          if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }
    };

    document.addEventListener("click", handleScroll);

    return () => {
      document.removeEventListener("click", handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-[130px]">
        <HomePage />
        <AboutUs />
        <ContactUs />
        <SupplierModal />
      </div>
    </>
  );
};

export default Page;
