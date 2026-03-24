"use client";

import { useAuth } from "@/store/useAuth";
import { Bell } from "lucide-react";

export function Header() {
  const { user } = useAuth();

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center">
        {/* Mobile menu toggle could go here */}
        <h2 className="text-lg font-semibold text-foreground hidden sm:block">
          Welcome back, {user?.name?.split(' ')[0] || 'User'}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-muted-foreground hover:bg-accent rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 border-l border-border pl-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium leading-none text-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize mt-1">{user?.role}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold overflow-hidden">
            {user?.avatar_url ? (
              <img src={user.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span>{user?.name?.charAt(0) || 'U'}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
