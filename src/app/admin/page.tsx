'use client';

import { useState, useEffect, useTransition, ReactNode } from 'react';
import {
    updateSettings, addBlog, deleteBlog, updateHero,
    addService, deleteService, updateProcessStep, updateReach
} from '../actions';
import { logoutAdmin } from './auth';

/* ─────────────────────────────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────────────────────────────── */
const BG = '#0a0a0f';
const SURFACE = '#111118';
const BORDER = '#1f1f2e';
const ACCENT = '#00d2ff';

/* ─────────────────────────────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────────────────────────────── */
const Ico = {
    hero: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5"><path strokeLinecap="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    services: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5"><path strokeLinecap="round" d="M4 6h16M4 12h10M4 18h7" /></svg>,
    process: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5"><path strokeLinecap="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
    reach: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5"><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M3.6 9h16.8M3.6 15h16.8M12 3c-3 4-3 14 0 18M12 3c3 4 3 14 0 18" /></svg>,
    blogs: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5"><path strokeLinecap="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    contact: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5"><path strokeLinecap="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    trash: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5"><path strokeLinecap="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    plus: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" d="M12 5v14M5 12h14" /></svg>,
    check: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4"><path strokeLinecap="round" d="M5 13l4 4L19 7" /></svg>,
    logout: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5"><path strokeLinecap="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
    link: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5"><path strokeLinecap="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
};

/* ─────────────────────────────────────────────────────────────────
   REUSABLE PRIMITIVES
───────────────────────────────────────────────────────────────── */
const inputStyle: React.CSSProperties = {
    width: '100%', background: '#0d0d14', border: `1px solid ${BORDER}`,
    borderRadius: 12, padding: '14px 16px', fontSize: 15,
    color: '#fff', outline: 'none', fontFamily: 'Inter, sans-serif',
    lineHeight: 1.5, transition: 'border-color .2s',
};

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    const [focus, setFocus] = useState(false);
    return <input {...props}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{ ...inputStyle, borderColor: focus ? ACCENT : BORDER, ...props.style }} />;
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    const [focus, setFocus] = useState(false);
    return <textarea {...props}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{ ...inputStyle, borderColor: focus ? ACCENT : BORDER, resize: 'vertical', minHeight: 120, ...props.style }} />;
}

function Label({ children, hint }: { children: ReactNode; hint?: string }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#8b8baa', letterSpacing: '.04em', textTransform: 'uppercase' }}>{children}</label>
            {hint && <span style={{ fontSize: 12, color: '#555570' }}>{hint}</span>}
        </div>
    );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
    return <div style={{ display: 'flex', flexDirection: 'column' }}><Label hint={hint}>{label}</Label>{children}</div>;
}

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
    return (
        <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: 20, overflow: 'hidden' }}>
            <div style={{ padding: '22px 28px', borderBottom: `1px solid ${BORDER}` }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: 0, fontFamily: 'Outfit, sans-serif' }}>{title}</h3>
                {subtitle && <p style={{ fontSize: 14, color: '#666680', margin: '4px 0 0', lineHeight: 1.5 }}>{subtitle}</p>}
            </div>
            <div style={{ padding: '28px' }}>{children}</div>
        </div>
    );
}

function SaveBtn({ label = 'Sauvegarder', pending }: { label?: string; pending?: boolean }) {
    return (
        <button type="submit" disabled={pending} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 22px', background: '#fff', color: '#000',
            fontSize: 14, fontWeight: 700, borderRadius: 12, border: 'none',
            cursor: pending ? 'wait' : 'pointer', opacity: pending ? .6 : 1,
            letterSpacing: '.01em', transition: 'all .2s', fontFamily: 'Inter, sans-serif',
        }}>
            {pending ? <span style={{ width: 16, height: 16, border: '2px solid #ccc', borderTopColor: '#000', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }} /> : Ico.check}
            {label}
        </button>
    );
}

function DeleteBtn({ pending }: { pending?: boolean }) {
    return (
        <button type="submit" disabled={pending} style={{
            width: 36, height: 36, borderRadius: 10, border: '1px solid #2a1a1a',
            background: '#1a0a0a', color: '#c04040', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all .2s', opacity: pending ? .5 : 1,
        }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#7f1d1d'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1a0a0a'; (e.currentTarget as HTMLButtonElement).style.color = '#c04040'; }}
        >{Ico.trash}</button>
    );
}

function AddBtn({ label }: { label: string }) {
    return (
        <button type="submit" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 22px', background: 'transparent', color: '#fff',
            fontSize: 14, fontWeight: 600, borderRadius: 12,
            border: `1px solid ${BORDER}`, cursor: 'pointer',
            transition: 'all .2s', fontFamily: 'Inter, sans-serif',
        }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = ACCENT; (e.currentTarget as HTMLButtonElement).style.color = ACCENT; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = BORDER; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
        >{Ico.plus}{label}</button>
    );
}

function Divider() {
    return <div style={{ height: 1, background: BORDER, margin: '24px 0' }} />;
}

function Toast({ msg }: { msg: string }) {
    return (
        <div style={{
            position: 'fixed', top: 24, right: 24, zIndex: 9999,
            background: '#fff', color: '#000', padding: '14px 20px',
            borderRadius: 14, display: 'flex', alignItems: 'center', gap: 12,
            fontSize: 15, fontWeight: 600, boxShadow: '0 20px 60px rgba(0,0,0,.5)',
            animation: 'fadeInDown .3s ease', fontFamily: 'Inter, sans-serif',
        }}>
            <span style={{ width: 22, height: 22, background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>{Ico.check}</span>
            {msg}
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────────
   SIDEBAR NAV CONFIG
───────────────────────────────────────────────────────────────── */
const NAV = [
    { id: 'hero', label: 'Hero Section', icon: Ico.hero },
    { id: 'services', label: 'Services', icon: Ico.services },
    { id: 'process', label: 'Méthodologie', icon: Ico.process },
    { id: 'reach', label: 'Présence globale', icon: Ico.reach },
    { id: 'blogs', label: 'Blog & Actualités', icon: Ico.blogs },
    { id: 'contact', label: 'Coordonnées', icon: Ico.contact },
];

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */
export default function AdminPage() {
    const [db, setDb] = useState<any>(null);
    const [tab, setTab] = useState('hero');
    const [pending, start] = useTransition();
    const [toast, setToast] = useState<string | null>(null);

    const refresh = () => fetch('/api/db').then(r => r.json()).then(setDb);
    useEffect(() => { refresh(); }, []);

    const notify = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

    const run = (action: (f: FormData) => Promise<void>, msg: string) =>
        (f: FormData) => start(async () => { await action(f); await refresh(); notify(msg); });

    const runVoid = (action: () => Promise<void>, msg: string) =>
        () => start(async () => { await action(); await refresh(); notify(msg); });

    if (!db) return (
        <div style={{ minHeight: '100vh', background: BG, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, fontFamily: 'Inter, sans-serif' }}>
            <div style={{ width: 40, height: 40, border: `2px solid ${BORDER}`, borderTopColor: ACCENT, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: '#555570', fontSize: 15 }}>Chargement du tableau de bord…</p>
        </div>
    );

    const { settings, blogs, hero, services, process, reach } = db;
    const SIDEBAR_W = 260;
    const TOPBAR_H = 68;

    return (
        <div style={{ minHeight: '100vh', background: BG, display: 'flex', fontFamily: 'Inter, sans-serif' }}>
            {toast && <Toast msg={toast} />}

            {/* ──────────── SIDEBAR ──────────── */}
            <aside style={{
                width: SIDEBAR_W, position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100,
                background: '#08080d', borderRight: `1px solid ${BORDER}`,
                display: 'flex', flexDirection: 'column',
            }}>
                {/* Brand */}
                <div style={{ height: TOPBAR_H, display: 'flex', alignItems: 'center', padding: '0 24px', borderBottom: `1px solid ${BORDER}`, gap: 14, flexShrink: 0 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ color: '#000', fontWeight: 900, fontSize: 15, fontFamily: 'Outfit, sans-serif' }}>N</span>
                    </div>
                    <div>
                        <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: 0, fontFamily: 'Outfit, sans-serif' }}>Nexura IT</p>
                        <p style={{ fontSize: 11, color: '#555570', margin: 0, letterSpacing: '.04em' }}>Admin CMS</p>
                    </div>
                </div>

                {/* Nav */}
                <nav style={{ flex: 1, padding: '20px 12px', overflowY: 'auto' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#444460', letterSpacing: '.12em', textTransform: 'uppercase', padding: '0 12px', marginBottom: 10 }}>
                        Contenu du site
                    </p>
                    {NAV.map(item => {
                        const active = tab === item.id;
                        const cnt = item.id === 'services' ? services?.length : item.id === 'blogs' ? blogs?.length : null;
                        return (
                            <button key={item.id} onClick={() => setTab(item.id)} style={{
                                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                gap: 12, padding: '12px 14px', borderRadius: 12, border: 'none',
                                background: active ? 'rgba(0,210,255,.1)' : 'transparent',
                                color: active ? ACCENT : '#7070a0',
                                fontSize: 14, fontWeight: active ? 600 : 500,
                                cursor: 'pointer', marginBottom: 2,
                                transition: 'all .2s', textAlign: 'left', fontFamily: 'Inter, sans-serif',
                            }}
                                onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,.04)'; (e.currentTarget as HTMLButtonElement).style.color = '#ccc'; } }}
                                onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#7070a0'; } }}
                            >
                                <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    {item.icon}
                                    {item.label}
                                </span>
                                {cnt !== null && (
                                    <span style={{ background: 'rgba(255,255,255,.06)', color: '#666688', fontSize: 12, padding: '2px 8px', borderRadius: 8, fontWeight: 600 }}>{cnt}</span>
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Bottom */}
                <div style={{ padding: '12px', borderTop: `1px solid ${BORDER}`, flexShrink: 0 }}>
                    <a href="/" target="_blank" rel="noopener" style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '12px 14px', borderRadius: 12,
                        color: '#7070a0', fontSize: 14, fontWeight: 500,
                        textDecoration: 'none', transition: 'all .2s',
                    }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,.04)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#7070a0'; (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
                    >{Ico.link} Voir le site public</a>

                    <form action={logoutAdmin} style={{ marginTop: 4 }}>
                        <button type="submit" style={{
                            width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                            padding: '12px 14px', borderRadius: 12, border: 'none',
                            background: 'transparent', color: '#7070a0',
                            fontSize: 14, fontWeight: 500, cursor: 'pointer',
                            transition: 'all .2s', textAlign: 'left', fontFamily: 'Inter, sans-serif',
                        }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(220,50,50,.08)'; (e.currentTarget as HTMLButtonElement).style.color = '#f87171'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#7070a0'; }}
                        >{Ico.logout} Se déconnecter</button>
                    </form>
                </div>
            </aside>

            {/* ──────────── MAIN ──────────── */}
            <div style={{ marginLeft: SIDEBAR_W, flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

                {/* Topbar */}
                <header style={{
                    height: TOPBAR_H, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0 40px', borderBottom: `1px solid ${BORDER}`,
                    background: '#08080d', position: 'sticky', top: 0, zIndex: 50, flexShrink: 0,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: 0, fontFamily: 'Outfit, sans-serif' }}>
                            {NAV.find(n => n.id === tab)?.label}
                        </h1>
                        {pending && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#666688' }}>
                                <span style={{ width: 14, height: 14, border: '2px solid #333355', borderTopColor: ACCENT, borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }} />
                                Enregistrement…
                            </span>
                        )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(0,210,255,.15)', border: `1px solid rgba(0,210,255,.3)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: 13, fontWeight: 800, color: ACCENT, fontFamily: 'Outfit, sans-serif' }}>N</span>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main style={{ flex: 1, overflowY: 'auto', padding: '40px', paddingBottom: 80 }}>
                    <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>

                        {/* ── HERO ── */}
                        {tab === 'hero' && (
                            <Card title="Section Hero" subtitle="Modifiez le contenu principal affiché en pleine page sur l'accueil.">
                                <form action={run(updateHero, 'Hero mis à jour ✓')} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                    <Field label="Texte du badge animé" hint="Petite pilule pulsante en haut">
                                        <Input type="text" name="pillText" defaultValue={hero.pillText} placeholder="IT Services & Solutions" />
                                    </Field>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                        <Field label="Titre — partie statique">
                                            <Input type="text" name="titlePrefix" defaultValue={hero.titlePrefix} placeholder="Shape the" />
                                        </Field>
                                        <Field label="Titre — mot en dégradé">
                                            <Input type="text" name="titleHighlight" defaultValue={hero.titleHighlight} placeholder="Future." />
                                        </Field>
                                    </div>
                                    <Field label="Description principale" hint="Paragraphe d'accroche sous le titre">
                                        <Textarea name="description" defaultValue={hero.description} style={{ minHeight: 140 }} />
                                    </Field>
                                    <Divider />
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <SaveBtn label="Sauvegarder le Hero" pending={pending} />
                                    </div>
                                </form>
                            </Card>
                        )}

                        {/* ── SERVICES ── */}
                        {tab === 'services' && (<>
                            <Card title="Services publiés" subtitle={`${services?.length ?? 0} service(s) affiché(s) sur le site`}>
                                {!services?.length
                                    ? <p style={{ color: '#555570', textAlign: 'center', padding: '40px 0', fontSize: 15 }}>Aucun service pour l'instant.</p>
                                    : <div>
                                        {services.map((s: any, i: number) => (
                                            <div key={s.id} style={{
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                padding: '18px 0', borderBottom: i < services.length - 1 ? `1px solid ${BORDER}` : 'none',
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                                    <span style={{ width: 48, height: 48, background: '#0d0d14', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{s.icon}</span>
                                                    <div>
                                                        <p style={{ fontSize: 16, fontWeight: 600, color: '#fff', margin: 0 }}>{s.title}</p>
                                                        <p style={{ fontSize: 13, color: '#555570', margin: '4px 0 0', lineHeight: 1.4, maxWidth: 460 }}>{s.description}</p>
                                                    </div>
                                                </div>
                                                <form action={runVoid(deleteService.bind(null, s.id), 'Service supprimé')}>
                                                    <DeleteBtn pending={pending} />
                                                </form>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </Card>

                            <Card title="Ajouter un service" subtitle="Le service apparaîtra immédiatement sur le site.">
                                <form action={run(addService, 'Service ajouté ✓')} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 16 }}>
                                        <Field label="Emoji">
                                            <Input type="text" name="icon" placeholder="☁️" />
                                        </Field>
                                        <Field label="Nom du service">
                                            <Input type="text" name="title" placeholder="Cloud Architecture" required />
                                        </Field>
                                    </div>
                                    <Field label="Description courte">
                                        <Textarea name="description" placeholder="Décrivez ce service en 1-2 phrases…" style={{ minHeight: 90 }} />
                                    </Field>
                                    <Divider />
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <AddBtn label="Ajouter le service" />
                                    </div>
                                </form>
                            </Card>
                        </>)}

                        {/* ── PROCESS ── */}
                        {tab === 'process' && process?.map((p: any, idx: number) => (
                            <Card key={p.id} title={`Étape ${p.step}`} subtitle={`Actuellement : "${p.title}"`}>
                                <form action={run(updateProcessStep.bind(null, idx), `Étape ${p.step} mise à jour ✓`)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                    <Field label="Titre de l'étape">
                                        <Input type="text" name="title" defaultValue={p.title} />
                                    </Field>
                                    <Field label="Description">
                                        <Textarea name="description" defaultValue={p.description} style={{ minHeight: 120 }} />
                                    </Field>
                                    <Divider />
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <SaveBtn label={`Sauvegarder l'étape ${p.step}`} pending={pending} />
                                    </div>
                                </form>
                            </Card>
                        ))}

                        {/* ── REACH ── */}
                        {tab === 'reach' && (
                            <Card title="Section Présence Internationale" subtitle="Textes de la section avec le globe animé">
                                <form action={run(updateReach, 'Section mise à jour ✓')} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                    <Field label="Badge de section">
                                        <Input type="text" name="pill" defaultValue={reach.pill} placeholder="Présence internationale" />
                                    </Field>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                        <Field label="Titre principal">
                                            <Input type="text" name="title" defaultValue={reach.title} />
                                        </Field>
                                        <Field label="Complément (en gras)">
                                            <Input type="text" name="subtitle" defaultValue={reach.subtitle} />
                                        </Field>
                                    </div>
                                    <Field label="Paragraphe descriptif">
                                        <Textarea name="description" defaultValue={reach.description} style={{ minHeight: 130 }} />
                                    </Field>
                                    <Divider />
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <SaveBtn label="Mettre à jour" pending={pending} />
                                    </div>
                                </form>
                            </Card>
                        )}

                        {/* ── BLOGS ── */}
                        {tab === 'blogs' && (<>
                            <Card title="Rédiger un article" subtitle="L'article sera publié immédiatement.">
                                <form action={run(addBlog, 'Article publié ✓')} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                    <Field label="Titre de l'article">
                                        <Input type="text" name="title" placeholder="Mon article de blog…" required />
                                    </Field>
                                    <Field label="Résumé (accroche)" hint="Affiché sur la page d'accueil">
                                        <Input type="text" name="excerpt" placeholder="En quelques mots…" />
                                    </Field>
                                    <Field label="Contenu complet de l'article">
                                        <Textarea name="content" placeholder="Développez votre article ici…" style={{ minHeight: 240 }} required />
                                    </Field>
                                    <Divider />
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <SaveBtn label="Publier l'article" pending={pending} />
                                    </div>
                                </form>
                            </Card>

                            <Card title="Articles publiés" subtitle={`${blogs?.length ?? 0} article(s) en ligne`}>
                                {!blogs?.length
                                    ? <p style={{ color: '#555570', textAlign: 'center', padding: '40px 0', fontSize: 15 }}>Aucun article publié pour l'instant.</p>
                                    : <div>
                                        {blogs.map((b: any, i: number) => (
                                            <div key={b.id} style={{
                                                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16,
                                                padding: '20px 0', borderBottom: i < blogs.length - 1 ? `1px solid ${BORDER}` : 'none',
                                            }}>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <p style={{ fontSize: 16, fontWeight: 600, color: '#fff', margin: 0 }}>{b.title}</p>
                                                    <p style={{ fontSize: 13, color: ACCENT, margin: '4px 0 6px', fontWeight: 500 }}>{b.date}</p>
                                                    <p style={{ fontSize: 13, color: '#555570', margin: 0, lineHeight: 1.5 }}>
                                                        {(b.excerpt || b.content.slice(0, 100))}
                                                        {(b.excerpt?.length > 100 || b.content.length > 100) ? '…' : ''}
                                                    </p>
                                                </div>
                                                <form action={runVoid(deleteBlog.bind(null, b.id), 'Article supprimé')}>
                                                    <DeleteBtn pending={pending} />
                                                </form>
                                            </div>
                                        ))}
                                    </div>
                                }
                            </Card>
                        </>)}

                        {/* ── CONTACT ── */}
                        {tab === 'contact' && (
                            <Card title="Informations de contact" subtitle="Ces données s'affichent dans le footer du site public.">
                                <form action={run(updateSettings, 'Coordonnées sauvegardées ✓')} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                        <Field label="Téléphone">
                                            <Input type="tel" name="telephone" defaultValue={settings.telephone} placeholder="+33 1 23 45 67 89" />
                                        </Field>
                                        <Field label="Adresse email">
                                            <Input type="email" name="email" defaultValue={settings.email} placeholder="contact@nexura.it" />
                                        </Field>
                                    </div>
                                    <Field label="Adresse postale complète">
                                        <Input type="text" name="address" defaultValue={settings.address} />
                                    </Field>
                                    <Divider />
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <SaveBtn label="Enregistrer les coordonnées" pending={pending} />
                                    </div>
                                </form>
                            </Card>
                        )}

                    </div>
                </main>
            </div>

            {/* CSS animations */}
            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes fadeInDown { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
                * { box-sizing: border-box; }
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: #1f1f2e; border-radius: 10px; }
            `}</style>
        </div>
    );
}
