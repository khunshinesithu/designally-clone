import type { Metadata } from "next";
import { EB_Garamond, Poppins } from "next/font/google";
import "./globals.css";

/**
 * designally.co uses exactly two families:
 *   Poppins      — all UI text, nav, body copy, headings
 *   EB Garamond  — serif display ("OUR SERVICES", the hero headline)
 * The live site self-hosts them; next/font/google serves the same faces.
 */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
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
      className={`${poppins.variable} ${ebGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
