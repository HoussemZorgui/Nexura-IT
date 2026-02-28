import { getDb } from '@/lib/db';
import UnicornWrapper from '@/components/UnicornWrapper';

export default function Home() {
  const { settings, blogs, hero, services, metrics, process, reach } = getDb();

  return (
    <>
      <main className="relative">

        {/* Unicorn Studio Fixed Global Background */}
        <div className="fixed inset-0 w-full h-full -z-10 bg-black">
          <UnicornWrapper />
        </div>

        {/* Full Screen Hero Section */}
        <section
          className="relative flex items-center justify-center min-h-screen pt-24 pb-16 overflow-hidden"
        >

          <div className="container px-4 text-center flex flex-col items-center justify-center relative z-10 w-full">

            <div className="relative pointer-events-auto transform animate-fade-in group w-full max-w-5xl mx-auto mt-10 md:mt-20 flex flex-col items-center">

              {/* Ultra-sleek Pill */}
              <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-gray-200 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-10 shadow-[0_0_30px_rgba(0,210,255,0.15)] hover:border-cyan-400/50 transition-colors cursor-default">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500 shadow-[0_0_10px_#00d2ff]"></span>
                </span>
                {hero.pillText}
              </div>

              {/* Massive Typography floating on the beam */}
              <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-black mb-8 tracking-tighter leading-none text-white drop-shadow-2xl">
                {hero.titlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-blue-500 to-indigo-600">{hero.titleHighlight}</span>
              </h1>

              {/* Refined Description */}
              <p className="text-xl md:text-2xl text-gray-300/90 max-w-3xl mx-auto mb-14 font-light tracking-wide leading-relaxed drop-shadow-lg mix-blend-screen">
                {hero.description}
              </p>

              {/* Minimalist Premium Buttons */}
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                <a href="#services" className="relative group/btn px-10 py-5 overflow-hidden rounded-full bg-white text-black font-bold text-sm uppercase tracking-[0.2em] transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                  <span className="relative z-10 transition-colors group-hover/btn:text-white">Notre Expertise</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 scale-[3] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
                </a>

                <a href="#contact" className="group px-10 py-5 rounded-full border border-white/20 text-white font-semibold text-sm tracking-[0.2em] uppercase hover:border-cyan-400 hover:text-cyan-400 backdrop-blur-sm transition-all duration-300">
                  Nous Contacter <span className="inline-block transition-transform group-hover:translate-x-2 ml-2">→</span>
                </a>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-16 animate-bounce flex flex-col items-center opacity-70">
              <span className="text-xs text-gray-400 mb-2 uppercase tracking-widest">Scroll</span>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                <div className="w-1.5 h-3 bg-cyan-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="container" style={{ padding: '8rem 5%' }}>
          <div className="animate-fade-in delay-1">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent text-center mb-16">Nos Services Informatiques</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

              {services.map(s => (
                <div key={s.id} className="glass-panel hover:-translate-y-2 transition-transform duration-300">
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }} className="text-cyan-400">{s.icon}</div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{s.title}</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    {s.description}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* Why Choose Us / Key Metrics */}
        <section className="container" style={{ padding: '6rem 5%' }}>
          <div className="animate-fade-in delay-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, i) => (
                <div key={i} className={`relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-all duration-500 hover:border-cyan-500/30 ${metric.glow}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none"></div>
                  <h4 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-2">
                    {metric.title}
                  </h4>
                  <p className="text-gray-400 text-sm tracking-widest uppercase mt-4 font-medium">
                    {metric.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack / Technologies */}
        <section className="relative overflow-hidden" style={{ padding: '8rem 0' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 via-transparent to-blue-900/10 border-y border-white/5"></div>
          <div className="container relative z-10 px-4 text-center">
            <p className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-4">Notre Arsenal Technologique</p>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-16">
              Propulsé par les <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">meilleures architectures</span> au monde.
            </h2>
            <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
              {['React', 'Next.js 15', 'Node.js', 'Python', 'Go', 'AWS Architecture', 'Microsoft Azure', 'Docker', 'Kubernetes', 'Cyber Defense OS', 'TypeScript', 'GraphQL'].map((tech, i) => (
                <div key={i} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 backdrop-blur-md hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:text-white transition-all duration-300 hover:scale-105 shadow-xl font-medium tracking-wide">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Process / Méthodologie */}
        <section className="container relative" style={{ padding: '8rem 5%' }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-600/5 blur-[120px] rounded-[100%] pointer-events-none"></div>

          <div className="relative z-10 text-center mb-20 animate-fade-in delay-1">
            <p className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-4">Méthodologie d'Excellence</p>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              Comment nous <span className="text-white">transformons</span> votre vision.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {process.map(step => (
              <div key={step.id} className={`group bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500 ${step.hoverBorder}`}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-2xl font-black text-white shadow-lg ${step.shadow} mb-8 group-hover:scale-110 transition-transform`}>{step.step}</div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{step.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Global Reach / Map */}
        <section className="relative overflow-hidden border-y border-white/5 bg-black/20 backdrop-blur-sm" style={{ padding: '8rem 0' }}>
          <div className="container relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 px-4">

            <div className="w-full lg:w-1/2">
              <p className="text-indigo-400 text-sm font-bold tracking-widest uppercase mb-4">{reach.pill}</p>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-8 leading-tight">
                {reach.title} <br />
                <span className="font-bold">{reach.subtitle}</span>
              </h2>
              <p className="text-xl text-gray-400 font-light mb-10 leading-relaxed">
                {reach.description}
              </p>
              <div className="flex gap-12">
                {reach.stats.map((s, i) => (
                  <div key={i}>
                    <span className="block text-4xl font-bold text-white mb-2">{s.value}</span>
                    <span className="text-gray-500 uppercase tracking-widest text-xs font-semibold">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative h-[400px]">
              {/* Abstract representation of a glowing network globe/dots */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[80%] h-[80%] border border-cyan-500/20 rounded-full animate-[spin_60s_linear_infinite] relative">
                  <div className="absolute top-0 left-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_#00d2ff] -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-1/4 left-0 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_blue] -translate-x-1/2 translate-y-1/2"></div>
                  <div className="absolute bottom-1/4 right-0 w-5 h-5 bg-indigo-500 rounded-full shadow-[0_0_20px_#4f46e5] translate-x-1/2 translate-y-1/2"></div>
                </div>
                <div className="absolute w-[60%] h-[60%] border border-blue-500/20 rounded-full animate-[spin_40s_linear_infinite_reverse] relative">
                  <div className="absolute top-1/4 right-0 w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_15px_purple] translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-cyan-300 rounded-full shadow-[0_0_15px_cyan] -translate-x-1/2 translate-y-1/2"></div>
                </div>
                {/* Pulsing Core */}
                <div className="absolute w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full animate-pulse shadow-[0_0_50px_rgba(0,210,255,0.6)]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Blogs / Actualités */}
        <section id="blogs" className="container" style={{ padding: '8rem 5%' }}>
          <div className="animate-fade-in delay-2">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">Actualités & Blog</h2>
              <a href="#" className="hidden sm:block text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider text-sm font-semibold">Voir tout →</a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
              {blogs.length > 0 ? blogs.map(blog => (
                <article key={blog.id} className="glass-panel flex flex-col md:flex-row gap-8 hover:bg-white/10 transition-colors border-l-4 border-l-cyan-500">
                  <div className="md:w-1/4">
                    <p className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-2">{new Date(blog.date).toLocaleDateString('fr-FR')}</p>
                    <div className="h-1 w-12 bg-gray-800 rounded"></div>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-2xl font-bold mb-3">{blog.title}</h3>
                    <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                      {blog.excerpt || blog.content.substring(0, 150) + '...'}
                    </p>
                    <button className="text-white hover:text-cyan-400 transition-colors border-b border-white/30 hover:border-cyan-400 pb-1 inline-flex items-center gap-2">
                      Lire l'article <span className="text-xl">↗</span>
                    </button>
                  </div>
                </article>
              )) : (
                <div className="glass-panel text-center py-16">
                  <p className="text-gray-500 text-xl font-light">Aucun article n'a encore été publié.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Premium Transparent Footer */}
        <footer id="contact" className="relative border-t border-white/10 mt-20">

          <div className="container relative z-10 pt-24 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

              {/* Brand Col */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-8">
                  <img
                    src="/logo.png"
                    alt="Nexura IT Logo"
                    width="60"
                    className="hover:scale-105 transition-transform"
                    style={{ mixBlendMode: "screen", filter: "contrast(4) brightness(0.9) drop-shadow(0px 0px 8px rgba(0, 210, 255, 0.5))" }}
                  />
                  <span className="text-3xl font-light tracking-wide text-white" style={{ fontFamily: "Inter, sans-serif" }}>
                    Nexura <span className="font-bold text-cyan-400">IT</span>
                  </span>
                </div>
                <p className="text-gray-300/80 text-lg leading-relaxed md:max-w-md mb-8 font-light">
                  Votre partenaire technologique d'excellence. Nous construisons des infrastructures digitales robustes, scalables et esthétiquement parfaites.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all text-white backdrop-blur-sm">
                    in
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all text-white backdrop-blur-sm">
                    gh
                  </a>
                </div>
              </div>

              {/* Contact Col */}
              <div>
                <h4 className="text-white font-semibold text-lg mb-6 uppercase tracking-wider">Contact</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">📍</span>
                    <span className="text-gray-400">{settings.address}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-cyan-400">📞</span>
                    <span className="text-gray-400">{settings.telephone}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-cyan-400">✉️</span>
                    <a href={`mailto:${settings.email}`} className="text-gray-400 hover:text-cyan-400 transition-colors">{settings.email}</a>
                  </li>
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-white font-semibold text-lg mb-6 uppercase tracking-wider">Navigation</h4>
                <ul className="space-y-3">
                  <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Accueil</a></li>
                  <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Notre Expertise</a></li>
                  <li><a href="#blogs" className="text-gray-400 hover:text-white transition-colors">Blog & Insights</a></li>
                  <li><a href="/admin" className="text-gray-400 hover:text-white transition-colors">Portail Client (Admin)</a></li>
                </ul>
              </div>

            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Nexura IT. All rights reserved. Building the future.
              </p>
              <div className="flex gap-6 text-sm text-gray-500">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>

          </div>
        </footer>
      </main>
    </>
  );
}
