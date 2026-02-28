import "./globals.css";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        <title>Nexura IT - Innovating the Future</title>
        <meta name="description" content="Nexura IT provides scalable, high-tech IT solutions." />
      </head>
      <body className="antialiased overflow-x-hidden">
        <Script
          src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
