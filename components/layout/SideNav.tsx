import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from "../ui/sidebar";
import { LayoutGrid, PiggyBankIcon, ReceiptText } from "lucide-react";
import FullLogo from "../../public/full_logo.svg";
import Image from "next/image";
import SideNavItem from "./SideNavItem";
import { INavItem } from "@/lib";

function SideNav() {
  const items: INavItem[] = [
    {
      id: "dashboard",
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutGrid />,
    },
    {
      id: "budgets",
      title: "Budgets",
      url: "/budgets",
      icon: <PiggyBankIcon />,
    },
    {
      id: "expenses",
      title: "Expenses",
      url: "/expenses",
      icon: <ReceiptText />,
    },
    // {
    //   id: "upgrade",
    //   title: "Upgrade",
    //   url: "/upgrade",
    //   icon: <ShieldCheck />,
    // },
  ];

  return (
    <>
      <Sidebar>
        <SidebarHeader className="p-4 gap-4 h-16 flex items-center justify-center bg-white">
          <Image src={FullLogo} alt="logo" width={150} height={100} />
        </SidebarHeader>
        <SidebarContent className="h-screen w-64 bg-white border-r border-gray-200 p-4 flex flex-col space-y-2">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="">
                {items.map((item) => (
                  <SideNavItem item={item} key={item.id} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}

export default SideNav;
