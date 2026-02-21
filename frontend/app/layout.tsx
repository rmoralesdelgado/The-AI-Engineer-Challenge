import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mental Wellness Session",
  description: "A supportive mental wellness session powered by AI",
  icons: { icon: "/icon.svg" },
};

const themeScript = `(function(){var k='mental-coach-theme';var s=localStorage.getItem(k);var d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.setAttribute('data-theme',s||(d?'dark':'light'));})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        {children}
      </body>
    </html>
  );
}
