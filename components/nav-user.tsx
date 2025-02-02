"use client"

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Sparkles,
    Users,
    Settings,
    Activity,
    Shield,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { useUser } from "@/lib/auth"
import Link from "next/link"
import { signOut } from "@/app/[locale]/(login)/actions"
import { useTranslations } from "next-intl"

function getInitials(name: string | null | undefined, email: string | null | undefined): string {
    if (name) {
        return name.split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }
    return email ? email[0].toUpperCase() : 'U';
}

export function NavUser() {
    const { isMobile } = useSidebar()
    const { user } = useUser()
    const name = user?.firstName ? `${user.firstName} ${user.lastName}` : user?.name
    const t = useTranslations("nav.user")
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage
                                    src={user?.avatar || undefined}
                                    alt={user?.name || user?.email || ''}
                                />
                                <AvatarFallback className="rounded-lg">
                                    {getInitials(name, user?.email)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user?.name}</span>
                                <span className="truncate text-xs">{user?.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src={user?.avatar || undefined}
                                        alt={user?.name || user?.email || ''}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        {getInitials(name, user?.email)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user?.name}</span>
                                    <span className="truncate text-xs">{user?.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/billing" className="flex w-full items-center">
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    <span>{t("upgrade")}</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/billing" className="flex w-full items-center">
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    <span>{t("account")}</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/settings/team" className="flex w-full items-center">
                                    <Users className="mr-2 h-4 w-4" />
                                    <span>{t("team")}</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/settings/general" className="flex w-full items-center">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>General</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/settings/activity" className="flex w-full items-center">
                                    <Activity className="mr-2 h-4 w-4" />
                                    <span>Activity</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/settings/security" className="flex w-full items-center">
                                    <Shield className="mr-2 h-4 w-4" />
                                    <span>{t("security")}</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <form action={signOut}>
                            <button type="submit" className="w-full">
                                <DropdownMenuItem className="cursor-pointer">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>{t("signOut")}</span>
                                </DropdownMenuItem>
                            </button>
                        </form>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
