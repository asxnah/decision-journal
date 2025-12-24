import type { Metadata } from "next";
import { ReduxProvider } from "./reduxProvider";
import "./globals.css";

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
      <body className="antialiased p-4 bg-white">
        <main className="px-5 py-6 border border-lightgray rounded-lg">
          <ReduxProvider>{children}</ReduxProvider>
        </main>
      </body>
    </html>
  );
}
