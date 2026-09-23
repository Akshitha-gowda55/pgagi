"use client";

import type { ReactNode } from "react";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />

      <div className="min-h-screen lg:pl-[260px]">
        <Header />

        <main className="min-h-[calc(100vh-72px)] px-4 pb-10 pt-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1500px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}