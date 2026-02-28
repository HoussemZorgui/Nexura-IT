'use client';

import { useState, useEffect, useTransition, ReactNode } from 'react';
import {
    updateSettings, addBlog, deleteBlog, updateHero,
    addService, deleteService, updateProcessStep, updateReach
} from '../actions';
import { logoutAdmin } from './auth';

// ─── Icons ─────────────────────────────────────────────────────────────────────
const icons: Record<string, ReactNode> = {
    hero: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]"><path strokeLinecap="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    services: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]"><path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h7" /></svg>,
    process: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]"><path strokeLinecap="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
    reach: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]"><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 010 18M12 3a15.3 15.3 0 000 18" /></svg>,
    blogs: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]"><path strokeLinecap="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
    contact: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]"><path strokeLinecap="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    trash: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path strokeLinecap="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" d="M12 5v14M5 12h14" /></svg>,
    check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5"><path strokeLinecap="round" d="M5 13l4 4L19 7" /></svg>,
    link: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]"><path strokeLinecap="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
    logout: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]"><path strokeLinecap="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
};
const Icon = ({ name }: { name: string }) => <>{icons[name] ?? null}</>;

// ─── Reusable UI ─────────────────────────────────────────────────────────────
const inputCls = "w-full bg-[#111113] border border-[#252528] rounded-xl px-4 py-3 text-[14px] text-white placeholder-gray-600 focus:outline-none focus:border-[#00d2ff]/50 transition-all duration-200 leading-relaxed";
const textareaCls = `${inputCls} resize-none`;

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
    return (
        <div>
            <div className="flex items-baseline justify-between mb-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.1em]">{label}</label>
                {hint && <span className="text-[11px] text-gray-600">{hint}</span>}
            </div>
            {children}
        </div>
    );
}

function Card({ title, subtitle, children, action }: { title: string; subtitle?: string; children: ReactNode; action?: ReactNode }) {
    return (
        <div className="rounded-2xl border border-[#1a1a1e] overflow-hidden">
            <div className="flex items-start justify-between px-6 py-4 border-b border-[#1a1a1e] bg-[#0d0d10]">
                <div>
                    <h2 className="text-[14px] font-semibold text-white">{title}</h2>
                    {subtitle && <p className="text-[12px] text-gray-500 mt-0.5 leading-relaxed">{subtitle}</p>}
                </div>
                {action}
            </div>
            <div className="bg-[#09090c] px-6 py-6">{children}</div>
        </div>
    );
}

function SaveBtn({ label = "Sauvegarder", pending }: { label?: string; pending?: boolean }) {
    return (
        <button type="submit" disabled={pending}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-black text-[13px] font-semibold rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-40 shadow-sm">
            {pending
                ? <span className="w-3.5 h-3.5 border-2 border-black/25 border-t-black rounded-full animate-spin" />
                : <Icon name="check" />}
            {label}
        </button>
    );
}

function Toast({ message }: { message: string }) {
    return (
        <div className="fixed top-5 right-5 z-[9999] flex items-center gap-3 bg-white text-black text-[13px] font-semibold px-4 py-3 rounded-2xl shadow-2xl animate-fade-in">
            <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                <Icon name="check" />
            </span>
            {message}
        </div>
    );
}

// ─── Nav Config ──────────────────────────────────────────────────────────────
const NAV = [
    { id: 'hero', label: 'Hero Section', badgeKey: null },
    { id: 'services', label: 'Services', badgeKey: 'services' },
    { id: 'process', label: 'Méthodologie', badgeKey: null },
    { id: 'reach', label: 'Présence globale', badgeKey: null },
    { id: 'blogs', label: 'Blog & Actualités', badgeKey: 'blogs' },
    { id: 'contact', label: 'Coordonnées', badgeKey: null },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AdminPage() {
    const [db, setDb] = useState<any>(null);
    const [tab, setTab] = useState('hero');
    const [pending, start] = useTransition();
    const [toast, setToast] = useState<string | null>(null);

    const refresh = () => fetch('/api/db').then(r => r.json()).then(setDb);
    useEffect(() => { refresh(); }, []);

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

    /** Wrap a server action so we refresh data + show a toast after it runs */
    const act = (action: (f: FormData) => Promise<void>, msg: string) =>
        (f: FormData) => start(async () => { await action(f); await refresh(); showToast(msg); });

    const actBound = (action: () => Promise<void>, msg: string) =>
        () => start(async () => { await action(); await refresh(); showToast(msg); });

    // Loading
    if (!db) return (
        <div className="min-h-screen bg-[#08080a] flex flex-col items-center justify-center gap-4" style={{ fontFamily: "'Inter', sans-serif" }}>
            <div className="w-9 h-9 border-2 border-[#00d2ff]/20 border-t-[#00d2ff] rounded-full animate-spin" />
            <p className="text-[13px] text-gray-600">Chargement…</p>
        </div>
    );

    const { settings, blogs, hero, services, process, reach } = db;

    return (
        <div className="min-h-screen bg-[#08080a] text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
            {toast && <Toast message={toast} />}

            {/* ── SIDEBAR ─────────────────────────────────────────────── */}
            <aside
                style={{ width: 240, position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 50 }}
                className="bg-[#08080a] border-r border-[#141417] flex flex-col"
            >
                {/* Brand */}
                <div className="h-16 flex items-center px-5 border-b border-[#141417] shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#00d2ff] flex items-center justify-center shrink-0">
                            <span className="text-black text-xs font-black">N</span>
                        </div>
                        <div className="leading-tight">
                            <p className="text-[13px] font-semibold text-white">Nexura IT</p>
                            <p className="text-[10px] text-gray-500">Admin CMS</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.12em] px-3 mb-3">
                        Contenu du site
                    </p>
                    {NAV.map(item => {
                        const badge = item.badgeKey ? (db[item.badgeKey]?.length ?? 0) : null;
                        const active = tab === item.id;
                        return (
                            <button key={item.id} onClick={() => setTab(item.id)}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all group ${active ? 'bg-white/[0.08] text-white' : 'text-gray-500 hover:text-white hover:bg-white/[0.04]'
                                    }`}
                            >
                                <span className="flex items-center gap-3">
                                    <span className={active ? 'text-[#00d2ff]' : 'text-gray-600 group-hover:text-gray-400 transition-colors'}>
                                        <Icon name={item.id} />
                                    </span>
                                    {item.label}
                                </span>
                                {badge !== null && (
                                    <span className="text-[10px] font-mono text-gray-600 bg-white/[0.06] px-1.5 py-0.5 rounded-md">{badge}</span>
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Bottom actions */}
                <div className="px-3 py-4 border-t border-[#141417] space-y-1 shrink-0">
                    <a href="/" target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-gray-500 hover:text-white hover:bg-white/[0.04] transition-all group">
                        <span className="text-gray-600 group-hover:text-gray-400 transition-colors"><Icon name="link" /></span>
                        Voir le site
                    </a>
                    <form action={logoutAdmin}>
                        <button type="submit"
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-gray-500 hover:text-red-400 hover:bg-red-500/[0.06] transition-all group text-left">
                            <span className="text-gray-600 group-hover:text-red-400 transition-colors"><Icon name="logout" /></span>
                            Se déconnecter
                        </button>
                    </form>
                </div>
            </aside>

            {/* ── MAIN CONTENT ────────────────────────────────────────── */}
            <div style={{ marginLeft: 240, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

                {/* Top bar */}
                <header
                    style={{ position: 'sticky', top: 0, zIndex: 40, height: 64 }}
                    className="bg-[#08080a] border-b border-[#141417] flex items-center justify-between px-8 shrink-0"
                >
                    <div className="flex items-center gap-3">
                        <h1 className="text-[15px] font-semibold text-white">
                            {NAV.find(n => n.id === tab)?.label}
                        </h1>
                        {pending && (
                            <span className="flex items-center gap-1.5 text-[12px] text-gray-500">
                                <span className="w-3 h-3 border-2 border-gray-700 border-t-gray-400 rounded-full animate-spin" />
                                Enregistrement…
                            </span>
                        )}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#1a1a1e] border border-[#252528] flex items-center justify-center">
                        <span className="text-[11px] font-bold text-[#00d2ff]">N</span>
                    </div>
                </header>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto px-8 py-8">
                    <div style={{ maxWidth: 780, margin: '0 auto' }} className="space-y-5">

                        {/* ── HERO ── */}
                        {tab === 'hero' && (
                            <Card title="Configuration du Hero" subtitle="Texte affiché en pleine page sur l'écran d'accueil">
                                <form action={act(updateHero, 'Hero mis à jour ✓')} className="space-y-5">
                                    <Field label="Texte du badge animé" hint="Petite pilule en haut du titre">
                                        <input type="text" name="pillText" defaultValue={hero.pillText} className={inputCls} placeholder="Ex: IT Services & Solutions" />
                                    </Field>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Field label="Titre — texte fixe">
                                            <input type="text" name="titlePrefix" defaultValue={hero.titlePrefix} className={inputCls} placeholder="Shape the" />
                                        </Field>
                                        <Field label="Titre — mot en dégradé">
                                            <input type="text" name="titleHighlight" defaultValue={hero.titleHighlight} className={inputCls} placeholder="Future." />
                                        </Field>
                                    </div>
                                    <Field label="Description principale" hint="Accroche sous le titre">
                                        <textarea name="description" defaultValue={hero.description} rows={4} className={textareaCls} />
                                    </Field>
                                    <div className="flex justify-end pt-2 border-t border-[#1a1a1e]">
                                        <SaveBtn label="Sauvegarder le Hero" pending={pending} />
                                    </div>
                                </form>
                            </Card>
                        )}

                        {/* ── SERVICES ── */}
                        {tab === 'services' && (<>
                            <Card
                                title="Services publiés"
                                subtitle={`${services?.length ?? 0} service(s) visible(s) sur le site`}
                            >
                                {!services?.length
                                    ? <p className="text-[13px] text-gray-600 text-center py-8">Aucun service pour l'instant.</p>
                                    : <div className="divide-y divide-[#111115]">
                                        {services.map((s: any) => (
                                            <div key={s.id} className="flex items-center justify-between py-4 group first:pt-0 last:pb-0">
                                                <div className="flex items-center gap-4 min-w-0">
                                                    <span className="w-10 h-10 rounded-xl bg-[#111115] flex items-center justify-center text-xl shrink-0">
                                                        {s.icon}
                                                    </span>
                                                    <div className="min-w-0">
                                                        <p className="text-[14px] font-medium text-white truncate">{s.title}</p>
                                                        <p className="text-[12px] text-gray-500 mt-0.5 truncate max-w-[400px]">{s.description}</p>
                                                    </div>
                                                </div>
                                                <form action={actBound(deleteService.bind(null, s.id), 'Service supprimé')}>
                                                    <button type="submit"
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity ml-4 w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-500/10">
                                                        <Icon name="trash" />
                                                    </button>
                                                </form>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </Card>

                            <Card title="Ajouter un service" subtitle="Apparaîtra immédiatement sur le site public.">
                                <form action={act(addService, 'Service ajouté ✓')} className="space-y-4">
                                    <div className="grid grid-cols-[90px_1fr] gap-4">
                                        <Field label="Emoji">
                                            <input type="text" name="icon" className={inputCls} placeholder="☁️" />
                                        </Field>
                                        <Field label="Nom du service">
                                            <input type="text" name="title" className={inputCls} placeholder="Cloud Architecture" required />
                                        </Field>
                                    </div>
                                    <Field label="Description courte">
                                        <textarea name="description" rows={3} className={textareaCls} placeholder="Décrivez ce service en 1-2 phrases…" />
                                    </Field>
                                    <div className="flex justify-end pt-2 border-t border-[#1a1a1e]">
                                        <button type="submit"
                                            className="inline-flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium text-white rounded-xl bg-[#1a1a1e] border border-[#252528] hover:bg-[#222228] transition-all">
                                            <Icon name="plus" /> Ajouter
                                        </button>
                                    </div>
                                </form>
                            </Card>
                        </>)}

                        {/* ── PROCESS ── */}
                        {tab === 'process' && (
                            <div className="space-y-5">
                                {process?.map((p: any, idx: number) => (
                                    <Card key={p.id}
                                        title={`Étape ${p.step} — ${p.title}`}
                                        subtitle="Modifiez le titre et la description de cette étape de votre méthodologie">
                                        <form action={act(updateProcessStep.bind(null, idx), `Étape ${p.step} mise à jour ✓`)} className="space-y-4">
                                            <Field label="Titre de l'étape">
                                                <input type="text" name="title" defaultValue={p.title} className={inputCls} />
                                            </Field>
                                            <Field label="Description">
                                                <textarea name="description" defaultValue={p.description} rows={4} className={textareaCls} />
                                            </Field>
                                            <div className="flex justify-end pt-2 border-t border-[#1a1a1e]">
                                                <SaveBtn label={`Mettre à jour Étape ${p.step}`} pending={pending} />
                                            </div>
                                        </form>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {/* ── REACH ── */}
                        {tab === 'reach' && (
                            <Card title="Section Présence Internationale" subtitle="Modifiez les textes de la section avec le globe animé">
                                <form action={act(updateReach, 'Section internationale mise à jour ✓')} className="space-y-5">
                                    <Field label="Étiquette de section (badge)">
                                        <input type="text" name="pill" defaultValue={reach.pill} className={inputCls} />
                                    </Field>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Field label="Titre principal">
                                            <input type="text" name="title" defaultValue={reach.title} className={inputCls} />
                                        </Field>
                                        <Field label="Suite du titre (en gras)">
                                            <input type="text" name="subtitle" defaultValue={reach.subtitle} className={inputCls} />
                                        </Field>
                                    </div>
                                    <Field label="Paragraphe descriptif">
                                        <textarea name="description" defaultValue={reach.description} rows={4} className={textareaCls} />
                                    </Field>
                                    <div className="flex justify-end pt-2 border-t border-[#1a1a1e]">
                                        <SaveBtn label="Mettre à jour" pending={pending} />
                                    </div>
                                </form>
                            </Card>
                        )}

                        {/* ── BLOGS ── */}
                        {tab === 'blogs' && (<>
                            <Card title="Rédiger un article" subtitle="L'article sera publié immédiatement sur le site public">
                                <form action={act(addBlog, 'Article publié ✓')} className="space-y-4">
                                    <Field label="Titre">
                                        <input type="text" name="title" className={inputCls} placeholder="Mon article…" required />
                                    </Field>
                                    <Field label="Résumé" hint="Affiché sous le titre">
                                        <input type="text" name="excerpt" className={inputCls} placeholder="En quelques mots…" />
                                    </Field>
                                    <Field label="Contenu complet">
                                        <textarea name="content" rows={8} className={textareaCls} placeholder="Développez votre article ici…" required />
                                    </Field>
                                    <div className="flex justify-end pt-2 border-t border-[#1a1a1e]">
                                        <SaveBtn label="Publier l'article" pending={pending} />
                                    </div>
                                </form>
                            </Card>

                            <Card title="Articles en ligne" subtitle={`${blogs?.length ?? 0} article(s) publié(s)`}>
                                {!blogs?.length
                                    ? <p className="text-[13px] text-gray-600 text-center py-8">Aucun article pour l'instant.</p>
                                    : <div className="divide-y divide-[#111115]">
                                        {blogs.map((b: any) => (
                                            <div key={b.id} className="flex items-center justify-between py-4 group first:pt-0 last:pb-0">
                                                <div className="min-w-0 mr-4">
                                                    <p className="text-[14px] font-medium text-white truncate">{b.title}</p>
                                                    <p className="text-[12px] text-gray-500 mt-0.5">
                                                        {b.date} — {(b.excerpt || b.content.slice(0, 80)).slice(0, 80)}{(b.excerpt || b.content).length > 80 ? '…' : ''}
                                                    </p>
                                                </div>
                                                <form action={actBound(deleteBlog.bind(null, b.id), 'Article supprimé')}>
                                                    <button type="submit"
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-500/10">
                                                        <Icon name="trash" />
                                                    </button>
                                                </form>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </Card>
                        </>)}

                        {/* ── CONTACT ── */}
                        {tab === 'contact' && (
                            <Card title="Informations de contact" subtitle="Ces données s'affichent dans le footer du site public">
                                <form action={act(updateSettings, 'Coordonnées sauvegardées ✓')} className="space-y-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <Field label="Téléphone">
                                            <input type="tel" name="telephone" defaultValue={settings.telephone} className={inputCls} placeholder="+33 1 23 45 67 89" />
                                        </Field>
                                        <Field label="Email">
                                            <input type="email" name="email" defaultValue={settings.email} className={inputCls} placeholder="contact@nexura.it" />
                                        </Field>
                                    </div>
                                    <Field label="Adresse postale">
                                        <input type="text" name="address" defaultValue={settings.address} className={inputCls} />
                                    </Field>
                                    <div className="flex justify-end pt-2 border-t border-[#1a1a1e]">
                                        <SaveBtn label="Enregistrer" pending={pending} />
                                    </div>
                                </form>
                            </Card>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
