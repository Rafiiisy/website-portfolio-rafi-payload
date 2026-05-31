import { Inter } from "next/font/google";

import { SiteHeader } from "@/components/layouts/site-header";
import { getPayloadGlobal } from "@/utilities/get-payload-global";

import "../../../styles/tokens.css";
import "../../../styles/global.css";

import type { Metadata } from "next";
import type React from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
});

type LayoutProps = {
  children: React.ReactNode;
};

export default async function FrontendLayout({ children }: LayoutProps) {
  const header = await getPayloadGlobal({ slug: "header", depth: 0 });

  return (
    <html lang="en" className={inter.variable}>
      <body style={{ fontFamily: "var(--font-sans)" }}>
        <SiteHeader data={header as { name?: string; shortName?: string; nav?: Array<{ sectionId: string; label: string }> }} />
        <main>{children}</main>
      </body>
    </html>
  );
}
