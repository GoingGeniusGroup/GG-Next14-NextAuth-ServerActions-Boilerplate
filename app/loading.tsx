import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full border-t-4 border-blue-500 border-opacity-50 h-12 w-12"></div>
      </div>
    </div>
  );
};

export default Loading;
