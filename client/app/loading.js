import React from "react";
import Image from "next/image";

const loading = () => {
  return (
    <div className="flex justify-center w-full flex-wrap items-center h-screen">
      <Image
        width={300}
        height={300}
        className="animate-bounce"
        src="/images/svgs/mono_black.svg"
        alt="Logo"
      />
    </div>
  );
};

export default loading;
