"use client";

import { useState } from "react";
import { Bell, Lock, User, ChevronDown } from "lucide-react";
import { Button } from "@/src/ui/button";
import { Input } from "@/src/ui/input";
import { Label } from "@/src/ui/label";
import { Switch } from "@/src/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/ui/select";

export function SettingsPageComponent() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64">
          <Tabs
            orientation="vertical"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="flex flex-col h-full space-y-2">
              <TabsTrigger value="account" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Account
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="w-full justify-start"
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="w-full justify-start">
                <Lock className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </aside>
        <main className="flex-1">
          <TabsContent value="account" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="language">Language</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">
                    Email Notifications
                  </Label>
                  <Switch id="email-notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <Switch id="push-notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <Switch id="sms-notifications" />
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="security" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Security Settings</h2>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <Switch id="two-factor" />
                </div>
              </div>
            </div>
          </TabsContent>
        </main>
      </div>
      <div className="mt-8">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
