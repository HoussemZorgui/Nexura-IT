import { getDb } from '@/lib/db';
import { updateSettings, addBlog, deleteBlog, updateHero, addService, deleteService, updateProcessStep, updateReach } from '../actions';
import UnicornWrapper from '@/components/UnicornWrapper';

export default function AdminPage() {
    const { settings, blogs, hero, services, process, reach } = getDb();

    return (
        <main className="relative min-h-screen">
            {/* Background identical to Home */}
            <div className="fixed inset-0 w-full h-full -z-10 bg-black">
                <UnicornWrapper />
            </div>

            <div className="container relative z-10 py-20">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-black text-white">Back<span className="text-cyan-400">office</span></h1>
                    <a href="/" className="px-6 py-2 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all">Voir le site →</a>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Sidebar Nav (Visual) */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="glass-panel sticky top-24">
                            <h3 className="text-xl font-bold mb-6 text-cyan-400 uppercase tracking-widest text-sm">Navigation</h3>
                            <nav className="flex flex-col gap-2">
                                <a href="#secteur-hero" className="p-4 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-all border border-transparent hover:border-white/10">Secteur Hero</a>
                                <a href="#secteur-services" className="p-4 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-all border border-transparent hover:border-white/10">Secteur Services</a>
                                <a href="#secteur-process" className="p-4 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-all border border-transparent hover:border-white/10">Secteur Processus</a>
                                <a href="#secteur-reach" className="p-4 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-all border border-transparent hover:border-white/10">Secteur International</a>
                                <a href="#secteur-blogs" className="p-4 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-all border border-transparent hover:border-white/10">Gestion du Blog</a>
                                <a href="#secteur-contact" className="p-4 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition-all border border-transparent hover:border-white/10">Infos Contact</a>
                            </nav>
                        </div>
                    </div>

                    {/* Main Edition Area */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* HERO EDIT */}
                        <section id="secteur-hero" className="glass-panel">
                            <h2 className="text-2xl font-bold mb-8 text-white border-b border-white/10 pb-4">Configuration du Hero</h2>
                            <form action={updateHero} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-gray-400 text-sm mb-2">Texte du Badge (Pill)</label>
                                        <input type="text" name="pillText" defaultValue={hero.pillText} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-400 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2">Titre (Début)</label>
                                        <input type="text" name="titlePrefix" defaultValue={hero.titlePrefix} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-400 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2">Titre (Mot Brillant)</label>
                                        <input type="text" name="titleHighlight" defaultValue={hero.titleHighlight} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-400 outline-none" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-gray-400 text-sm mb-2">Description</label>
                                        <textarea name="description" defaultValue={hero.description} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white h-32 focus:border-cyan-400 outline-none" />
                                    </div>
                                </div>
                                <button type="submit" className="w-full py-4 rounded-xl bg-cyan-500 text-white font-bold hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20">Mettre à jour le Hero</button>
                            </form>
                        </section>

                        {/* SERVICES EDIT */}
                        <section id="secteur-services" className="glass-panel">
                            <h2 className="text-2xl font-bold mb-8 text-white border-b border-white/10 pb-4">Gestion des Services</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                {services.map(s => (
                                    <div key={s.id} className="p-4 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center">
                                        <div>
                                            <span className="text-2xl mr-2">{s.icon}</span>
                                            <span className="font-bold text-white">{s.title}</span>
                                        </div>
                                        <form action={deleteService.bind(null, s.id)}>
                                            <button className="text-red-400 hover:text-red-300 text-sm">Supprimer</button>
                                        </form>
                                    </div>
                                ))}
                            </div>
                            <h3 className="text-white font-bold mb-4">Ajouter un service</h3>
                            <form action={addService} className="space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <input type="text" name="icon" placeholder="Icon (Emoji)" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-400 outline-none" />
                                    <input type="text" name="title" placeholder="Nom du service" className="col-span-2 w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-400 outline-none" />
                                </div>
                                <textarea name="description" placeholder="Description courte..." className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white h-24 focus:border-cyan-400 outline-none" />
                                <button type="submit" className="w-full py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 border border-white/10 transition-all">Ajouter au site</button>
                            </form>
                        </section>

                        {/* PROCESS EDIT */}
                        <section id="secteur-process" className="glass-panel">
                            <h2 className="text-2xl font-bold mb-8 text-white border-b border-white/10 pb-4">Processus (3 Étapes)</h2>
                            <div className="space-y-8">
                                {process.map((p, idx) => (
                                    <form key={p.id} action={updateProcessStep.bind(null, idx)} className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center font-bold text-cyan-400">{p.step}</div>
                                            <input type="text" name="title" defaultValue={p.title} className="flex-1 bg-transparent border-b border-white/10 p-2 text-white font-bold outline-none focus:border-cyan-400" />
                                        </div>
                                        <textarea name="description" defaultValue={p.description} className="w-full bg-transparent border border-white/10 rounded-xl p-4 text-gray-400 h-24 outline-none focus:border-cyan-400" />
                                        <button type="submit" className="text-cyan-400 text-sm font-bold hover:underline">Sauvegarder l'étape {p.step}</button>
                                    </form>
                                ))}
                            </div>
                        </section>

                        {/* REACH EDIT */}
                        <section id="secteur-reach" className="glass-panel">
                            <h2 className="text-2xl font-bold mb-8 text-white border-b border-white/10 pb-4">Échelle Internationale</h2>
                            <form action={updateReach} className="space-y-6">
                                <label className="block text-gray-400 text-sm">Badge</label>
                                <input type="text" name="pill" defaultValue={reach.pill} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-cyan-400" />
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2">Titre</label>
                                        <input type="text" name="title" defaultValue={reach.title} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2">Sous-titre (Gras)</label>
                                        <input type="text" name="subtitle" defaultValue={reach.subtitle} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none" />
                                    </div>
                                </div>
                                <textarea name="description" defaultValue={reach.description} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white h-24 outline-none" />
                                <button type="submit" className="w-full py-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500">Mettre à jour Reach</button>
                            </form>
                        </section>

                        {/* BLOG MANAGEMENT */}
                        <section id="secteur-blogs" className="glass-panel">
                            <h2 className="text-2xl font-bold mb-8 text-white border-b border-white/10 pb-4">Gestion des Blogs</h2>
                            <form action={addBlog} className="space-y-4 mb-12">
                                <input type="text" name="title" placeholder="Titre de l'article" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-cyan-400" />
                                <input type="text" name="excerpt" placeholder="Résumé court" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-cyan-400" />
                                <textarea name="content" placeholder="Contenu complet..." className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white h-48 outline-none focus:border-cyan-400" />
                                <button type="submit" className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200">Publier l'article</button>
                            </form>

                            <h3 className="text-white font-bold mb-4">Articles en ligne</h3>
                            <div className="space-y-4">
                                {blogs.map(b => (
                                    <div key={b.id} className="p-6 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center">
                                        <div>
                                            <h4 className="text-white font-bold">{b.title}</h4>
                                            <p className="text-gray-500 text-sm">{b.date}</p>
                                        </div>
                                        <form action={deleteBlog.bind(null, b.id)}>
                                            <button className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 text-sm transition-all outline-none">Supprimer</button>
                                        </form>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* CONTACT INFO */}
                        <section id="secteur-contact" className="glass-panel">
                            <h2 className="text-2xl font-bold mb-8 text-white border-b border-white/10 pb-4">Informations de Contact</h2>
                            <form action={updateSettings} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2">Téléphone</label>
                                        <input type="text" name="telephone" defaultValue={settings.telephone} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2">Email</label>
                                        <input type="email" name="email" defaultValue={settings.email} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white" />
                                    </div>
                                    <div className="col-span-full">
                                        <label className="block text-gray-400 text-sm mb-2">Adresse</label>
                                        <input type="text" name="address" defaultValue={settings.address} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white" />
                                    </div>
                                </div>
                                <button type="submit" className="w-full py-4 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 border border-white/10 transition-all">Sauvegarder le footer</button>
                            </form>
                        </section>

                    </div>
                </div>
            </div>
        </main>
    );
}
