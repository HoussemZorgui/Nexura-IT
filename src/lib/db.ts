import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db', 'data.json');

export interface Blog {
    id: string; title: string; excerpt: string; content: string; date: string; image?: string;
}
export interface Settings {
    telephone: string; address: string; email: string;
}
export interface Hero {
    pillText: string; titlePrefix: string; titleHighlight: string; description: string;
}
export interface Service {
    id: string; icon: string; title: string; description: string;
}
export interface Metric {
    id: string; value: string; label: string;
}
export interface TechItem {
    id: string; name: string;
}
export interface Testimonial {
    id: string; name: string; role: string; avatar: string; text: string; logoType?: string;
}
export interface Client {
    id: string; name: string; logoType: string; industry: string;
}
export interface CTA {
    badge: string; title: string; highlight: string;
    description: string; buttonPrimary: string; buttonSecondary: string;
}
export interface ProcessStep {
    id: string; step: string; title: string; description: string;
    gradient: string; shadow: string; hoverBorder: string;
}
export interface Reach {
    pill: string; title: string; subtitle: string; description: string;
    stats: { label: string; value: string }[];
}

export interface DB {
    settings: Settings;
    hero: Hero;
    services: Service[];
    metrics: Metric[];
    techStack: TechItem[];
    clients: Client[];
    testimonials: Testimonial[];
    cta: CTA;
    process: ProcessStep[];
    reach: Reach;
    blogs: Blog[];
}

const DEFAULTS: DB = {
    settings: { telephone: '', address: '', email: '' },
    hero: { pillText: '', titlePrefix: '', titleHighlight: '', description: '' },
    services: [], metrics: [], techStack: [], clients: [], testimonials: [],
    cta: { badge: '', title: '', highlight: '', description: '', buttonPrimary: '', buttonSecondary: '' },
    process: [],
    reach: { pill: '', title: '', subtitle: '', description: '', stats: [] },
    blogs: [],
};

export function getDb(): DB {
    try {
        const data = fs.readFileSync(dbPath, 'utf-8');
        return { ...DEFAULTS, ...JSON.parse(data) };
    } catch {
        return DEFAULTS;
    }
}

export function saveDb(data: DB) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}
