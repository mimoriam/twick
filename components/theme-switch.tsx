"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

import { useTheme } from "next-themes";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const actualTheme = localStorage.getItem("twick-theme");
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a loader or skeleton if component hasn't mounted:
    return <div>Loading... </div>;
  }

  if (resolvedTheme === "dark") {
    return <FiSun onClick={() => setTheme("light")} />;
  }

  if (resolvedTheme === "light") {
    return <FiMoon onClick={() => setTheme("dark")} />;
  }
};

export default ThemeSwitch;
