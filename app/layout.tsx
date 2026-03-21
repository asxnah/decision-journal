import type { Metadata } from "next";
import { ReduxProvider } from "./reduxProvider";
import "./globals.css";
import { DevTools } from "@/widgets/devTools";

export const metadata: Metadata = {
  title: "Decision Journal",
  description:
    "Capture, reflect on and learn from your most important decisions over time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen antialiased p-4 bg-white">
        <main className="relative h-full px-5 py-6 border border-lightgray rounded-lg">
          <ReduxProvider>
            {children}
            <DevTools />
          </ReduxProvider>
        </main>
      </body>
    </html>
  );
}
