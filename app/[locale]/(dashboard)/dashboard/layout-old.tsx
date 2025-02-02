"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleIcon, Home, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/lib/auth";
import { signOut } from "@/app/[locale]/(login)/actions";
import { useRouter } from "next/navigation";
import { useTranslations, useMessages, useLocale } from "next-intl";
import { Providers } from "@/components/providers";
import { Sidebar, SidebarHeader, SidebarContent } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";

import { usePathname } from "next/navigation";
import { Users, Settings, Shield, Activity, Menu } from "lucide-react";

const navItems = [
  { 
    title: "Metrics",
    url: "/dashboard",
    icon: Activity,
    isActive: true,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
    items: [
      { title: "Team", url: "/dashboard/settings/team", icon: Users },
      { title: "General", url: "/dashboard/settings/general", icon: Settings },
      { title: "Activity", url: "/dashboard/settings/activity", icon: Activity },
      { title: "Security", url: "/dashboard/settings/security", icon: Shield },
    ],
  },
];

function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar collapsible="icon" className="w-64 border-r border-gray-200">
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <CircleIcon className="h-6 w-6 text-orange-500" />
            <span className="font-semibold">Dashboard</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          {navItems.map((item) => (
            <div key={item.url}>
              {!item.items ? (
                <Link href={item.url}>
                  <Button
                    variant={pathname === item.url ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </Button>
                </Link>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transform ${isSettingsOpen ? 'rotate-180' : ''}`} />
                  </Button>
                  {isSettingsOpen && (
                    <div className="pl-4 flex flex-col gap-1">
                      {item.items.map((subItem) => (
                        <Link key={subItem.url} href={subItem.url}>
                          <Button
                            variant={pathname === subItem.url ? "secondary" : "ghost"}
                            className="w-full justify-start"
                            size="sm"
                          >
                            <subItem.icon className="mr-2 h-4 w-4" />
                            <span>{subItem.title}</span>
                          </Button>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </SidebarContent>
      </Sidebar>
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}

function Header() {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useUser();
  const router = useRouter();

  async function handleSignOut() {
    setUser(null);
    await signOut();
    router.push("/");
  }

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <CircleIcon className="h-6 w-6 text-orange-500" />
          <span className="ml-2 text-xl font-semibold text-gray-900">
            {t("company.name")}
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="/pricing"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Pricing
          </Link>
          {user ? (
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger>
                <Avatar className="cursor-pointer size-9">
                  <AvatarImage alt={user.name || ""} />
                  <AvatarFallback>
                    {user.email
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="flex flex-col gap-1">
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="/dashboard" className="flex w-full items-center">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <form action={handleSignOut} className="w-full">
                  <button type="submit" className="flex w-full">
                    <DropdownMenuItem className="w-full flex-1 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 rounded-full"
            >
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const messages = useMessages();
  const locale = useLocale();

  return (
          <Providers messages={messages} locale={locale}>
            <section className="flex flex-col min-h-screen">
              <Header />
              <DashboardLayout>{children}</DashboardLayout>
            </section>
          </Providers>
  )
}
