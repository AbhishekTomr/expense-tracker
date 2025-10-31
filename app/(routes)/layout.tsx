import SideNav from "@/components/layout/SideNav";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { Toaster } from "sonner";

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
      <div className="w-full p-10">
        {children} <Toaster richColors position="bottom-left" />
      </div>
    </div>
  );
};

export default LogedInAppLayout;
