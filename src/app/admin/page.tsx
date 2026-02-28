'use client';

import { useState, useEffect, useTransition, ReactNode } from 'react';
import {
    updateSettings, addBlog, deleteBlog, updateHero,
    addService, deleteService, updateProcessStep, updateReach
} from '../actions';

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ name }: { name: string }) => {
    const icons: Record<string, ReactNode> = {
        hero: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
        services: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
        process: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
        reach: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 010 18M12 3a15.3 15.3 0 000 18" /></svg>,
        blogs: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
        contact: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
        check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5"><path strokeLinecap="round" d="M5 13l4 4L19 7" /></svg>,
        trash: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
        plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" d="M12 5v14M5 12h14" /></svg>,
        link: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
    };
    return icons[name] ?? null;
};

// ─── Input Components ─────────────────────────────────────────────────────────
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-[0.12em] mb-2">{label}</label>
        {children}
    </div>
);

const inputCls = "w-full bg-[#111113] border border-[#2a2a2e] rounded-xl px-4 py-3 text-[14px] text-white placeholder-gray-600 focus:outline-none focus:border-[#00d2ff]/60 focus:bg-[#111] transition-all duration-200";
const textareaCls = `${inputCls} resize-none`;

const SaveBtn = ({ label, pending }: { label: string; pending?: boolean }) => (
    <button type="submit" disabled={pending}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-[13px] font-semibold rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-50 shadow-sm">
        {pending ? <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <Icon name="check" />}
        {label}
    </button>
);

const SectionCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
    <div className="bg-[#0d0d0f] border border-[#1e1e22] rounded-2xl overflow-hidden">
        <div className="px-7 py-5 border-b border-[#1e1e22] flex items-start justify-between">
            <div>
                <h3 className="text-[15px] font-semibold text-white">{title}</h3>
                {subtitle && <p className="text-[13px] text-gray-500 mt-0.5">{subtitle}</p>}
            </div>
        </div>
        <div className="px-7 py-6">{children}</div>
    </div>
);

// ─── Main Component ────────────────────────────────────────────────────────────
export default function AdminPage() {
    const [db, setDb] = useState<any>(null);
    const [activeTab, setActiveTab] = useState('hero');
    const [pending, startTransition] = useTransition();
    const [toast, setToast] = useState<string | null>(null);

    const refresh = () => fetch('/api/db').then(r => r.json()).then(setDb);

    useEffect(() => { refresh(); }, []);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 3000);
    };

    const wrap = (action: (f: FormData) => Promise<void>, label: string) => async (f: FormData) => {
        startTransition(async () => { await action(f); await refresh(); showToast(label); });
    };

    const wrapBound = (action: Function, label: string) => async () => {
        startTransition(async () => { await (action as any)(); await refresh(); showToast(label); });
    };

    if (!db) return (
        <div className="min-h-screen bg-[#08080a] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-[#00d2ff]/20 border-t-[#00d2ff] rounded-full animate-spin" />
                <p className="text-gray-500 text-sm font-medium tracking-wide">Chargement du tableau de bord…</p>
            </div>
        </div>
    );

    const { settings, blogs, hero, services, process, reach } = db;

    const nav = [
        { id: 'hero', label: 'Hero Section', badge: null },
        { id: 'services', label: 'Services', badge: services?.length },
        { id: 'process', label: 'Méthodologie', badge: null },
        { id: 'reach', label: 'Présence globale', badge: null },
        { id: 'blogs', label: 'Blog & Actualités', badge: blogs?.length },
        { id: 'contact', label: 'Informations', badge: null },
    ];

    const icons: Record<string, string> = {
        hero: 'hero', services: 'services', process: 'process',
        reach: 'reach', blogs: 'blogs', contact: 'contact',
    };

    return (
        <div className="min-h-screen bg-[#08080a] text-white flex" style={{ fontFamily: "'Inter', sans-serif" }}>

            {/* ── Toast ─────────────────────────────────────────────────── */}
            {toast && (
                <div className="fixed top-5 right-5 z-[999] bg-white text-black text-sm font-semibold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 animate-fade-in">
                    <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0"><Icon name="check" /></span>
                    {toast}
                </div>
            )}

            {/* ── Sidebar ───────────────────────────────────────────────── */}
            <aside className="w-[240px] shrink-0 flex flex-col border-r border-[#151518] bg-[#08080a] fixed top-0 left-0 h-full z-40">

                {/* Brand */}
                <div className="h-[60px] px-5 flex items-center border-b border-[#151518]">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#00d2ff] flex items-center justify-center shrink-0">
                            <span className="text-black text-xs font-black">N</span>
                        </div>
                        <div>
                            <p className="text-[13px] font-semibold text-white leading-none">Nexura IT</p>
                            <p className="text-[10px] text-gray-500 mt-0.5">Admin CMS</p>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                    <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-[0.12em] px-3 mb-2">Contenu du site</p>
                    {nav.map(item => (
                        <button key={item.id} onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-all text-[13px] font-medium group ${activeTab === item.id
                                ? 'bg-white/10 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}>
                            <span className="flex items-center gap-3">
                                <span className={activeTab === item.id ? 'text-[#00d2ff]' : 'text-gray-600 group-hover:text-gray-400'}>
                                    <Icon name={icons[item.id]} />
                                </span>
                                {item.label}
                            </span>
                            {item.badge !== null && item.badge !== undefined && (
                                <span className="text-[10px] bg-white/10 text-gray-400 px-1.5 py-0.5 rounded-md font-mono">{item.badge}</span>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Footer */}
                <div className="px-3 py-4 border-t border-[#151518]">
                    <a href="/" target="_blank"
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
                        <span className="text-gray-600 group-hover:text-gray-300"><Icon name="link" /></span>
                        Voir le site
                    </a>
                </div>
            </aside>

            {/* ── Main ──────────────────────────────────────────────────── */}
            <main className="flex-1 ml-[240px] flex flex-col">

                {/* Top bar */}
                <header className="h-[60px] border-b border-[#151518] flex items-center justify-between px-8 sticky top-0 bg-[#08080a] z-30">
                    <div>
                        <h1 className="text-[15px] font-semibold text-white">{nav.find(n => n.id === activeTab)?.label}</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        {pending && <span className="text-[12px] text-gray-500 flex items-center gap-1.5"><span className="w-3 h-3 border border-gray-600 border-t-white rounded-full animate-spin" />Enregistrement…</span>}
                        <div className="w-7 h-7 rounded-full bg-[#00d2ff] flex items-center justify-center text-black text-[11px] font-black">N</div>
                    </div>
                </header>

                {/* Page content */}
                <div className="flex-1 overflow-y-auto px-8 py-8">
                    <div className="max-w-[860px] mx-auto space-y-6">

                        {/* ── HERO ──────────────────────────────────── */}
                        {activeTab === 'hero' && (
                            <SectionCard title="Configuration du Hero" subtitle="Modifiez le texte principal de la page d'accueil">
                                <form action={updateHero as any} className="space-y-5">
                                    <Field label="Badge animé (petit texte en haut)">
                                        <input type="text" name="pillText" defaultValue={hero.pillText} className={inputCls} placeholder="Ex: IT Services & Solutions" />
                                    </Field>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Field label="Titre — Partie fixe">
                                            <input type="text" name="titlePrefix" defaultValue={hero.titlePrefix} className={inputCls} placeholder="Ex: Shape the" />
                                        </Field>
                                        <Field label="Titre — Mot en couleur">
                                            <input type="text" name="titleHighlight" defaultValue={hero.titleHighlight} className={inputCls} placeholder="Ex: Future." />
                                        </Field>
                                    </div>
                                    <Field label="Description principale">
                                        <textarea name="description" defaultValue={hero.description} className={`${textareaCls} h-32`} placeholder="Votre accroche principale…" />
                                    </Field>
                                    <div className="flex justify-end pt-2">
                                        <SaveBtn label="Sauvegarder le Hero" pending={pending} />
                                    </div>
                                </form>
                            </SectionCard>
                        )}

                        {/* ── SERVICES ──────────────────────────────── */}
                        {activeTab === 'services' && (<>
                            <SectionCard title="Services actuels" subtitle={`${services?.length ?? 0} service(s) affiché(s) sur le site`}>
                                {services?.length === 0
                                    ? <p className="text-gray-600 text-sm py-4 text-center">Aucun service. Ajoutez-en un ci-dessous.</p>
                                    : <div className="divide-y divide-[#1e1e22]">
                                        {services.map((s: any) => (
                                            <div key={s.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0 group">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-2xl w-10 h-10 bg-[#1a1a1e] rounded-xl flex items-center justify-center shrink-0">{s.icon}</span>
                                                    <div>
                                                        <p className="text-[14px] font-medium text-white">{s.title}</p>
                                                        <p className="text-[12px] text-gray-500 mt-0.5 line-clamp-1 max-w-[400px]">{s.description}</p>
                                                    </div>
                                                </div>
                                                <form action={deleteService.bind(null, s.id) as any}>
                                                    <button type="submit" className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center">
                                                        <Icon name="trash" />
                                                    </button>
                                                </form>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </SectionCard>

                            <SectionCard title="Ajouter un service" subtitle="Ce service apparaîtra immédiatement sur le site.">
                                <form action={addService as any} className="space-y-5">
                                    <div className="grid grid-cols-[80px_1fr] gap-4">
                                        <Field label="Icône">
                                            <input type="text" name="icon" className={inputCls} placeholder="☁️" />
                                        </Field>
                                        <Field label="Titre du service">
                                            <input type="text" name="title" className={inputCls} placeholder="Cloud Architecture" />
                                        </Field>
                                    </div>
                                    <Field label="Description">
                                        <textarea name="description" className={`${textareaCls} h-24`} placeholder="Décrivez brièvement ce service…" />
                                    </Field>
                                    <div className="flex justify-end">
                                        <button type="submit" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a1a1e] border border-[#2a2a2e] text-white text-[13px] font-semibold rounded-xl hover:bg-[#222226] transition-all">
                                            <Icon name="plus" /> Ajouter le service
                                        </button>
                                    </div>
                                </form>
                            </SectionCard>
                        </>)}

                        {/* ── PROCESS ───────────────────────────────── */}
                        {activeTab === 'process' && (
                            <div className="space-y-4">
                                {process?.map((p: any, idx: number) => (
                                    <SectionCard key={p.id} title={`Étape ${p.step}`} subtitle={p.title}>
                                        <form action={updateProcessStep.bind(null, idx) as any} className="space-y-5">
                                            <Field label="Titre de l'étape">
                                                <input type="text" name="title" defaultValue={p.title} className={inputCls} />
                                            </Field>
                                            <Field label="Description">
                                                <textarea name="description" defaultValue={p.description} className={`${textareaCls} h-28`} />
                                            </Field>
                                            <div className="flex justify-end">
                                                <SaveBtn label={`Mettre à jour Étape ${p.step}`} pending={pending} />
                                            </div>
                                        </form>
                                    </SectionCard>
                                ))}
                            </div>
                        )}

                        {/* ── REACH ─────────────────────────────────── */}
                        {activeTab === 'reach' && (
                            <SectionCard title="Présence internationale" subtitle="Section 'Globe' de la page d'accueil">
                                <form action={updateReach as any} className="space-y-5">
                                    <Field label="Sous-titre de section (badge)">
                                        <input type="text" name="pill" defaultValue={reach.pill} className={inputCls} />
                                    </Field>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Field label="Titre principal">
                                            <input type="text" name="title" defaultValue={reach.title} className={inputCls} />
                                        </Field>
                                        <Field label="Complément en gras">
                                            <input type="text" name="subtitle" defaultValue={reach.subtitle} className={inputCls} />
                                        </Field>
                                    </div>
                                    <Field label="Paragraphe descriptif">
                                        <textarea name="description" defaultValue={reach.description} className={`${textareaCls} h-32`} />
                                    </Field>
                                    <div className="flex justify-end">
                                        <SaveBtn label="Mettre à jour" pending={pending} />
                                    </div>
                                </form>
                            </SectionCard>
                        )}

                        {/* ── BLOGS ─────────────────────────────────── */}
                        {activeTab === 'blogs' && (<>
                            <SectionCard title="Rédiger un article" subtitle="L'article est publié immédiatement sur le site.">
                                <form action={addBlog as any} className="space-y-5">
                                    <Field label="Titre de l'article">
                                        <input type="text" name="title" className={inputCls} placeholder="Mon article…" />
                                    </Field>
                                    <Field label="Résumé (accroche)">
                                        <input type="text" name="excerpt" className={inputCls} placeholder="En quelques mots…" />
                                    </Field>
                                    <Field label="Contenu complet">
                                        <textarea name="content" className={`${textareaCls} h-48`} placeholder="Développez votre article ici…" />
                                    </Field>
                                    <div className="flex justify-end">
                                        <SaveBtn label="Publier l'article" pending={pending} />
                                    </div>
                                </form>
                            </SectionCard>

                            <SectionCard title="Articles publiés" subtitle={`${blogs?.length ?? 0} article(s)`}>
                                {blogs?.length === 0
                                    ? <p className="text-gray-600 text-sm py-4 text-center">Aucun article publié pour l'instant.</p>
                                    : <div className="divide-y divide-[#1e1e22]">
                                        {blogs.map((b: any) => (
                                            <div key={b.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0 group">
                                                <div>
                                                    <p className="text-[14px] font-medium text-white">{b.title}</p>
                                                    <p className="text-[12px] text-gray-500 mt-0.5">{b.date} — {b.excerpt || b.content.slice(0, 60) + '…'}</p>
                                                </div>
                                                <form action={deleteBlog.bind(null, b.id) as any}>
                                                    <button type="submit" className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center">
                                                        <Icon name="trash" />
                                                    </button>
                                                </form>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </SectionCard>
                        </>)}

                        {/* ── CONTACT ───────────────────────────────── */}
                        {activeTab === 'contact' && (
                            <SectionCard title="Informations de contact" subtitle="Affiché dans le footer du site">
                                <form action={updateSettings as any} className="space-y-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <Field label="Téléphone">
                                            <input type="tel" name="telephone" defaultValue={settings.telephone} className={inputCls} placeholder="+33 1 23 45 67 89" />
                                        </Field>
                                        <Field label="Adresse email">
                                            <input type="email" name="email" defaultValue={settings.email} className={inputCls} placeholder="contact@nexura.it" />
                                        </Field>
                                    </div>
                                    <Field label="Adresse postale">
                                        <input type="text" name="address" defaultValue={settings.address} className={inputCls} placeholder="123 Avenue…" />
                                    </Field>
                                    <div className="flex justify-end pt-2">
                                        <SaveBtn label="Enregistrer" pending={pending} />
                                    </div>
                                </form>
                            </SectionCard>
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
}
