import React from "react";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { INavItem } from "@/lib";
import Link from "next/link";

type Props = { item: INavItem };

const SideNavItem = ({ item }: Props) => {
  return (
    <SidebarMenuItem key={item.id}>
      <SidebarMenuButton asChild>
        <Link
          href={item.url}
          className="flex items-center gap-3 p-3 h-[30px] mb-[10px] text-[16px]"
        >
          <div className="flex items-center justify-center w-8 h-8">
            {/* Force size using Tailwind */}
            <div className="w-8 h-8 [&>svg]:w-full [&>svg]:h-full">
              {<item.icon />}
            </div>
          </div>
          <span className="">{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default SideNavItem;
