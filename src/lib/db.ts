import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db', 'data.json');

export interface Blog {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
}

export interface Settings {
    telephone: string;
    address: string;
    email: string;
}

export interface Hero {
    pillText: string;
    titlePrefix: string;
    titleHighlight: string;
    description: string;
}

export interface Service {
    id: string;
    icon: string;
    title: string;
    description: string;
}

export interface Metric {
    title: string;
    desc: string;
    glow: string;
}

export interface ProcessStep {
    id: string;
    step: string;
    title: string;
    description: string;
    gradient: string;
    shadow: string;
    hoverBorder: string;
}

export interface Reach {
    pill: string;
    title: string;
    subtitle: string;
    description: string;
    stats: { label: string; value: string }[];
}

export interface DB {
    settings: Settings;
    hero: Hero;
    services: Service[];
    metrics: Metric[];
    process: ProcessStep[];
    reach: Reach;
    blogs: Blog[];
}

export function getDb(): DB {
    try {
        const data = fs.readFileSync(dbPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // Provide enough defaults
        return {
            settings: { telephone: '', address: '', email: '' },
            hero: { pillText: '', titlePrefix: '', titleHighlight: '', description: '' },
            services: [],
            metrics: [],
            process: [],
            reach: { pill: '', title: '', subtitle: '', description: '', stats: [] },
            blogs: []
        };
    }
}

export function saveDb(data: DB) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}
