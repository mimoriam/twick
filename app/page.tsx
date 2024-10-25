import ThemeSwitch from "@/components/theme-switch";

import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex flex-col gap-y-4">
      <UserButton />
      <ThemeSwitch />
    </main>
  );
}
