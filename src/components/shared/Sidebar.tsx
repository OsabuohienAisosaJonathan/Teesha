"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  BookOpen, 
  LayoutDashboard, 
  GraduationCap, 
  Calendar, 
  MessageSquare,
  Settings,
  LogOut
} from "lucide-react";
import { useAuth } from "@/store/useAuth";

const routes = [
  { text: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { text: "Classes", href: "/dashboard/classes", icon: GraduationCap },
  { text: "Schedule", href: "/dashboard/schedule", icon: Calendar },
  { text: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { text: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="flex flex-col h-full w-64 bg-card border-r border-border px-4 py-8">
      <Link href="/dashboard" className="flex items-center gap-3 px-2 mb-10">
        <div className="bg-primary/10 p-2 rounded-xl text-primary">
          <BookOpen className="w-6 h-6" />
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground">TEESHA</span>
      </Link>

      <nav className="flex-1 space-y-1">
        {routes.map((route) => {
          const active = pathname === route.href || pathname.startsWith(`${route.href}/`);
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active 
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <route.icon className={cn("w-5 h-5", active ? "text-primary-foreground" : "text-muted-foreground")} />
              {route.text}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-8 border-t border-border">
        <button
          onClick={() => logout()}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
