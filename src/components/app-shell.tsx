'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from './ui/button';
import { Droplets, LayoutDashboard, CalendarDays, BookUser, Sparkles, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/supply', label: 'Suministro', icon: Droplets },
  { href: '/history', label: 'Historial', icon: CalendarDays },
  { href: '/agenda', label: 'Agenda', icon: BookUser },
  { href: '/ai-reminder', label: 'Recordatorio IA', icon: Sparkles },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');

  const getPageTitle = () => {
    if (pathname === '/') return 'Mi PrEP Hoy';
    if (pathname === '/supply') return 'Mi Suministro y Renovación';
    if (pathname === '/history') return 'Historial de Adherencia';
    if (pathname === '/agenda') return 'Agenda y Requisitos';
    if (pathname === '/ai-reminder') return 'Recordatorio Personalizado';
    if (pathname === '/settings') return 'Configuración';
    return 'Dashboard';
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0">
              <Droplets className="h-7 w-7 text-primary" />
            </Button>
            <h1 className="text-2xl font-semibold text-primary">Prep AI</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} className="w-full">
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label }}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarHeader className="mt-auto p-2">
            <div className="flex items-center gap-3 rounded-md p-2 hover:bg-sidebar-accent">
                 <Avatar className='h-10 w-10'>
                    <AvatarImage src={userAvatar?.imageUrl} data-ai-hint={userAvatar?.imageHint} />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex flex-col overflow-hidden">
                    <span className="truncate font-semibold text-sm">Usuario</span>
                    <span className="truncate text-xs text-muted-foreground">usuario@email.com</span>
                </div>
                <Link href="/settings" className='ml-auto'>
                  <Button variant="ghost" size="icon">
                      <Settings />
                  </Button>
                </Link>
            </div>
        </SidebarHeader>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:static md:h-auto md:border-none md:bg-transparent md:px-6 md:py-4">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
                <h1 className="text-xl font-semibold md:text-2xl">
                    {getPageTitle()}
                </h1>
            </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
