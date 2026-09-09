import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { LanguageProvider } from "./components/LanguageProvider";
import StartupOverlay from "./components/StartupOverlay";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-sans",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "Alexi Grandperret — Propulsion & Systèmes Aérospatiaux",
  description:
    "Élève-ingénieur en dernière année à l'IPSA Toulouse, spécialisé en propulsion aérospatiale.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} font-body antialiased`}
      >
        <LanguageProvider>
          <SmoothScroll />
          <div id="startup-ssr-mask" aria-hidden="true">
            <div className="startup-ssr-mask__shutter startup-ssr-mask__shutter--top" />
            <div className="startup-ssr-mask__shutter startup-ssr-mask__shutter--bottom" />
          </div>
          <StartupOverlay />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}