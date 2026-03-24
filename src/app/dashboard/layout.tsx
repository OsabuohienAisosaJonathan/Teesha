"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuth";
import { Sidebar } from "@/components/shared/Sidebar";
import { Header } from "@/components/shared/Header";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, checkAuth } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && mounted) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, mounted, router]);

  if (!mounted || isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full relative z-10 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-secondary/30 relative">
          <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10 pb-20">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
