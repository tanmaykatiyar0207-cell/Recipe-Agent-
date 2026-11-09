import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Recipe Agent | AI-Powered Recipe Assistant",
  description:
    "Discover delicious recipes with AI. Ask anything about cooking and get personalized recipe suggestions powered by Google Gemini.",
  keywords: ["recipe", "AI", "cooking", "food", "gemini", "recipe agent"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
