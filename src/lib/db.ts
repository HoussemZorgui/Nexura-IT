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

export interface DB {
    settings: Settings;
    blogs: Blog[];
}

export function getDb(): DB {
    try {
        const data = fs.readFileSync(dbPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return {
            settings: { telephone: '', address: '', email: '' },
            blogs: []
        };
    }
}

export function saveDb(data: DB) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
}
