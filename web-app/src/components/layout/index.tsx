import Header from "@/components/header/index";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
  tab: string;
};

export function Layout({ children, tab }: LayoutProps) {
  return (
    <>
      <Header currentTab={tab} />
      <main>{children}</main>
      <Toaster />
    </>
  );
}

export default Layout;
