import React from "react";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { INavItem } from "@/lib";
import Link from "next/link";

type Props = { item: INavItem };

const SideNavItem = ({ item }: Props) => {
  return (
    <SidebarMenuItem key={item.id}>
      <SidebarMenuButton
        asChild
        className="hover:text-primary hover:bg-blue-100"
      >
        <Link
          href={item.url}
          className="flex items-center gap-2 h-[30px] mb-[10px] text-[16px] text-gray-500 p-5 font-medium cursor-pointer rounded-md"
        >
          <div className="flex items-center justify-center w-8 h-8">
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
