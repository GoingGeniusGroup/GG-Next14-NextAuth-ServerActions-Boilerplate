"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

const ToastHandler = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const showLoginToast = searchParams.get("showLoginToast");

    if (showLoginToast === "true") {
      toast.error("Please login to access this page", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#f44336",
          color: "#fff",
          padding: "16px",
        },
      });
    }
  }, [searchParams]);

  return null;
};

export default ToastHandler;
