import "./globals.css";
import Script from "next/script";
import Image from "next/image";

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
        {/* Transparent Header overlaying the Hero layer */}
        <nav className="absolute w-full top-0 left-0 z-50 py-6">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Nexura IT Logo"
                width={180}
                height={180}
                className="hover:scale-105 transition-transform drop-shadow-[0_0_15px_rgba(0,210,255,0.4)]"
                priority
              />
            </div>

            <div className="flex gap-8 items-center">
              <a href="/" className="text-sm font-medium text-gray-200 hover:text-cyan-400 transition-colors" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>Accueil</a>
              <a href="#services" className="text-sm font-medium text-gray-200 hover:text-cyan-400 transition-colors" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>Services</a>
              <a href="#blogs" className="text-sm font-medium text-gray-200 hover:text-cyan-400 transition-colors" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>Blog</a>
              <a href="/admin" className="px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 hover:border-white/30 transition-all backdrop-blur-sm shadow-lg">Admin Hub</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
