import { Toggle, ToggleSkeleton } from "@/app/(browse)/_components/sidebar/toggle";
import { Wrapper } from "@/app/(browse)/_components/sidebar/wrapper";

export const Sidebar = () => {
  return (
    <Wrapper>
      <Toggle />
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 z-50 flex h-full w-[70px] flex-col border-r border-[#2D2E35] bg-background lg:w-60">
      <ToggleSkeleton />
    </aside>
  );
};
