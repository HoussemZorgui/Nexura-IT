import { getDb } from '@/lib/db';
import UnicornWrapper from '@/components/UnicornWrapper';
import Image from 'next/image';
import { BrandLogo } from '@/components/BrandLogo';
import ScrollTopButton from '@/components/ScrollTopButton';

export default function Home() {
  const { settings, blogs, hero, services, metrics, techStack, clients, testimonials, cta, process, reach } = getDb();

  return (
    <>
      <main className="relative">

        {/* ── NAVBAR ─────────────────────────────────── */}
        <nav className="absolute w-full top-0 left-0 z-50 py-6">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <Image src="/logo.png" alt="Nexura IT" width={110} height={110}
              className="hover:scale-105 transition-transform drop-shadow-[0_0_15px_rgba(0,210,255,0.4)]" priority />
            <div className="flex gap-8 items-center">
              {[['/', 'Accueil'], ['#services', 'Services'], ['#process', 'Méthode'], ['#blogs', 'Blog']].map(([href, label]) => (
                <a key={href} href={href}
                  className="text-sm font-medium text-gray-200 hover:text-cyan-400 transition-colors"
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{label}</a>
              ))}
              <a href="#contact"
                className="px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold hover:bg-cyan-500 hover:border-cyan-500 transition-all backdrop-blur-sm">
                Contact
              </a>
            </div>
          </div>
        </nav>

        {/* ── BACKGROUND ─────────────────────────────── */}
        <div className="fixed inset-0 w-full h-full -z-10 bg-black">
          <UnicornWrapper />
        </div>

        {/* ═══════════════════════════════════════════
            1. HERO SECTION
        ═══════════════════════════════════════════ */}
        <section className="relative flex items-center justify-center min-h-screen pt-24 pb-16">
          <div className="container px-4 text-center flex flex-col items-center relative z-10 w-full">
            <div className="w-full max-w-5xl mx-auto mt-10 md:mt-16 flex flex-col items-center">

              {/* Pill */}
              <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-gray-200 text-xs font-semibold tracking-[0.3em] uppercase mb-10 shadow-[0_0_30px_rgba(0,210,255,0.1)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500 shadow-[0_0_10px_#00d2ff]" />
                </span>
                {hero.pillText}
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-black mb-12 tracking-tighter leading-[1.1] text-white drop-shadow-2xl">
                {hero.titlePrefix}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-blue-500 to-indigo-600">
                  {hero.titleHighlight}
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-16 font-semibold leading-loose tracking-tight">
                {hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a href="#services"
                  className="relative group/btn px-10 py-5 overflow-hidden rounded-full bg-cyan-400 text-[#050508] font-black text-sm uppercase tracking-[0.2em] transition-all hover:scale-105 shadow-[0_0_40px_rgba(34,211,238,0.3)]">
                  <span className="relative z-10 transition-colors group-hover/btn:text-white">Notre Expertise</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 scale-[3] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 z-0" />
                </a>
                <a href="#contact"
                  className="group px-10 py-5 rounded-full border border-white/20 text-white font-semibold text-sm tracking-[0.2em] uppercase hover:border-cyan-400 hover:text-cyan-400 backdrop-blur-sm transition-all">
                  Nous Contacter <span className="inline-block transition-transform group-hover:translate-x-2 ml-2">→</span>
                </a>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="mt-20 animate-bounce flex flex-col items-center opacity-60">
              <span className="text-xs text-gray-400 mb-2 uppercase tracking-widest">Scroll</span>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                <div className="w-1.5 h-3 bg-cyan-400 rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════
            1b. CLIENTS TRUST STRIP
        ═════════════════════════════════════════════ */}
        {clients && clients.length > 0 && (
          <section className="relative border-y border-white/[0.06]" style={{ padding: '6rem 0', overflow: 'hidden' }}>
            <div className="container mx-auto px-6">
              <p className="text-center text-sm font-black text-gray-500 uppercase tracking-[0.4em] mb-16">
                Ils nous font confiance
              </p>
              <div className="marquee-container relative">
                <div className="animate-marquee flex items-center gap-24 pr-24">
                  {/* First Set of Clients */}
                  {clients.map((c: any) => (
                    <div key={`client-1-${c.id}`}
                      className="flex flex-col items-center gap-4 group opacity-40 hover:opacity-100 transition-all duration-700 hover:scale-110 min-w-[180px]">
                      <BrandLogo
                        logoType={c.logoType}
                        name={c.name}
                        className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]"
                      />
                      <span className="text-[11px] text-gray-700 uppercase tracking-[0.2em] font-black group-hover:text-cyan-400 group-hover:tracking-[0.3em] transition-all duration-500">
                        {c.industry}
                      </span>
                    </div>
                  ))}
                  {/* Duplicate Set for Seamless Loop */}
                  {clients.map((c: any) => (
                    <div key={`client-2-${c.id}`}
                      className="flex flex-col items-center gap-4 group opacity-40 hover:opacity-100 transition-all duration-700 hover:scale-110 min-w-[180px]">
                      <BrandLogo
                        logoType={c.logoType}
                        name={c.name}
                        className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]"
                      />
                      <span className="text-[11px] text-gray-700 uppercase tracking-[0.2em] font-black group-hover:text-cyan-400 group-hover:tracking-[0.3em] transition-all duration-500">
                        {c.industry}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════
            2. KEY METRICS
        ═══════════════════════════════════════════ */}
        {metrics.length > 0 && (
          <section style={{ padding: '5rem 5%' }}>
            <div className="container mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((m, i) => (
                  <div key={m.id}
                    className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-all duration-500 hover:border-cyan-500/30"
                    style={{ boxShadow: i === 0 ? '0 0 40px rgba(0,210,255,0.1)' : i === 3 ? '0 0 40px rgba(99,102,241,0.1)' : 'none' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl pointer-events-none" />
                    <h4 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-3">
                      {m.value}
                    </h4>
                    <p className="text-gray-400 text-xs tracking-widest uppercase font-semibold">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═════════════════════════════════════════════
            3. SERVICES / EXPERTISE — REDESIGN
        ═════════════════════════════════════════════ */}
        <section id="services" className="relative overflow-hidden" style={{ padding: '10rem 5%' }}>
          {/* Subtle Dynamic Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(0,186,255,0.03)_0%,transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(59,130,246,0.03)_0%,transparent_50%)] pointer-events-none" />

          <div className="container mx-auto">
            <div className="text-center mb-24 relative flex flex-col items-center">
              <p className="text-cyan-400 text-sm md:text-base font-black tracking-[0.4em] uppercase mb-6 bg-cyan-400/5 px-6 py-2 rounded-full border border-cyan-400/20 inline-block shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                Ce que nous faisons
              </p>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-12 leading-[1.2] flex flex-col items-center justify-center">
                <span>Dominez votre</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 block mt-4">écosystème numérique.</span>
              </h2>
              <p className="text-gray-200 text-xl max-w-3xl font-bold tracking-tight leading-loose text-center mb-16">
                Expertise technique de pointe pour les entreprises qui refusent le compromis. <br className="hidden md:block" />
                Performance, Sécurité et Innovation au cœur de chaque ligne de code.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {services.map((s, i) => (
                <div key={s.id}
                  className="group relative bg-[#0b0c14]/40 backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] p-12 text-center flex flex-col items-center hover:-translate-y-4 hover:border-cyan-500/50 transition-all duration-700 shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden active:scale-95">

                  {/* Elegant Top Glow Accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Icon Container with Floating Glass Effect */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 flex items-center justify-center text-4xl mb-8 group-hover:scale-110 group-hover:-translate-y-2 group-hover:border-cyan-400/30 transition-all duration-500 shadow-xl group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                    <span className="filter drop-shadow-[0_5px_10px_rgba(0,0,0,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-500">{s.icon}</span>
                  </div>

                  {/* Text Content */}
                  <h3 className="text-3xl font-black text-white mb-8 tracking-tight group-hover:text-cyan-400 transition-colors duration-500">
                    {s.title}
                  </h3>
                  <p className="text-gray-300 text-lg font-bold leading-[1.8] opacity-80 group-hover:opacity-100 transition-opacity duration-500 mb-12">
                    {s.description}
                  </p>

                  {/* Pill-shaped Interactive Button */}
                  <div className="mt-auto inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/5 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all duration-500">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-cyan-400 transition-colors">
                      Déployer
                    </span>
                    <span className="text-cyan-400 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                      →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            4. TECH STACK
        ═══════════════════════════════════════════ */}
        {techStack.length > 0 && (
          <section className="relative overflow-hidden border-y border-white/5" style={{ padding: '7rem 0' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 via-transparent to-blue-900/10" />
            <div className="container mx-auto px-4 text-center relative z-10">
              <p className="text-cyan-400 text-sm md:text-base font-black tracking-[0.4em] uppercase mb-6 bg-cyan-400/5 px-6 py-2 rounded-full border border-cyan-400/20 inline-block shadow-[0_0_20px_rgba(34,211,238,0.1)]">Notre Arsenal</p>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-16">
                Propulsé par les <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">meilleures architectures</span> au monde.
              </h2>
              <div className="marquee-container relative py-10">
                <div className="animate-marquee flex gap-8 pr-8">
                  {/* First Set of Items */}
                  {techStack.map(t => (
                    <div key={`stack-1-${t.id}`}
                      className="px-10 py-5 rounded-2xl bg-[#0a0c14]/40 backdrop-blur-xl border border-white/5 text-white/70 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all duration-500 font-bold text-xl tracking-tight flex items-center gap-3 shadow-2xl group cursor-default whitespace-nowrap">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full group-hover:scale-150 transition-transform shadow-[0_0_10px_#06b6d4]" />
                      {t.name}
                    </div>
                  ))}
                  {/* Second Set of Items (for seamless loop) */}
                  {techStack.map(t => (
                    <div key={`stack-2-${t.id}`}
                      className="px-10 py-5 rounded-2xl bg-[#0a0c14]/40 backdrop-blur-xl border border-white/5 text-white/70 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all duration-500 font-bold text-xl tracking-tight flex items-center gap-3 shadow-2xl group cursor-default whitespace-nowrap">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full group-hover:scale-150 transition-transform shadow-[0_0_10px_#06b6d4]" />
                      {t.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ═════════════════════════════════════════════
            5. PROCESS / MÉTHODOLOGIE — REDESIGN
        ═════════════════════════════════════════════ */}
        <section id="process" className="relative" style={{ padding: '10rem 5%' }}>
          {/* Background Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.03)_0%,transparent_70%)] pointer-events-none" />

          <div className="container mx-auto relative z-10">
            <div className="text-center mb-24">
              <p className="text-cyan-400 text-sm md:text-base font-black tracking-[0.4em] uppercase mb-6 bg-cyan-400/5 px-6 py-2 rounded-full border border-cyan-400/20 inline-block shadow-[0_0_20px_rgba(34,211,238,0.1)]">Notre Méthode</p>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[1.1] mb-6">
                L'ingénierie au service <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">de votre succès.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-[15%] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

              {process.map((step, idx) => (
                <div key={step.id}
                  className="group relative bg-[#0a0a0f]/40 backdrop-blur-xl border border-white/5 p-12 rounded-[3rem] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-700 hover:-translate-y-4 overflow-hidden shadow-2xl">

                  {/* Decorative Glow */}
                  <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-10 blur-[80px] transition-all duration-1000`} />

                  {/* Giant Step Number Background */}
                  <div className="absolute top-6 right-8 text-8xl font-black text-white/5 select-none transition-all duration-700 group-hover:text-white/10 group-hover:scale-110 pointer-events-none" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {step.step}
                  </div>

                  {/* Step Icon/Badge */}
                  <div className={`relative z-10 w-20 h-20 rounded-3xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-3xl font-black text-white shadow-2xl ${step.shadow} mb-10 group-hover:rotate-[10deg] transition-all duration-500`}>
                    <span className="drop-shadow-lg">{idx + 1}</span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-3xl font-black text-white mb-8 tracking-tight group-hover:text-cyan-400 transition-colors duration-500">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 text-lg font-bold leading-[1.8] opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom Indicator */}
                  <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${step.gradient} w-0 group-hover:w-full transition-all duration-700`} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            6. GLOBAL REACH
        ═══════════════════════════════════════════ */}
        <section className="relative overflow-hidden border-y border-white/5" style={{ padding: '8rem 0' }}>
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
            <div className="w-full lg:w-1/2">
              <p className="text-indigo-400 text-sm md:text-base font-black tracking-[0.4em] uppercase mb-6 bg-indigo-400/5 px-6 py-2 rounded-full border border-indigo-400/20 inline-block shadow-[0_0_20px_rgba(129,140,248,0.1)]">{reach.pill}</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 leading-[1.2]">
                {reach.title} <br /><span className="font-black">{reach.subtitle}</span>
              </h2>
              <p className="text-xl text-gray-300 font-medium mb-16 leading-[1.8]">{reach.description}</p>
              <div className="flex gap-12">
                {reach.stats.map((s, i) => (
                  <div key={i}>
                    <span className="block text-4xl font-black text-white mb-2">{s.value}</span>
                    <span className="text-gray-500 uppercase tracking-widest text-xs font-semibold">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Globe */}
            <div className="w-full lg:w-1/2 relative h-[400px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[80%] h-[80%] border border-cyan-500/20 rounded-full animate-[spin_60s_linear_infinite] relative">
                  <div className="absolute top-0 left-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_20px_#00d2ff] -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-1/4 left-0 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_blue] -translate-x-1/2" />
                  <div className="absolute bottom-1/4 right-0 w-5 h-5 bg-indigo-500 rounded-full shadow-[0_0_20px_#4f46e5] translate-x-1/2" />
                </div>
                <div className="absolute w-[60%] h-[60%] border border-blue-500/20 rounded-full animate-[spin_40s_linear_infinite_reverse] relative">
                  <div className="absolute top-1/4 right-0 w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_15px_purple] translate-x-1/2" />
                  <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-cyan-300 rounded-full shadow-[0_0_15px_cyan] -translate-x-1/2 translate-y-1/2" />
                </div>
                <div className="absolute w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full animate-pulse shadow-[0_0_50px_rgba(0,210,255,0.6)]" />
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════
            7. TESTIMONIALS — REDESIGN
        ═════════════════════════════════════════════ */}
        {testimonials && testimonials.length > 0 && (
          <section style={{ padding: '8rem 5%' }}>
            <div className="container mx-auto">
              <div className="text-center mb-20">
                <p className="text-cyan-400 text-sm md:text-base font-black tracking-[0.4em] uppercase mb-6 bg-cyan-400/5 px-6 py-2 rounded-full border border-cyan-400/20 inline-block shadow-[0_0_20px_rgba(34,211,238,0.1)]">Témoignages</p>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                  Ce que disent nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">clients</span>
                </h2>
              </div>

              {/* Testimonial cards — premium redesign */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((t: any, i: number) => (
                  <div key={t.id}
                    className="group relative flex flex-col bg-white/[0.04] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.07] hover:border-cyan-500/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden">

                    {/* Giant decorative quote */}
                    <div className="absolute top-4 right-6 text-[100px] font-black leading-none select-none pointer-events-none"
                      style={{ color: 'rgba(0,210,255,0.06)', fontFamily: 'Georgia, serif' }}>&ldquo;
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, s) => (
                        <svg key={s} viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-cyan-400">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-gray-200 text-[15px] leading-[1.8] mb-10 flex-1 relative z-10">
                      &ldquo;{t.text}&rdquo;
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-6 border-t border-white/10 relative z-10">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0"
                        style={{ background: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)' }}>
                        {t.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-bold text-[15px] leading-tight">{t.name}</p>
                        <p className="text-cyan-400/80 text-xs mt-0.5 font-medium">{t.role}</p>
                      </div>
                      {t.logoType && (
                        <div className="shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
                          <BrandLogo logoType={t.logoType} name="" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═════════════════════════════════════════════
            8. BLOG / STARTUP INSIGHTS
        ═════════════════════════════════════════════ */}
        <section id="blogs" style={{ padding: '8rem 5%' }} className="relative">
          <div className="absolute top-0 right-0 w-1/2 h-[800px] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
              <div>
                <p className="text-cyan-400 text-sm md:text-base font-black tracking-[0.4em] uppercase mb-6 bg-cyan-400/5 px-6 py-2 rounded-full border border-cyan-400/20 inline-block shadow-[0_0_20px_rgba(34,211,238,0.1)]">Startup Insights</p>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[1.2] mb-4">
                  Conseils d'<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Experts</span>
                </h2>
              </div>
              <a href="#blogs" className="group flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/10 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-md">
                <span className="text-sm font-black text-gray-300 group-hover:text-cyan-400 uppercase tracking-[0.2em] transition-colors">Tous les articles</span>
                <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.length > 0 ? blogs.map((blog, idx) => (
                <article key={blog.id}
                  className="group relative bg-[#0b0c14]/60 backdrop-blur-2xl border border-white/5 rounded-[2rem] overflow-hidden hover:-translate-y-4 hover:border-cyan-500/40 transition-all duration-700 shadow-2xl flex flex-col h-full cursor-pointer">

                  {/* Image Container */}
                  <div className="relative h-60 w-full overflow-hidden border-b border-white/5">
                    {/* Placeholder gradient if no image */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${idx % 2 === 0 ? 'from-cyan-900 to-blue-900' : 'from-blue-900 to-indigo-900'} opacity-50`} />

                    {blog.image && (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000"
                      />
                    )}

                    {/* Overlay Gradient for smooth transition */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c14] via-transparent to-transparent opacity-90" />

                    {/* Date Badge */}
                    <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-cyan-400 text-[10px] font-black tracking-[0.2em] uppercase">
                      {new Date(blog.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-black text-white mb-6 tracking-tight group-hover:text-cyan-400 transition-colors duration-500 leading-snug">
                      {blog.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-semibold leading-[1.8] mb-10 flex-1">
                      {blog.excerpt || blog.content.substring(0, 150) + '…'}
                    </p>

                    {/* Read More Link */}
                    <div className="mt-auto flex items-center gap-3">
                      <div className="h-px w-8 bg-cyan-500/30 group-hover:w-16 transition-all duration-700" />
                      <span className="text-xs font-black uppercase tracking-[0.3em] text-cyan-400/60 group-hover:text-cyan-400 transition-colors">
                        Lire l'article
                      </span>
                      <span className="text-cyan-400 translate-x-0 group-hover:translate-x-2 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                        →
                      </span>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/20 rounded-[2rem] pointer-events-none transition-colors duration-700" />
                </article>
              )) : (
                <div className="col-span-12 text-center text-gray-500 py-10">Aucun article pour le moment.</div>
              )}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            9. CTA SECTION
        ═══════════════════════════════════════════ */}
        {
          cta.title && (
            <section style={{ padding: '6rem 5%' }}>
              <div className="container mx-auto">
                <div className="relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 rounded-[3rem] p-16 text-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-transparent to-blue-900/20 pointer-events-none" />
                  <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="relative z-10">
                    {cta.badge && (
                      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-8">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        {cta.badge}
                      </div>
                    )}
                    <h2 className="text-5xl md:text-7xl font-black mb-10 tracking-tighter text-white leading-[1.1]">
                      {cta.title}{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{cta.highlight}</span>
                    </h2>
                    <p className="text-xl text-gray-200 font-bold mb-16 max-w-2xl mx-auto leading-loose tracking-tight">{cta.description}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a href="#contact"
                        className="px-10 py-5 bg-cyan-400 text-[#050508] font-black text-sm uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-black transition-all shadow-xl shadow-cyan-400/20">
                        {cta.buttonPrimary || 'Démarrer un projet'}
                      </a>
                      <a href="tel:+33123456789"
                        className="px-10 py-5 border border-white/20 text-white font-semibold text-sm uppercase tracking-[0.2em] rounded-full hover:border-cyan-400 hover:text-cyan-400 transition-all backdrop-blur-sm">
                        {cta.buttonSecondary || 'Planifier un appel'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        }

        {/* ═══════════════════════════════════════════
            10. FOOTER
        ═══════════════════════════════════════════ */}
        <footer id="contact" className="relative border-t border-white/10 pt-32 pb-12 overflow-hidden" style={{ fontFamily: 'Outfit, sans-serif' }}>
          {/* Subtle Glow Background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="container mx-auto px-6 relative z-10">
            {/* Upper Footer: Logo & Mega-Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">

              {/* Brand Section */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-4 mb-12 group cursor-default">
                  <div className="relative">
                    <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img src="/logo.png" alt="Nexura IT" width="56"
                      style={{ filter: 'contrast(4) brightness(0.9) drop-shadow(0 0 8px rgba(0,210,255,0.4))', mixBlendMode: 'screen' }} />
                  </div>
                  <span className="text-4xl font-black tracking-tighter text-white">Nexura <span className="text-cyan-400">IT</span></span>
                </div>
                <p className="text-gray-200 text-xl leading-[1.8] max-w-md mb-12 font-bold tracking-tight">
                  L'excellence technologique au service de votre croissance. Nous concevons le futur numérique avec précision, éthique et performance.
                </p>
                <div className="flex gap-4">
                  {[
                    {
                      label: 'Twitter',
                      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z" /></svg>
                    },
                    {
                      label: 'LinkedIn',
                      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                    },
                    {
                      label: 'GitHub',
                      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.01.005 2.01.135 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                    },
                    {
                      label: 'Dribbble',
                      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 2.02 7.308 2.455-1.593 4.103-4.103 4.364-6.87zm-1.103-2.513C19.7 11.01 16.34 11.002 12.3 12.03a15.26 15.26 0 00-2.285-4.4c4.017-1.488 5.722-3.756 5.864-3.955-1.74-1.282-3.896-2.046-6.234-2.046-1.54 0-2.99.345-4.29.967.01.015.77 2.652 4.6 4.38a14.39 14.39 0 012.3 4.493c-4.414 1.347-8.69 1.39-9.19 1.39-.033.424-.055.856-.055 1.294 0 1.05.158 2.06.452 3.01.554-.047 5.253-.33 10.39-2.31 1.258 2.97 1.77 5.73 1.93 6.68a10.4 10.4 0 005.14-3.812c-.172-.494-.784-2.65-2.072-6.142zM8.38 3.08a10.3 10.3 0 00-3.56 2.6c.143.204 1.867 2.47 5.513 3.69-.64-1.48-1.326-3.32-1.953-6.29zM4.152 7.64a10.3 10.3 0 00-1.8 4.34c.83 0 4.69-.11 8.8-1.31-1.31-2.9-2.1-5.18-2.29-5.83-2.16 1.22-3.83 2.82-4.71 4.8z" /></svg>
                    }
                  ].map((s) => (
                    <a key={s.label} href="#" aria-label={s.label}
                      className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:border-cyan-500/50 hover:text-white hover:bg-cyan-500/5 transition-all backdrop-blur-sm group">
                      <span className="group-hover:scale-110 transition-transform">{s.icon}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Columns Grid */}
              <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-16 lg:gap-24 pt-4">
                <div>
                  <div className="flex items-center gap-3 mb-10 group">
                    <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                    <h4 className="text-blue-400 font-black text-sm uppercase tracking-[0.2em] opacity-100">Expertises</h4>
                  </div>
                  <ul className="space-y-7">
                    {['Cloud Architecture', 'Cyber Defense', 'App Engineering', 'AI Strategy', 'Custom Dev'].map(link => (
                      <li key={link}>
                        <a href="#services" className="group flex items-center gap-0 hover:gap-4 text-gray-300 hover:text-cyan-400 transition-all duration-500 text-lg font-bold tracking-tight">
                          <span className="w-0 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_15px_#22d3ee]" />
                          <span className="group-hover:translate-x-2 transition-transform">{link}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-10 group">
                    <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                    <h4 className="text-blue-400 font-black text-sm uppercase tracking-[0.2em] opacity-100">Société</h4>
                  </div>
                  <ul className="space-y-7">
                    {['À propos', 'Méthodologie', 'Carrières', 'Blog', 'Études de cas'].map(link => (
                      <li key={link}>
                        <a href="#" className="group flex items-center gap-0 hover:gap-4 text-gray-300 hover:text-white transition-all duration-500 text-lg font-bold tracking-tight">
                          <span className="w-0 h-2 bg-white rounded-full opacity-0 group-hover:w-2 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_15px_#fff]" />
                          <span className="group-hover:translate-x-2 transition-transform">{link}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <div className="flex items-center gap-3 mb-10 group">
                    <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                    <h4 className="text-blue-400 font-black text-sm uppercase tracking-[0.2em] opacity-100">Localisation</h4>
                  </div>
                  <ul className="space-y-10">
                    <li className="group flex items-start gap-5 text-gray-200 text-base font-bold tracking-tight leading-relaxed">
                      <span className="text-cyan-400 mt-1 flex-shrink-0 group-hover:scale-150 group-hover:rotate-12 transition-transform text-xl">/</span>
                      <span className="group-hover:text-white transition-colors">{settings.address}</span>
                    </li>
                    <li className="group flex items-center gap-5 text-gray-200 text-base font-bold tracking-tight">
                      <span className="text-cyan-400 flex-shrink-0 group-hover:scale-150 group-hover:rotate-12 transition-transform text-xl">/</span>
                      <a href={`mailto:${settings.email}`} className="hover:text-cyan-400 transition-colors">{settings.email}</a>
                    </li>
                    <li className="group flex items-center gap-5 text-gray-200 text-base font-bold tracking-tight">
                      <span className="text-cyan-400 flex-shrink-0 group-hover:scale-150 group-hover:rotate-12 transition-transform text-xl">/</span>
                      <span className="group-hover:text-white transition-colors">{settings.telephone}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>



            {/* Lower Footer */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em] text-center md:text-left">
                © {new Date().getFullYear()} NEXURA IT OPERATIONS. <span className="text-gray-800 mx-3">|</span> ARCHITECTURE HIGH-END
              </p>
              <div className="flex gap-10">
                {['Privacy', 'Terms', 'Security'].map(link => (
                  <a key={link} href="#" className="text-gray-600 hover:text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors">{link}</a>
                ))}
              </div>
              <ScrollTopButton />
            </div>
          </div>
        </footer>

      </main >
    </>
  );
}
