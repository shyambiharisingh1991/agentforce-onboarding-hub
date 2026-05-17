import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agentforce Onboarding Hub",
  description: "Open-source onboarding, readiness, adoption, and ROI acceleration platform for Salesforce Agentforce."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
