'use client';

import { getDb } from '@/lib/db';
import { updateSettings, addBlog, deleteBlog, updateHero, addService, deleteService, updateProcessStep, updateReach } from '../actions';
import UnicornWrapper from '@/components/UnicornWrapper';
import { useState, useEffect } from 'react';

export default function AdminPage() {
    const [db, setDb] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('hero');

    useEffect(() => {
        // En Next.js, on récupère les données via une action ou un fetch pour le client-side
        // Mais ici pour simplifier et garder la structure du user, on va passer par les props ou un fetch
        fetch('/api/db').then(res => res.json()).then(data => setDb(data));
    }, []);

    // Simulation de données pour le rendu immédiat si API pas encore prête
    // Note: Idéalement on utiliserait un Server Component avec des Client Components enfants
    // Pour corriger le design rapidement comme demandé :

    const sections = [
        { id: 'hero', label: 'Secteur Hero', icon: '✨' },
        { id: 'services', label: 'Services', icon: '🛠️' },
        { id: 'process', label: 'Méthodologie', icon: '📈' },
        { id: 'reach', label: 'International', icon: '🌍' },
        { id: 'blogs', label: 'Blog & Actu', icon: '📝' },
        { id: 'contact', label: 'Coordonnées', icon: '📞' },
    ];

    if (!db) return <div className="min-h-screen bg-black flex items-center justify-center text-white font-black text-4xl animate-pulse">NEXURA <span className="text-cyan-400">ADMIN</span></div>;

    const { settings, blogs, hero, services, process, reach } = db;

    return (
        <main className="relative min-h-screen bg-[#050505] overflow-hidden font-sans text-white">
            {/* Background */}
            <div className="fixed inset-0 w-full h-full -z-10 opacity-40">
                <UnicornWrapper />
            </div>

            <div className="flex min-h-screen">

                {/* SIDEBAR ULTRA-ORGANISEE */}
                <aside className="w-80 border-r border-white/10 bg-black/60 backdrop-blur-2xl flex flex-col sticky top-0 h-screen z-50">
                    <div className="p-8 border-b border-white/10 mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center font-black text-sm">N</div>
                            <h1 className="text-xl font-black tracking-tighter">NEXURA <span className="text-cyan-400">IT</span></h1>
                        </div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">Système de Gestion de Contenu</p>
                    </div>

                    <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveTab(section.id)}
                                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${activeTab === section.id
                                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20 translate-x-1'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <span className="text-xl">{section.icon}</span>
                                <span className="font-semibold text-sm tracking-wide">{section.label}</span>
                                {activeTab === section.id && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>}
                            </button>
                        ))}
                    </nav>

                    <div className="p-6 mt-auto">
                        <a href="/" className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                            <span>Visualiser le site</span>
                            <span className="text-lg">↗</span>
                        </a>
                    </div>
                </aside>

                {/* ZONE DE CONTENU FLUIDE */}
                <section className="flex-1 overflow-y-auto p-12 lg:p-20 custom-scrollbar">

                    <div className="max-w-4xl mx-auto">
                        {/* HEADER DE SECTION */}
                        <div className="flex items-end justify-between mb-16 animate-fade-in">
                            <div>
                                <h2 className="text-5xl font-black tracking-tighter mb-4 capitalize">
                                    Editer <span className="text-cyan-400">{activeTab}</span>
                                </h2>
                                <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Dernière mise à jour</p>
                                <p className="text-white text-sm font-medium">Aujourd'hui, {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                        </div>

                        {/* FORMULAIRES DYNAMIQUES */}
                        <div className="animate-fade-in delay-1">

                            {/* HERO */}
                            {activeTab === 'hero' && (
                                <form action={updateHero} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="md:col-span-2 group">
                                            <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-3 ml-2 group-focus-within:text-cyan-400 transition-colors">Texte du Badge Animé</label>
                                            <input type="text" name="pillText" defaultValue={hero.pillText} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:bg-white/[0.08] focus:border-cyan-400/50 outline-none transition-all shadow-inner" />
                                        </div>
                                        <div className="group">
                                            <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-3 ml-2 group-focus-within:text-cyan-400 transition-colors">Titre (Statique)</label>
                                            <input type="text" name="titlePrefix" defaultValue={hero.titlePrefix} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:bg-white/[0.08] focus:border-cyan-400/50 outline-none transition-all shadow-inner" />
                                        </div>
                                        <div className="group">
                                            <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-3 ml-2 group-focus-within:text-cyan-400 transition-colors">Titre (Mot Brillant)</label>
                                            <input type="text" name="titleHighlight" defaultValue={hero.titleHighlight} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:bg-white/[0.08] focus:border-cyan-400/50 outline-none transition-all shadow-inner" />
                                        </div>
                                        <div className="md:col-span-2 group">
                                            <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-3 ml-2 group-focus-within:text-cyan-400 transition-colors">Description Principale</label>
                                            <textarea name="description" defaultValue={hero.description} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white h-48 focus:bg-white/[0.08] focus:border-cyan-400/50 outline-none transition-all shadow-inner resize-none" />
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full py-6 rounded-2xl bg-cyan-600 text-white font-black text-sm uppercase tracking-widest hover:bg-cyan-500 transition-all shadow-xl shadow-cyan-900/40">
                                        Sauvegarder les modifications du Hero
                                    </button>
                                </form>
                            )}

                            {/* SERVICES */}
                            {activeTab === 'services' && (
                                <div className="space-y-12">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {services.map((s: any) => (
                                            <div key={s.id} className="p-6 bg-white/5 border border-white/10 rounded-[1.5rem] flex items-center justify-between group hover:border-cyan-500/30 transition-all">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-3xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{s.icon}</span>
                                                    <span className="font-bold text-lg">{s.title}</span>
                                                </div>
                                                <form action={deleteService.bind(null, s.id)}>
                                                    <button className="w-10 h-10 rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 italic font-bold">×</button>
                                                </form>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-white/5 border border-white/10 rounded-[2rem] p-10">
                                        <h3 className="text-xl font-bold mb-8">Nouveau Service</h3>
                                        <form action={addService} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <input type="text" name="icon" placeholder="Emoji Icon" className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white outline-none" />
                                                <input type="text" name="title" placeholder="Titre du service" className="md:col-span-2 w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white outline-none" />
                                            </div>
                                            <textarea name="description" placeholder="Description courte..." className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white h-32 outline-none resize-none" />
                                            <button type="submit" className="w-full py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-cyan-400 hover:text-white transition-all">Ajouter le service au catalogue</button>
                                        </form>
                                    </div>
                                </div>
                            )}

                            {/* PROCESS */}
                            {activeTab === 'process' && (
                                <div className="space-y-8">
                                    {process.map((p: any, idx: number) => (
                                        <form key={p.id} action={updateProcessStep.bind(null, idx)} className="bg-white/5 border border-white/10 p-10 rounded-[2rem] flex flex-col md:flex-row gap-8 group hover:bg-white/[0.08] transition-all">
                                            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 flex-shrink-0 flex items-center justify-center text-4xl font-black text-white shadow-xl shadow-cyan-500/20">{p.step}</div>
                                            <div className="flex-1 space-y-4">
                                                <input type="text" name="title" defaultValue={p.title} className="text-2xl font-black bg-transparent border-b border-white/10 w-full outline-none focus:border-cyan-400 pb-2" />
                                                <textarea name="description" defaultValue={p.description} className="w-full bg-transparent border border-white/5 rounded-xl p-4 text-gray-400 font-light leading-relaxed h-28 outline-none focus:bg-black/20" />
                                                <button type="submit" className="px-8 py-3 rounded-full bg-white/5 border border-white/20 text-cyan-400 text-xs font-bold uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-all">Mettre à jour l'étape</button>
                                            </div>
                                        </form>
                                    ))}
                                </div>
                            )}

                            {/* REACH */}
                            {activeTab === 'reach' && (
                                <form action={updateReach} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] space-y-10">
                                    <div className="grid grid-cols-1 gap-8">
                                        <div className="group">
                                            <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-3 italic">Petit titre de section</label>
                                            <input type="text" name="pill" defaultValue={reach.pill} className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white outline-none" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-3 italic">Titre Principal</label>
                                                <input type="text" name="title" defaultValue={reach.title} className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-3 italic">Sous-titre (Fin de phrase)</label>
                                                <input type="text" name="subtitle" defaultValue={reach.subtitle} className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white outline-none font-bold" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-3 italic">Description détaillée</label>
                                            <textarea name="description" defaultValue={reach.description} className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white h-40 outline-none resize-none" />
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full py-6 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-500 shadow-xl shadow-indigo-900/40 transition-all">Propulser les données internationales</button>
                                </form>
                            )}

                            {/* BLOGS */}
                            {activeTab === 'blogs' && (
                                <div className="space-y-12">
                                    <form action={addBlog} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] space-y-6">
                                        <h3 className="text-2xl font-black mb-6">Éditer un nouvel article</h3>
                                        <input type="text" name="title" placeholder="Titre percutant" className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white outline-none" />
                                        <input type="text" name="excerpt" placeholder="Accroche (résumé)" className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white outline-none" />
                                        <textarea name="content" placeholder="Corps de l'article..." className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white h-64 outline-none" />
                                        <button type="submit" className="w-full py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-cyan-500 hover:text-white transition-all">Diffuser sur le réseau</button>
                                    </form>

                                    <div className="grid grid-cols-1 gap-4">
                                        {blogs.map((b: any) => (
                                            <div key={b.id} className="p-8 bg-white/5 border border-white/10 rounded-3xl flex justify-between items-center group hover:bg-white/[0.08] transition-all">
                                                <div>
                                                    <h4 className="text-xl font-bold mb-1">{b.title}</h4>
                                                    <p className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.3em]">{b.date}</p>
                                                </div>
                                                <form action={deleteBlog.bind(null, b.id)}>
                                                    <button className="px-6 py-2 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-bold uppercase hover:bg-red-500 hover:text-white transition-all">Effacer</button>
                                                </form>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CONTACT */}
                            {activeTab === 'contact' && (
                                <form action={updateSettings} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">Téléphone Direct</label>
                                            <input type="text" name="telephone" defaultValue={settings.telephone} className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white outline-none font-black text-xl tracking-tighter" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">Email Support/Sales</label>
                                            <input type="email" name="email" defaultValue={settings.email} className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white outline-none" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">Siège Social / Adresse</label>
                                            <input type="text" name="address" defaultValue={settings.address} className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white outline-none" />
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full py-6 rounded-2xl bg-cyan-600 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-cyan-500 transition-all">Finaliser les coordonnées</button>
                                </form>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
