import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/app-shell';
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from '@/components/theme-provider';
import { SupplyProvider } from '@/components/providers/supply-provider';

export const metadata: Metadata = {
  title: 'Prep AI',
  description: 'Your AI companion for PrEP adherence.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SupplyProvider>
            <AppShell>
              {children}
            </AppShell>
          </SupplyProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
