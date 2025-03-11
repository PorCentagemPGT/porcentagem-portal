"use client";
import React from "react";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import { useTheme } from "./ThemeProvider";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="p-3 rounded-full bg-[var(--primary)] text-[var(--dark)] dark:bg-[var(--primary)] dark:text-[var(--dark)] hover:opacity-90 transition-opacity w-10 h-10 flex items-center justify-center border-none cursor-pointer"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "light" ? (
        <RiMoonLine className="w-10 h-10" />
      ) : (
        <RiSunLine className="w-10 h-10" />
      )}
    </button>
  );
};

export default ThemeButton;