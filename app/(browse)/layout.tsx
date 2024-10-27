import type { ReactNode } from "react";

import { Navbar } from "@/app/(browse)/_components/navbar";

export default function BrowseLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">{children}</div>
    </>
  );
}
