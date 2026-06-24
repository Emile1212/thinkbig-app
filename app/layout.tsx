import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Think Big - Agence de publicité Meta & Google Ads | Plus de leads, plus de ventes",
  description:
    "Think Big crée, gère et optimise tes campagnes Meta Ads et Google Ads pour générer des leads qualifiés et des ventes. Stratégie, créatives, tracking et optimisation pour PME sérieuses. Réserve un appel stratégique.",
  keywords: [
    "agence publicité",
    "Meta Ads",
    "Google Ads",
    "génération de leads",
    "gestion de campagnes",
    "publicité Facebook",
    "marketing performance",
    "Québec",
  ],
  authors: [{ name: "Think Big Marketing Agency" }],
  metadataBase: new URL("https://wethinkbigmarketing.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://wethinkbigmarketing.com",
    title: "Think Big - Agence de publicité Meta & Google Ads",
    description:
      "On transforme ton budget pub en clients qui paient. Créatives, gestion de campagnes, tracking et optimisation continue.",
    locale: "fr_CA",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Think Big Marketing Agency",
  description:
    "Agence de publicité spécialisée en Meta Ads et Google Ads pour PME.",
  areaServed: "CA",
  serviceType: ["Meta Ads", "Google Ads", "Génération de leads", "Stratégie créative"],
  url: "https://wethinkbigmarketing.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr-CA">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
