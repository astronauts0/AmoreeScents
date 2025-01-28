import React from "react";
import Link from "next/link";
import ButtonTextIcon from "@/components/global/Buttons/ButtonTextIcon";
import { HomeOutlined } from "@mui/icons-material";
import Balloons from "@/components/balloons/Balloons";

export const metadata = {
  title: "Page Not Found | Amoree Scents",
  description:
    "Discover Amoree Scents, Pakistan's leading brand offering high-quality fragrances at unbeatable prices. Experience luxury scents that captivate your senses.",
};

const NotFound = () => {
  return (
    <section className="w-full h-screen relative overflow-hidden">
      <Balloons />
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-green-500 to-blue-500">
          Oh no<span className="text-blue-400">.</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">you look lost</p>
        <p className="mt-6">
          <Link
            href="/contact"
            className="text-blue-500 underline hover:text-blue-400"
          >
            Pop us a message
          </Link>{" "}
          and we'll fix that link.
        </p>
        <div className="my-5 text-3xl dancing_script">
          Or you can play a game to pop the balloons
        </div>

        <p className="mt-8 flex justify-center">
          <Link href="/" rel="noopener noreferrer">
            <ButtonTextIcon
              Text="Go to Home"
              Icon={<HomeOutlined />}
              customize="px-4 py-2 rounded-full"
            />
          </Link>
        </p>
      </div>
    </section>
  );
};

export default NotFound;
