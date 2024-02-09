import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Background from "./ui/background/Background";
import Link from "./ui/link/Link";

const inter = Roboto({ subsets: ['latin'], weight: '300', style: 'normal' });

export const metadata: Metadata = {
  title: {
    template: '%s | Nicola D\'Oronzo',
    default: 'Nicola D\'Oronzo'
  },
  description: "A portfolio website presenting myself, my work and what I like",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Background />
        <div className="bg-transparent p-6 min-h-screen flex flex-col justify-end items-end">
          <header className="fixed top-0 left-0 p-6">
            <h1 className="text-3xl lg:text-5xl font-bold">Nicola D&apos;Oronzo</h1>
            <h2 className="text-lg font-semibold mb-6">Front-end developer</h2>

            <nav>
              <ul>
                <li><Link path="/">About</Link></li>
                <li><Link path="/projects">Projects</Link></li>
                <li><Link path="/experiences">Experiences</Link></li>
                <li><Link path="/bookshelf">On my bookshelf</Link></li>
                <li><Link path="/artworks">Artworks</Link></li>
              </ul>
            </nav>
          </header>

          <main className="w-2/5 lg:w-1/5 pt-[50vh]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
