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
import { useTranslations } from "next-intl";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { useIsMobile } from "./hooks/use-mobile";

export default function AppHeader() {
    const t = useTranslations();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, setUser } = useUser();
    const router = useRouter();

    async function handleSignOut() {
        setUser(null);
        await signOut();
        router.push("/");
    }
    const isMobile = useIsMobile();
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-gray-200">
            <div className="flex items-center gap-2 px-4 flex-1 justify-between">
                <div className="flex items-center gap-2">
                    {isMobile && <SidebarTrigger className="-ml-1" />}
                    {isMobile && <Separator orientation="vertical" className="mr-2 h-4" />}
                    <Link href="/" className="flex items-center">
                        <CircleIcon className="h-6 w-6 text-orange-500" />
                        <span className="ml-2 text-xl font-semibold text-gray-900">
                            {t("company.name")}
                        </span>
                    </Link>
                </div>
                
                <div className="flex items-center space-x-4 ml-auto">
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
