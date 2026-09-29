import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const code = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-code" });

export const metadata = {
  title: "Lorence | Software Developer",
  description: "Software developer in Calgary, AB. From the front counter to full-stack code.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${code.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}