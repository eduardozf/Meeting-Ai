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
      <main className="h-full">
        <Header currentTab={tab} />
        {children}
      </main>
      <div className="absolute inset-0 h-full w-full -z-50 bg-slate-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:18px_18px]"></div>
      <Toaster />
    </>
  );
}

export default Layout;
