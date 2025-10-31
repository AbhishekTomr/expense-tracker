import SideNav from "@/components/layout/SideNav";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};
const LogedInAppLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <div>
        <SidebarProvider>
          <SideNav />
        </SidebarProvider>
      </div>
      <div className="border-2 w-full">{children}</div>
    </div>
  );
};

export default LogedInAppLayout;
