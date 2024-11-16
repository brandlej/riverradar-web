import React from "react";
import Link from "next/link";
import { RiverRadarLogo } from "../../RiverRadarLogo";

const Navbar = ({
  toggle,
  closeSidebar,
}: {
  toggle: () => void;
  closeSidebar: () => void;
}) => {
  return (
    <div className="w-full h-20 bg-white sticky top-0 z-[9999] border-solid border-0 border-b border-black">
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          <Link className="font-semibold" href="/" onClick={closeSidebar}>
            <RiverRadarLogo width={100} height={100} />
          </Link>
          <button
            type="button"
            className="inline-flex items-center md:hidden"
            aria-label="Open menu"
            onClick={toggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
            >
              <path
                fill="#000"
                d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
              />
            </svg>
          </button>
          <ul className="hidden md:flex gap-x-6 text-dark">
            <li>
              <Link className="font-semibold" href="/blog">
                <p>Blog</p>
              </Link>
            </li>
            <li>
              <Link className="font-semibold" href="/about">
                <p>About</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
