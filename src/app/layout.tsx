import type { Metadata } from "next";
import { Caveat, EB_Garamond, IBM_Plex_Sans_Thai, Poppins } from "next/font/google";
import "./globals.css";

/**
 * designally.co uses three families:
 *   Poppins      — all UI text, nav, body copy, headings
 *   EB Garamond  — serif display ("OUR SERVICES", the hero headline)
 *   Caveat       — handwriting accent, e.g. "Don't be shy, say hello!" on /contact-us/
 *   IBM Plex Sans Thai — the two legal pages only; their copy is Thai and the
 *                        live site sets a different family for them
 * The live site self-hosts them; next/font/google serves the same faces.
 */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  variable: "--font-thai-face",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DESIGNALLY | Your Creative Design Ally",
  description:
    "Reach your business goals with design partner, branding, website & graphic design services. Contact us at clients@designally.co",
  metadataBase: new URL("https://designally.co"),
  alternates: { canonical: "https://designally.co/" },
  icons: {
    icon: [
      {
        url: "/sites/designally-co-e422ade5/shared/seo/cropped-Designally-Site-Icon-01-32x32.png",
        sizes: "32x32",
      },
      {
        url: "/sites/designally-co-e422ade5/shared/seo/cropped-Designally-Site-Icon-01-192x192.png",
        sizes: "192x192",
      },
    ],
    apple:
      "/sites/designally-co-e422ade5/shared/seo/cropped-Designally-Site-Icon-01-180x180.png",
  },
  openGraph: {
    type: "website",
    siteName: "DESIGNALLY",
    title: "DESIGNALLY | Your Creative Design Ally",
    description:
      "Reach your business goals with design partner, branding, website & graphic design services. Contact us at clients@designally.co",
    url: "https://designally.co/",
    images: [
      {
        url: "/sites/designally-co-e422ade5/shared/seo/Designally-Logotype.webp",
        width: 1110,
        height: 1109,
        type: "image/webp",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${ebGaramond.variable} ${caveat.variable} ${ibmPlexSansThai.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
