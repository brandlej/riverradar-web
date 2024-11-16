"use client";
import { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} closeSidebar={closeSidebar} />
    </>
  );
};
