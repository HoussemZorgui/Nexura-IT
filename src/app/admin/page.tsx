'use client';

import { useState, useEffect, useTransition, ReactNode } from 'react';
import {
    updateSettings, updateHero,
    addService, deleteService,
    addMetric, deleteMetric,
    addTech, deleteTech,
    addClient, deleteClient,
    addTestimonial, deleteTestimonial,
    updateCta,
    updateProcessStep,
    updateReach,
    addBlog, deleteBlog,
} from '../actions';
import { logoutAdmin } from './auth';

/* ─── DESIGN TOKENS ─────────────────────────────────────────── */
const BG = '#0a0a0f';
const SURFACE = '#111118';
const BORDER = '#1f1f2e';
const ACCENT = '#00d2ff';

/* ─── ICONS ─────────────────────────────────────────────────── */
const Ico = {
    hero: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5"><path strokeLinecap="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    services: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
    metrics: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5"><path strokeLinecap="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    tech: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5"><path strokeLinecap="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    testi: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5"><path strokeLinecap="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    cta: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5"><path strokeLinecap="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
    process: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5"><path strokeLinecap="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
    reach: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5"><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M3.6 9h16.8M3.6 15h16.8M12 3c-3 4-3 14 0 18M12 3c3 4 3 14 0 18" /></svg>,
    blogs: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5"><path strokeLinecap="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    contact: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5"><path strokeLinecap="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    trash: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-4 h-4"><path strokeLinecap="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    plus: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><path strokeLinecap="round" d="M12 5v14M5 12h14" /></svg>,
    check: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4"><path strokeLinecap="round" d="M5 13l4 4L19 7" /></svg>,
    logout: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5"><path strokeLinecap="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
    link: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5"><path strokeLinecap="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
};

/* ─── STYLED PRIMITIVES ──────────────────────────────────────── */
const inputS: React.CSSProperties = {
    width: '100%', background: '#0d0d14', border: `1px solid ${BORDER}`,
    borderRadius: 12, padding: '13px 16px', fontSize: 15, color: '#fff',
    outline: 'none', fontFamily: 'Inter, sans-serif', lineHeight: 1.5, transition: 'border-color .2s',
};

function Input({ focus, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { focus?: boolean }) {
    const [f, setF] = useState(false);
    return <input {...props} onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ ...inputS, borderColor: f ? ACCENT : BORDER, ...props.style }} />;
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    const [f, setF] = useState(false);
    return <textarea {...props} onFocus={() => setF(true)} onBlur={() => setF(false)}
        style={{ ...inputS, resize: 'vertical', minHeight: 110, borderColor: f ? ACCENT : BORDER, ...props.style }} />;
}

function Lbl({ children, hint }: { children: ReactNode; hint?: string }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: '#7070a0', letterSpacing: '.08em', textTransform: 'uppercase' }}>{children}</label>
            {hint && <span style={{ fontSize: 11, color: '#444460' }}>{hint}</span>}
        </div>
    );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
    return <div><Lbl hint={hint}>{label}</Lbl>{children}</div>;
}

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
    return (
        <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden', marginBottom: 24 }}>
            <div style={{ padding: '20px 28px', borderBottom: `1px solid ${BORDER}` }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: 0, fontFamily: 'Outfit, sans-serif' }}>{title}</h3>
                {subtitle && <p style={{ fontSize: 13, color: '#666680', margin: '4px 0 0', lineHeight: 1.5 }}>{subtitle}</p>}
            </div>
            <div style={{ padding: 28 }}>{children}</div>
        </div>
    );
}

function SaveBtn({ label = 'Sauvegarder', pending }: { label?: string; pending?: boolean }) {
    return (
        <button type="submit" disabled={pending} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '11px 22px', background: '#fff', color: '#000',
            fontSize: 14, fontWeight: 700, borderRadius: 12, border: 'none',
            cursor: pending ? 'wait' : 'pointer', opacity: pending ? .5 : 1, fontFamily: 'Inter, sans-serif',
        }}>
            {pending ? <span style={{ width: 15, height: 15, border: '2px solid #bbb', borderTopColor: '#000', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }} /> : Ico.check}
            {label}
        </button>
    );
}

function TrashBtn({ pending }: { pending?: boolean }) {
    const [hov, setHov] = useState(false);
    return (
        <button type="submit" disabled={pending} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{ width: 34, height: 34, borderRadius: 9, border: '1px solid #2a1a1a', background: hov ? '#7f1d1d' : '#1a0a0a', color: hov ? '#fff' : '#c04040', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s', opacity: pending ? .5 : 1, flexShrink: 0 }}>
            {Ico.trash}
        </button>
    );
}

function AddBtn({ label, pending }: { label: string; pending?: boolean }) {
    const [hov, setHov] = useState(false);
    return (
        <button type="submit" disabled={pending} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', fontSize: 14, fontWeight: 600, borderRadius: 12, border: `1px solid ${hov ? ACCENT : BORDER}`, background: 'transparent', color: hov ? ACCENT : '#ccc', cursor: 'pointer', transition: 'all .2s', fontFamily: 'Inter, sans-serif' }}>
            {Ico.plus} {label}
        </button>
    );
}

function HR() {
    return <div style={{ height: 1, background: BORDER, margin: '22px 0' }} />;
}

function Toast({ msg }: { msg: string }) {
    return (
        <div style={{ position: 'fixed', top: 22, right: 22, zIndex: 9999, background: '#fff', color: '#000', padding: '13px 20px', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, fontWeight: 700, boxShadow: '0 20px 60px rgba(0,0,0,.6)', animation: 'fadeDown .3s ease', fontFamily: 'Inter, sans-serif' }}>
            <span style={{ width: 22, height: 22, background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>{Ico.check}</span>
            {msg}
        </div>
    );
}

/* ─── NAV CONFIG ─────────────────────────────────────────────── */
const NAV = [
    { id: 'hero', label: 'Hero', icon: Ico.hero, key: null },
    { id: 'metrics', label: 'Statistiques', icon: Ico.metrics, key: 'metrics' },
    { id: 'services', label: 'Services', icon: Ico.services, key: 'services' },
    { id: 'tech', label: 'Technologies', icon: Ico.tech, key: 'techStack' },
    { id: 'process', label: 'Méthodologie', icon: Ico.process, key: null },
    { id: 'reach', label: 'Présence globale', icon: Ico.reach, key: null },
    { id: 'clients', label: 'Clients & Logos', icon: Ico.testi, key: 'clients' },
    { id: 'testi', label: 'Témoignages', icon: Ico.testi, key: 'testimonials' },
    { id: 'cta', label: 'Appel à l\'action', icon: Ico.cta, key: null },
    { id: 'blogs', label: 'Blog', icon: Ico.blogs, key: 'blogs' },
    { id: 'contact', label: 'Coordonnées', icon: Ico.contact, key: null },
];

/* ─── MAIN ───────────────────────────────────────────────────── */
export default function AdminPage() {
    const [db, setDb] = useState<any>(null);
    const [tab, setTab] = useState('hero');
    const [pend, start] = useTransition();
    const [toast, setToast] = useState<string | null>(null);

    const refresh = () => fetch('/api/db').then(r => r.json()).then(setDb);
    useEffect(() => { refresh(); }, []);

    const notify = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };
    const run = (fn: (f: FormData) => Promise<void>, msg: string) => (f: FormData) =>
        start(async () => { await fn(f); await refresh(); notify(msg); });
    const runVoid = (fn: () => Promise<void>, msg: string) => () =>
        start(async () => { await fn(); await refresh(); notify(msg); });

    const W = 258, H = 64;

    if (!db) return (
        <div style={{ minHeight: '100vh', background: BG, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, fontFamily: 'Inter, sans-serif' }}>
            <div style={{ width: 38, height: 38, border: `2.5px solid ${BORDER}`, borderTopColor: ACCENT, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: '#555570', fontSize: 14 }}>Chargement du tableau de bord…</p>
        </div>
    );

    const { settings, blogs, hero, services, metrics, techStack, clients, testimonials, cta, process, reach } = db;

    return (
        <div style={{ minHeight: '100vh', background: BG, display: 'flex', fontFamily: 'Inter, sans-serif' }}>
            {toast && <Toast msg={toast} />}

            {/* ── SIDEBAR ─────────────────────────────── */}
            <aside style={{ width: W, position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, background: '#08080d', borderRight: `1px solid ${BORDER}`, display: 'flex', flexDirection: 'column' }}>

                {/* Brand */}
                <div style={{ height: H, display: 'flex', alignItems: 'center', padding: '0 20px', borderBottom: `1px solid ${BORDER}`, gap: 12, flexShrink: 0 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ color: '#000', fontWeight: 900, fontSize: 14, fontFamily: 'Outfit, sans-serif' }}>N</span>
                    </div>
                    <div>
                        <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', margin: 0, fontFamily: 'Outfit, sans-serif' }}>Nexura IT</p>
                        <p style={{ fontSize: 11, color: '#444460', margin: 0 }}>Admin CMS</p>
                    </div>
                </div>

                {/* Nav */}
                <nav style={{ flex: 1, padding: '16px 10px', overflowY: 'auto' }}>
                    <p style={{ fontSize: 10, fontWeight: 800, color: '#333350', letterSpacing: '.14em', textTransform: 'uppercase', padding: '0 10px', marginBottom: 10 }}>
                        Sections du site
                    </p>
                    {NAV.map(item => {
                        const active = tab === item.id;
                        const count = item.key && Array.isArray(db[item.key]) ? (db[item.key] as any[]).length : null;
                        return (
                            <button key={item.id} onClick={() => setTab(item.id)} style={{
                                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                gap: 10, padding: '10px 12px', borderRadius: 10, border: 'none',
                                background: active ? `rgba(0,210,255,.1)` : 'transparent',
                                color: active ? ACCENT : '#65658a',
                                fontSize: 13, fontWeight: active ? 600 : 500,
                                cursor: 'pointer', marginBottom: 2, transition: 'all .15s',
                                textAlign: 'left', fontFamily: 'Inter, sans-serif',
                            }}
                                onMouseEnter={e => { if (!active) { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'rgba(255,255,255,.04)'; b.style.color = '#ccc'; } }}
                                onMouseLeave={e => { if (!active) { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'transparent'; b.style.color = '#65658a'; } }}
                            >
                                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>{item.icon}{item.label}</span>
                                {count !== null && (
                                    <span style={{ background: 'rgba(255,255,255,.06)', color: '#555570', fontSize: 11, padding: '1px 7px', borderRadius: 7, fontWeight: 700 }}>{count}</span>
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div style={{ padding: '12px 10px', borderTop: `1px solid ${BORDER}`, flexShrink: 0 }}>
                    {[
                        { href: '/', label: 'Voir le site', icon: Ico.link, red: false },
                    ].map(item => (
                        <a key={item.href} href={item.href} target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, color: '#65658a', fontSize: 13, fontWeight: 500, textDecoration: 'none', transition: 'all .15s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,.04)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#65658a'; (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}>
                            {item.icon}{item.label}
                        </a>
                    ))}
                    <form action={logoutAdmin}>
                        <button type="submit" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, border: 'none', background: 'transparent', color: '#65658a', fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all .15s', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}
                            onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'rgba(239,68,68,.08)'; b.style.color = '#f87171'; }}
                            onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'transparent'; b.style.color = '#65658a'; }}>
                            {Ico.logout} Se déconnecter
                        </button>
                    </form>
                </div>
            </aside>

            {/* ── MAIN ────────────────────────────────────── */}
            <div style={{ marginLeft: W, flex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

                {/* Topbar */}
                <header style={{ height: H, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 36px', borderBottom: `1px solid ${BORDER}`, background: '#08080d', position: 'sticky', top: 0, zIndex: 50, flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <h1 style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: 0, fontFamily: 'Outfit, sans-serif' }}>
                            {NAV.find(n => n.id === tab)?.label}
                        </h1>
                        {pend && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: '#555570' }}>
                                <span style={{ width: 13, height: 13, border: `2px solid ${BORDER}`, borderTopColor: ACCENT, borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }} />
                                Enregistrement…
                            </span>
                        )}
                    </div>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: `rgba(0,210,255,.12)`, border: `1px solid rgba(0,210,255,.25)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 12, fontWeight: 900, color: ACCENT, fontFamily: 'Outfit, sans-serif' }}>N</span>
                    </div>
                </header>

                {/* Content */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '36px', paddingBottom: 80 }}>
                    <div style={{ maxWidth: 800, margin: '0 auto' }}>

                        {/* ─── HERO ──────────── */}
                        {tab === 'hero' && (
                            <Card title="Section Hero" subtitle="Contenu principal affiché en pleine page sur l'accueil">
                                <form action={run(updateHero, 'Hero mis à jour ✓')} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                                    <Field label="Texte du badge animé" hint="Petite pilule pulsante"><Input name="pillText" defaultValue={hero.pillText} placeholder="IT Services & Solutions" /></Field>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                        <Field label="Titre — partie fixe"><Input name="titlePrefix" defaultValue={hero.titlePrefix} placeholder="Shape the" /></Field>
                                        <Field label="Titre — mot en dégradé"><Input name="titleHighlight" defaultValue={hero.titleHighlight} placeholder="Future." /></Field>
                                    </div>
                                    <Field label="Description" hint="Accroche sous le titre"><Textarea name="description" defaultValue={hero.description} style={{ minHeight: 120 }} /></Field>
                                    <HR /><div style={{ display: 'flex', justifyContent: 'flex-end' }}><SaveBtn label="Sauvegarder le Hero" pending={pend} /></div>
                                </form>
                            </Card>
                        )}

                        {/* ─── METRICS ──────────── */}
                        {tab === 'metrics' && (<>
                            <Card title="Statistiques clés" subtitle={`${metrics?.length ?? 0} chiffres affichés sur le site`}>
                                {!metrics?.length
                                    ? <p style={{ color: '#555570', textAlign: 'center', padding: '32px 0', fontSize: 14 }}>Aucune statistique pour l'instant.</p>
                                    : <div>{metrics.map((m: any, i: number) => (
                                        <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: i < metrics.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
                                            <div>
                                                <p style={{ fontSize: 28, fontWeight: 900, color: '#fff', margin: 0, fontFamily: 'Outfit, sans-serif' }}>{m.value}</p>
                                                <p style={{ fontSize: 12, color: '#666680', margin: '3px 0 0', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>{m.label}</p>
                                            </div>
                                            <form action={runVoid(deleteMetric.bind(null, m.id), 'Statistique supprimée')}><TrashBtn pending={pend} /></form>
                                        </div>
                                    ))}</div>
                                }
                            </Card>
                            <Card title="Ajouter une statistique" subtitle="Chiffre clé affiché en grand sur la page d'accueil">
                                <form action={run(addMetric, 'Statistique ajoutée ✓')} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 14 }}>
                                        <Field label="Valeur" hint="Ex: 99.9%"><Input name="value" placeholder="99.9%" required /></Field>
                                        <Field label="Libellé"><Input name="label" placeholder="Uptime Garanti" required /></Field>
                                    </div>
                                    <HR /><div style={{ display: 'flex', justifyContent: 'flex-end' }}><AddBtn label="Ajouter" pending={pend} /></div>
                                </form>
                            </Card>
                        </>)}

                        {/* ─── SERVICES ──────────── */}
                        {tab === 'services' && (<>
                            <Card title="Services publiés" subtitle={`${services?.length ?? 0} service(s) visible(s)`}>
                                {!services?.length
                                    ? <p style={{ color: '#555570', textAlign: 'center', padding: '32px 0', fontSize: 14 }}>Aucun service.</p>
                                    : <div>{services.map((s: any, i: number) => (
                                        <div key={s.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: i < services.length - 1 ? `1px solid ${BORDER}` : 'none', gap: 16 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                                <span style={{ width: 46, height: 46, background: '#0d0d14', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{s.icon}</span>
                                                <div>
                                                    <p style={{ fontSize: 15, fontWeight: 600, color: '#fff', margin: 0 }}>{s.title}</p>
                                                    <p style={{ fontSize: 12, color: '#555570', margin: '3px 0 0', maxWidth: 450 }}>{s.description}</p>
                                                </div>
                                            </div>
                                            <form action={runVoid(deleteService.bind(null, s.id), 'Service supprimé')}><TrashBtn pending={pend} /></form>
                                        </div>
                                    ))}</div>
                                }
                            </Card>
                            <Card title="Ajouter un service">
                                <form action={run(addService, 'Service ajouté ✓')} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 14 }}>
                                        <Field label="Emoji"><Input name="icon" placeholder="☁️" /></Field>
                                        <Field label="Nom du service"><Input name="title" placeholder="Cloud Architecture" required /></Field>
                                    </div>
                                    <Field label="Description"><Textarea name="description" placeholder="Description…" style={{ minHeight: 90 }} /></Field>
                                    <HR /><div style={{ display: 'flex', justifyContent: 'flex-end' }}><AddBtn label="Ajouter le service" pending={pend} /></div>
                                </form>
                            </Card>
                        </>)}

                        {/* ─── TECH STACK ──────────── */}
                        {tab === 'tech' && (<>
                            <Card title="Technologies affichées" subtitle={`${techStack?.length ?? 0} technologie(s)`}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                                    {techStack?.map((t: any) => (
                                        <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: '#0d0d14', border: `1px solid ${BORDER}`, borderRadius: 100 }}>
                                            <span style={{ fontSize: 13, fontWeight: 500, color: '#ccc' }}>{t.name}</span>
                                            <form action={runVoid(deleteTech.bind(null, t.id), 'Techno supprimée')}>
                                                <button type="submit" style={{ display: 'flex', background: 'none', border: 'none', color: '#555570', cursor: 'pointer', padding: 0, fontSize: 16, lineHeight: 1 }} title="Supprimer">×</button>
                                            </form>
                                        </div>
                                    ))}
                                    {!techStack?.length && <p style={{ color: '#555570', fontSize: 14 }}>Aucune technologie.</p>}
                                </div>
                            </Card>
                            <Card title="Ajouter une technologie">
                                <form action={run(addTech, 'Technologie ajoutée ✓')} style={{ display: 'flex', gap: 12 }}>
                                    <Input name="name" placeholder="React, Docker, AWS…" required style={{ flex: 1 }} />
                                    <AddBtn label="Ajouter" pending={pend} />
                                </form>
                            </Card>
                        </>)}

                        {/* ─── PROCESS ──────────── */}
                        {tab === 'process' && (
                            process?.map((p: any, idx: number) => (
                                <Card key={p.id} title={`Étape ${p.step}`} subtitle={p.title}>
                                    <form action={run(updateProcessStep.bind(null, idx), `Étape ${p.step} mise à jour ✓`)} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                        <Field label="Titre"><Input name="title" defaultValue={p.title} /></Field>
                                        <Field label="Description"><Textarea name="description" defaultValue={p.description} style={{ minHeight: 110 }} /></Field>
                                        <HR /><div style={{ display: 'flex', justifyContent: 'flex-end' }}><SaveBtn label={`Sauvegarder Étape ${p.step}`} pending={pend} /></div>
                                    </form>
                                </Card>
                            ))
                        )}

                        {/* ─── REACH ──────────── */}
                        {tab === 'reach' && (
                            <Card title="Présence Internationale" subtitle="Section globe sur la page d'accueil">
                                <form action={run(updateReach, 'Section mis à jour ✓')} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <Field label="Badge de section"><Input name="pill" defaultValue={reach.pill} /></Field>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                        <Field label="Titre"><Input name="title" defaultValue={reach.title} /></Field>
                                        <Field label="Complément en gras"><Input name="subtitle" defaultValue={reach.subtitle} /></Field>
                                    </div>
                                    <Field label="Description"><Textarea name="description" defaultValue={reach.description} style={{ minHeight: 110 }} /></Field>
                                    <HR /><div style={{ display: 'flex', justifyContent: 'flex-end' }}><SaveBtn pending={pend} /></div>
                                </form>
                            </Card>
                        )}

                        {/* ─── CLIENTS & LOGOS ──────────── */}
                        {tab === 'clients' && (<>
                            <Card title="Logos Clients Affichés" subtitle={`${clients?.length ?? 0} logo(s) visible(s) dans le bandeau`}>
                                {!clients?.length
                                    ? <p style={{ color: '#555570', textAlign: 'center', padding: '32px 0', fontSize: 14 }}>Aucun client pour l'instant.</p>
                                    : <div>{clients.map((c: any, i: number) => (
                                        <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: i < clients.length - 1 ? `1px solid ${BORDER}` : 'none', gap: 16 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                                <div style={{ width: 48, height: 48, background: '#0d0d14', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: ACCENT, fontFamily: 'Outfit, sans-serif', flexShrink: 0 }}>
                                                    {c.name.slice(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p style={{ fontSize: 15, fontWeight: 600, color: '#fff', margin: 0 }}>{c.name}</p>
                                                    <p style={{ fontSize: 11, color: '#555570', margin: '3px 0 0', textTransform: 'uppercase', letterSpacing: '.08em' }}>{c.industry} · <span style={{ color: '#333355' }}>logoType: {c.logoType}</span></p>
                                                </div>
                                            </div>
                                            <form action={runVoid(deleteClient.bind(null, c.id), 'Client supprimé')}><TrashBtn pending={pend} /></form>
                                        </div>
                                    ))}</div>
                                }
                            </Card>
                            <Card title="Ajouter un client" subtitle="Le logo apparaîtra dans le bandeau sous le Hero">
                                <form action={run(addClient, 'Client ajouté ✓')} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                        <Field label="Nom de la société"><Input name="name" placeholder="Microsoft, Google…" required /></Field>
                                        <Field label="Secteur / Industrie"><Input name="industry" placeholder="Cloud & Logiciels" /></Field>
                                    </div>
                                    <Field label="Type de logo" hint="Pour les logos reconnus : microsoft, google, ey, revolut, stripe, airbus">
                                        <Input name="logoType" placeholder="microsoft  |  google  |  ey  |  revolut  |  stripe  |  airbus  |  custom" />
                                    </Field>
                                    <div style={{ background: '#0d0d14', border: `1px solid ${BORDER}`, borderRadius: 12, padding: '14px 16px' }}>
                                        <p style={{ fontSize: 12, color: '#555570', margin: 0, lineHeight: 1.6 }}>
                                            💡 Valeurs reconnues : <span style={{ color: ACCENT, fontFamily: 'monospace' }}>microsoft</span>, <span style={{ color: ACCENT, fontFamily: 'monospace' }}>google</span>, <span style={{ color: ACCENT, fontFamily: 'monospace' }}>ey</span>, <span style={{ color: ACCENT, fontFamily: 'monospace' }}>revolut</span>, <span style={{ color: ACCENT, fontFamily: 'monospace' }}>stripe</span>, <span style={{ color: ACCENT, fontFamily: 'monospace' }}>airbus</span>.
                                            Pour tout autre logo, utilisez <span style={{ color: '#aaa', fontFamily: 'monospace' }}>custom</span> (affichage textuel élégant).
                                        </p>
                                    </div>
                                    <HR /><div style={{ display: 'flex', justifyContent: 'flex-end' }}><AddBtn label="Ajouter le client" pending={pend} /></div>
                                </form>
                            </Card>
                        </>)}

                        {/* ─── TESTIMONIALS ──────────── */}

                        {tab === 'testi' && (<>
                            <Card title="Témoignages publiés" subtitle={`${testimonials?.length ?? 0} témoignage(s)`}>
                                {!testimonials?.length
                                    ? <p style={{ color: '#555570', textAlign: 'center', padding: '32px 0', fontSize: 14 }}>Aucun témoignage.</p>
                                    : <div>{testimonials.map((t: any, i: number) => (
                                        <div key={t.id} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '18px 0', borderBottom: i < testimonials.length - 1 ? `1px solid ${BORDER}` : 'none', gap: 16 }}>
                                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                                                <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg,#00d2ff,#3a7bd5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{t.avatar}</div>
                                                <div>
                                                    <p style={{ fontSize: 14, fontWeight: 600, color: '#fff', margin: 0 }}>{t.name}</p>
                                                    <p style={{ fontSize: 12, color: ACCENT, margin: '2px 0 6px' }}>{t.role}</p>
                                                    <p style={{ fontSize: 13, color: '#666680', margin: 0, lineHeight: 1.5, maxWidth: 500 }}>"{t.text}"</p>
                                                </div>
                                            </div>
                                            <form action={runVoid(deleteTestimonial.bind(null, t.id), 'Témoignage supprimé')}><TrashBtn pending={pend} /></form>
                                        </div>
                                    ))}</div>
                                }
                            </Card>
                            <Card title="Ajouter un témoignage">
                                <form action={run(addTestimonial, 'Témoignage ajouté ✓')} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                        <Field label="Nom du client"><Input name="name" placeholder="Alexandre Dupont" required /></Field>
                                        <Field label="Poste & Société"><Input name="role" placeholder="CTO, FinTech Global" /></Field>
                                    </div>
                                    <Field label="Logo de l'entreprise (optionnel)" hint="microsoft, google, ey, revolut, stripe, airbus">
                                        <Input name="logoType" placeholder="google" />
                                    </Field>
                                    <Field label="Témoignage"><Textarea name="text" placeholder="Ce que dit votre client…" style={{ minHeight: 110 }} required /></Field>
                                    <HR /><div style={{ display: 'flex', justifyContent: 'flex-end' }}><AddBtn label="Publier le témoignage" pending={pend} /></div>
                                </form>
                            </Card>
                        </>)}

                        {/* ─── CTA ──────────── */}
                        {tab === 'cta' && (
                            <Card title="Section Appel à l'Action" subtitle="Grand bloc de conversion affiché avant le footer">
                                <form action={run(updateCta, 'CTA mis à jour ✓')} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <Field label="Badge (petite étiquette)"><Input name="badge" defaultValue={cta.badge} placeholder="Prêt à commencer ?" /></Field>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                        <Field label="Titre principal"><Input name="title" defaultValue={cta.title} placeholder="Construisons votre futur" /></Field>
                                        <Field label="Mot en dégradé (fin)"><Input name="highlight" defaultValue={cta.highlight} placeholder="ensemble." /></Field>
                                    </div>
                                    <Field label="Texte descriptif"><Textarea name="description" defaultValue={cta.description} style={{ minHeight: 100 }} /></Field>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                        <Field label="Bouton principal"><Input name="buttonPrimary" defaultValue={cta.buttonPrimary} placeholder="Démarrer un projet" /></Field>
                                        <Field label="Bouton secondaire"><Input name="buttonSecondary" defaultValue={cta.buttonSecondary} placeholder="Planifier un appel" /></Field>
                                    </div>
                                    <HR /><div style={{ display: 'flex', justifyContent: 'flex-end' }}><SaveBtn label="Sauvegarder le CTA" pending={pend} /></div>
                                </form>
                            </Card>
                        )}

                        {/* ─── BLOGS ──────────── */}
                        {tab === 'blogs' && (<>
                            <Card title="Rédiger un article">
                                <form action={run(addBlog, 'Article publié ✓')} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <Field label="Titre"><Input name="title" placeholder="Mon article…" required /></Field>
                                    <Field label="Résumé (accroche)"><Input name="excerpt" placeholder="En quelques mots…" /></Field>
                                    <Field label="Contenu complet"><Textarea name="content" placeholder="Corps de l'article…" style={{ minHeight: 220 }} required /></Field>
                                    <HR /><div style={{ display: 'flex', justifyContent: 'flex-end' }}><SaveBtn label="Publier l'article" pending={pend} /></div>
                                </form>
                            </Card>
                            <Card title="Articles en ligne" subtitle={`${blogs?.length ?? 0} article(s)`}>
                                {!blogs?.length
                                    ? <p style={{ color: '#555570', textAlign: 'center', padding: '32px 0', fontSize: 14 }}>Aucun article.</p>
                                    : <div>{blogs.map((b: any, i: number) => (
                                        <div key={b.id} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '18px 0', borderBottom: i < blogs.length - 1 ? `1px solid ${BORDER}` : 'none', gap: 16 }}>
                                            <div>
                                                <p style={{ fontSize: 15, fontWeight: 600, color: '#fff', margin: 0 }}>{b.title}</p>
                                                <p style={{ fontSize: 12, color: ACCENT, margin: '3px 0 6px' }}>{b.date}</p>
                                                <p style={{ fontSize: 13, color: '#555570', margin: 0 }}>{(b.excerpt || b.content.slice(0, 100)).slice(0, 100)}…</p>
                                            </div>
                                            <form action={runVoid(deleteBlog.bind(null, b.id), 'Article supprimé')}><TrashBtn pending={pend} /></form>
                                        </div>
                                    ))}</div>
                                }
                            </Card>
                        </>)}

                        {/* ─── CONTACT ──────────── */}
                        {tab === 'contact' && (
                            <Card title="Informations de contact" subtitle="Affichées dans le footer du site">
                                <form action={run(updateSettings, 'Coordonnées sauvegardées ✓')} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                        <Field label="Téléphone"><Input type="tel" name="telephone" defaultValue={settings.telephone} placeholder="+33 1 23 45 67 89" /></Field>
                                        <Field label="Email"><Input type="email" name="email" defaultValue={settings.email} placeholder="contact@nexura.it" /></Field>
                                    </div>
                                    <Field label="Adresse postale"><Input name="address" defaultValue={settings.address} /></Field>
                                    <HR /><div style={{ display: 'flex', justifyContent: 'flex-end' }}><SaveBtn label="Enregistrer" pending={pend} /></div>
                                </form>
                            </Card>
                        )}

                    </div>
                </div>
            </div>

            <style>{`
                @keyframes spin     { to { transform: rotate(360deg); } }
                @keyframes fadeDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
                * { box-sizing: border-box; }
                ::-webkit-scrollbar { width: 5px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: #1f1f2e; border-radius: 10px; }
                input::placeholder, textarea::placeholder { color: #333355; }
            `}</style>
        </div>
    );
}
