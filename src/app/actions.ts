'use server'

import { getDb, saveDb, Blog } from '@/lib/db'
import { revalidatePath } from 'next/cache'

const revalidate = () => { revalidatePath('/'); revalidatePath('/admin'); }

// ── Settings ────────────────────────────────────────────────
export async function updateSettings(formData: FormData) {
    const db = getDb()
    db.settings = {
        telephone: formData.get('telephone') as string,
        address: formData.get('address') as string,
        email: formData.get('email') as string,
    }
    saveDb(db); revalidate()
}

// ── Hero ─────────────────────────────────────────────────────
export async function updateHero(formData: FormData) {
    const db = getDb()
    db.hero = {
        pillText: formData.get('pillText') as string,
        titlePrefix: formData.get('titlePrefix') as string,
        titleHighlight: formData.get('titleHighlight') as string,
        description: formData.get('description') as string,
    }
    saveDb(db); revalidate()
}

// ── Services ─────────────────────────────────────────────────
export async function addService(formData: FormData) {
    const db = getDb()
    db.services.push({
        id: Date.now().toString(),
        icon: formData.get('icon') as string,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
    })
    saveDb(db); revalidate()
}

export async function deleteService(id: string) {
    const db = getDb()
    db.services = db.services.filter(s => s.id !== id)
    saveDb(db); revalidate()
}

// ── Metrics ──────────────────────────────────────────────────
export async function addMetric(formData: FormData) {
    const db = getDb()
    db.metrics.push({
        id: Date.now().toString(),
        value: formData.get('value') as string,
        label: formData.get('label') as string,
    })
    saveDb(db); revalidate()
}

export async function deleteMetric(id: string) {
    const db = getDb()
    db.metrics = db.metrics.filter(m => m.id !== id)
    saveDb(db); revalidate()
}

export async function updateMetric(id: string, formData: FormData) {
    const db = getDb()
    const m = db.metrics.find(m => m.id === id)
    if (m) {
        m.value = formData.get('value') as string
        m.label = formData.get('label') as string
    }
    saveDb(db); revalidate()
}

// ── Tech Stack ───────────────────────────────────────────────
export async function addTech(formData: FormData) {
    const db = getDb()
    db.techStack.push({ id: Date.now().toString(), name: formData.get('name') as string })
    saveDb(db); revalidate()
}

export async function deleteTech(id: string) {
    const db = getDb()
    db.techStack = db.techStack.filter(t => t.id !== id)
    saveDb(db); revalidate()
}

// ── Testimonials ─────────────────────────────────────────────
export async function addTestimonial(formData: FormData) {
    const db = getDb()
    const name = formData.get('name') as string
    db.testimonials.push({
        id: Date.now().toString(),
        name,
        role: formData.get('role') as string,
        avatar: name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2),
        text: formData.get('text') as string,
    })
    saveDb(db); revalidate()
}

export async function deleteTestimonial(id: string) {
    const db = getDb()
    db.testimonials = db.testimonials.filter(t => t.id !== id)
    saveDb(db); revalidate()
}

// ── CTA ──────────────────────────────────────────────────────
export async function updateCta(formData: FormData) {
    const db = getDb()
    db.cta = {
        badge: formData.get('badge') as string,
        title: formData.get('title') as string,
        highlight: formData.get('highlight') as string,
        description: formData.get('description') as string,
        buttonPrimary: formData.get('buttonPrimary') as string,
        buttonSecondary: formData.get('buttonSecondary') as string,
    }
    saveDb(db); revalidate()
}

// ── Process ──────────────────────────────────────────────────
export async function updateProcessStep(index: number, formData: FormData) {
    const db = getDb()
    db.process[index].title = formData.get('title') as string
    db.process[index].description = formData.get('description') as string
    saveDb(db); revalidate()
}

// ── Reach ─────────────────────────────────────────────────────
export async function updateReach(formData: FormData) {
    const db = getDb()
    db.reach.pill = formData.get('pill') as string
    db.reach.title = formData.get('title') as string
    db.reach.subtitle = formData.get('subtitle') as string
    db.reach.description = formData.get('description') as string
    saveDb(db); revalidate()
}

// ── Blogs ─────────────────────────────────────────────────────
export async function addBlog(formData: FormData) {
    const title = formData.get('title') as string
    const excerpt = formData.get('excerpt') as string
    const content = formData.get('content') as string
    if (!title || !content) return
    const db = getDb()
    const newBlog: Blog = {
        id: Date.now().toString(), title, excerpt, content,
        date: new Date().toISOString().split('T')[0]
    }
    db.blogs.push(newBlog)
    saveDb(db); revalidate()
}

export async function deleteBlog(id: string) {
    const db = getDb()
    db.blogs = db.blogs.filter(b => b.id !== id)
    saveDb(db); revalidate()
}
