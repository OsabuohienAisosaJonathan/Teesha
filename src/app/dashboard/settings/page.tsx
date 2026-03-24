"use client";

import { useAuth } from "@/store/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { User, Shield } from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences and profile.</p>
      </div>

      <div className="grid gap-8">
        <Card className="border-transparent shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><User className="w-5 h-5 text-primary"/> Profile Information</CardTitle>
            <CardDescription>Update your personal details and public profile.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6 pb-6 border-b border-border">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <Button variant="outline">Change Avatar</Button>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input defaultValue={user?.name} className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input defaultValue={user?.email} className="bg-muted/50" readOnly />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Bio</Label>
              <textarea 
                className="flex w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                placeholder="Tell us about yourself..."
                defaultValue={user?.bio || ''}
              />
            </div>

            <div className="flex justify-end">
               <Button className="shadow-md shadow-primary/20">Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-transparent shadow-md hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5 text-primary"/> Security</CardTitle>
            <CardDescription>Manage your password and security settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="space-y-4 max-w-md">
               <div className="space-y-2">
                 <Label>Current Password</Label>
                 <Input type="password" placeholder="••••••••" className="bg-muted/50" />
               </div>
               <div className="space-y-2">
                 <Label>New Password</Label>
                 <Input type="password" placeholder="••••••••" className="bg-muted/50" />
               </div>
               <Button className="mt-2 text-white">Update Password</Button>
             </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
