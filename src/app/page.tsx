import { getDb } from '@/lib/db';
import UnicornWrapper from '@/components/UnicornWrapper';
import Image from 'next/image';

export default function Home() {
  const { settings, blogs, hero, services, metrics, techStack, testimonials, cta, process, reach } = getDb();

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

              <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-black mb-8 tracking-tighter leading-none text-white drop-shadow-2xl">
                {hero.titlePrefix}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-blue-500 to-indigo-600">
                  {hero.titleHighlight}
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300/90 max-w-3xl mx-auto mb-14 font-light leading-relaxed">
                {hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a href="#services"
                  className="relative group/btn px-10 py-5 overflow-hidden rounded-full bg-white text-black font-bold text-sm uppercase tracking-[0.2em] transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
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

        {/* ═══════════════════════════════════════════
            3. SERVICES
        ═══════════════════════════════════════════ */}
        <section id="services" style={{ padding: '8rem 5%' }}>
          <div className="container mx-auto">
            <div className="text-center mb-20">
              <p className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">Ce que nous faisons</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">
                Nos Services <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Informatiques</span>
              </h2>
              <p className="text-gray-400 text-xl max-w-2xl mx-auto font-light">
                Des solutions techniques sur-mesure pour propulser votre entreprise dans l'ère digitale.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((s, i) => (
                <div key={s.id}
                  className="group relative bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:-translate-y-3 hover:bg-white/[0.08] hover:border-cyan-500/30 transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                  <div className="text-5xl mb-8 block filter drop-shadow-[0_0_20px_rgba(0,210,255,0.3)]">{s.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{s.title}</h3>
                  <p className="text-gray-400 leading-relaxed font-light">{s.description}</p>
                  <div className="mt-8 flex items-center gap-2 text-cyan-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    En savoir plus <span>→</span>
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
              <p className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">Notre Arsenal</p>
              <h2 className="text-3xl md:text-5xl font-light text-white mb-16">
                Propulsé par les <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">meilleures architectures</span> au monde.
              </h2>
              <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
                {techStack.map(t => (
                  <span key={t.id}
                    className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-cyan-500/20 hover:border-cyan-400/50 hover:text-white hover:scale-105 transition-all duration-300 font-medium cursor-default">
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════
            5. PROCESS / MÉTHODOLOGIE
        ═══════════════════════════════════════════ */}
        <section id="process" className="relative" style={{ padding: '8rem 5%' }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-2/3 bg-blue-600/5 blur-[120px] rounded-[100%] pointer-events-none" />
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-20">
              <p className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">Notre Méthode</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                Comment nous <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">transformons</span> votre vision.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {process.map(step => (
                <div key={step.id}
                  className={`group bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/[0.08] transition-all duration-500 ${step.hoverBorder}`}>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-2xl font-black text-white shadow-lg ${step.shadow} mb-8 group-hover:scale-110 transition-transform`}>
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-400 font-light leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            6. GLOBAL REACH
        ═══════════════════════════════════════════ */}
        <section className="relative overflow-hidden border-y border-white/5 bg-black/20 backdrop-blur-sm" style={{ padding: '8rem 0' }}>
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
            <div className="w-full lg:w-1/2">
              <p className="text-indigo-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">{reach.pill}</p>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-8 leading-tight">
                {reach.title} <br /><span className="font-black">{reach.subtitle}</span>
              </h2>
              <p className="text-xl text-gray-400 font-light mb-10 leading-relaxed">{reach.description}</p>
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

        {/* ═══════════════════════════════════════════
            7. TESTIMONIALS
        ═══════════════════════════════════════════ */}
        {testimonials.length > 0 && (
          <section style={{ padding: '8rem 5%' }}>
            <div className="container mx-auto">
              <div className="text-center mb-20">
                <p className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">Ils nous font confiance</p>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                  Ce que disent nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">clients</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map(t => (
                  <div key={t.id}
                    className="group bg-white/[0.04] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.08] hover:border-cyan-500/20 transition-all duration-500 hover:-translate-y-2">
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-cyan-400 text-lg">★</span>
                      ))}
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light italic">"{t.text}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-sm shrink-0">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{t.name}</p>
                        <p className="text-gray-500 text-sm">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════
            8. BLOG
        ═══════════════════════════════════════════ */}
        <section id="blogs" style={{ padding: '8rem 5%' }}>
          <div className="container mx-auto">
            <div className="flex justify-between items-end mb-16">
              <div>
                <p className="text-cyan-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">Actualités</p>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">Blog & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Insights</span></h2>
              </div>
              <a href="#" className="hidden sm:block text-cyan-400 hover:text-cyan-300 text-sm font-semibold uppercase tracking-wider">
                Voir tout →
              </a>
            </div>
            <div className="flex flex-col gap-6">
              {blogs.length > 0 ? blogs.map(blog => (
                <article key={blog.id}
                  className="bg-white/[0.04] border border-white/10 rounded-3xl p-10 flex flex-col md:flex-row gap-10 hover:bg-white/[0.07] hover:border-cyan-500/20 transition-all duration-300 border-l-4 border-l-cyan-500">
                  <div className="md:w-1/5 shrink-0">
                    <p className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-2">
                      {new Date(blog.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <div className="h-0.5 w-10 bg-white/20 rounded mt-3" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{blog.title}</h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-6">
                      {blog.excerpt || blog.content.substring(0, 150) + '…'}
                    </p>
                    <button className="text-white hover:text-cyan-400 transition-colors border-b border-white/30 hover:border-cyan-400 pb-1 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider">
                      Lire l'article <span>↗</span>
                    </button>
                  </div>
                </article>
              )) : (
                <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-16 text-center">
                  <p className="text-gray-500 text-xl font-light">Aucun article publié pour l'instant.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            9. CTA SECTION
        ═══════════════════════════════════════════ */}
        {cta.title && (
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
                  <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-6">
                    {cta.title}{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{cta.highlight}</span>
                  </h2>
                  <p className="text-xl text-gray-400 font-light mb-12 max-w-2xl mx-auto leading-relaxed">{cta.description}</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#contact"
                      className="px-10 py-5 bg-white text-black font-bold text-sm uppercase tracking-[0.2em] rounded-full hover:bg-cyan-400 hover:text-white transition-all shadow-xl">
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
        )}

        {/* ═══════════════════════════════════════════
            10. FOOTER
        ═══════════════════════════════════════════ */}
        <footer id="contact" className="relative border-t border-white/10 mt-10">
          <div className="container mx-auto px-6 pt-20 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">

              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                  <img src="/logo.png" alt="Nexura IT" width="50"
                    style={{ filter: 'contrast(4) brightness(0.9) drop-shadow(0 0 8px rgba(0,210,255,0.5))', mixBlendMode: 'screen' }} />
                  <span className="text-2xl font-light text-white">Nexura <b className="text-cyan-400">IT</b></span>
                </div>
                <p className="text-gray-400 text-base leading-relaxed max-w-md mb-8 font-light">
                  Votre partenaire technologique d'excellence. Infrastructures robustes, scalables et esthétiquement parfaites.
                </p>
                <div className="flex gap-3">
                  {[['in', 'LinkedIn'], ['gh', 'GitHub']].map(([s, label]) => (
                    <a key={s} href="#" aria-label={label}
                      className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-xs font-bold text-white hover:bg-white hover:text-black transition-all backdrop-blur-sm">
                      {s}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Contact</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-gray-400 text-sm"><span className="text-cyan-400 mt-0.5">📍</span>{settings.address}</li>
                  <li className="flex items-center gap-3 text-gray-400 text-sm"><span className="text-cyan-400">📞</span>{settings.telephone}</li>
                  <li className="flex items-center gap-3 text-sm">
                    <span className="text-cyan-400">✉️</span>
                    <a href={`mailto:${settings.email}`} className="text-gray-400 hover:text-cyan-400 transition-colors">{settings.email}</a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Navigation</h4>
                <ul className="space-y-3">
                  {[['/', 'Accueil'], ['#services', 'Services'], ['#process', 'Méthode'], ['#blogs', 'Blog']].map(([href, label]) => (
                    <li key={href}><a href={href} className="text-gray-400 hover:text-white transition-colors text-sm">{label}</a></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-sm">© {new Date().getFullYear()} Nexura IT. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="text-gray-600 hover:text-white text-sm transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-600 hover:text-white text-sm transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}
