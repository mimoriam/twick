"use client";

import { ReactNode, useEffect } from "react";

import { useTheme } from "next-themes";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export function ClerkThemeProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    /*
     * If you have changed your storageKey in your <ThemeProvider storageKey="" />,
     * make sure you change it in the localStorage.getItem too.
     * default key is "theme"
     */
    const actualTheme = localStorage.getItem("twick-theme");
    setTheme(actualTheme || "system");
  }, [setTheme]);

  return (
    <ClerkProvider
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
      }}
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
    >
      {children}
    </ClerkProvider>
  );
}
