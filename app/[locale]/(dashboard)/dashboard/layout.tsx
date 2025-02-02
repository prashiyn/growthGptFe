import { AppSidebar } from "@/components/app-sidebar"
import { Providers } from "@/components/providers"
import AppHeader from "@/components/app-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { useLocale } from "next-intl"
import { useMessages } from "next-intl"



export default function Layout(props: { children: React.ReactNode }) {
  const messages = useMessages();
  const locale = useLocale();

  return (
    <Providers messages={messages} locale={locale}>
      <SidebarProvider>
        <AppSidebar variant="sidebar" />
        <SidebarInset>
          <AppHeader />
          {props.children}
        </SidebarInset>
      </SidebarProvider>
    </Providers>

  )
}