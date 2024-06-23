import Header from "@/components/header/index";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
  tab: string;
};

export function Layout({ children, tab }: LayoutProps) {
  return (
    <>
      <main className="h-full">{children}</main>
      <Toaster />
    </>
  );
}

export default Layout;
