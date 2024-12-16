import { getUserData } from "@/app/actions/auth/user-data";
import React from "react";

const page = () => {
  const userData = getUserData();

  return (
    <div className="flex size-full items-center justify-center text-white">
      <div>
        {userData ? (
          <>
            {userData.firstName} {userData.username}
          </>
        ) : (
          <div>No data Found</div>
        )}
      </div>
    </div>
  );
};

export default page;
