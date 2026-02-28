'use server'

import { getDb, saveDb, Blog, Settings, Hero, Service, Metric, ProcessStep, Reach } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function updateSettings(formData: FormData) {
    const db = getDb()
    db.settings = {
        telephone: formData.get('telephone') as string,
        address: formData.get('address') as string,
        email: formData.get('email') as string,
    }
    saveDb(db)
    revalidatePath('/')
    revalidatePath('/admin')
}

export async function updateHero(formData: FormData) {
    const db = getDb()
    db.hero = {
        pillText: formData.get('pillText') as string,
        titlePrefix: formData.get('titlePrefix') as string,
        titleHighlight: formData.get('titleHighlight') as string,
        description: formData.get('description') as string,
    }
    saveDb(db)
    revalidatePath('/')
    revalidatePath('/admin')
}

export async function addService(formData: FormData) {
    const db = getDb()
    db.services.push({
        id: Date.now().toString(),
        icon: formData.get('icon') as string,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
    })
    saveDb(db)
    revalidatePath('/')
}

export async function deleteService(id: string) {
    const db = getDb()
    db.services = db.services.filter(s => s.id !== id)
    saveDb(db)
    revalidatePath('/')
}

export async function updateMetric(index: number, formData: FormData) {
    const db = getDb()
    db.metrics[index] = {
        title: formData.get('title') as string,
        desc: formData.get('desc') as string,
        glow: formData.get('glow') as string || ''
    }
    saveDb(db)
    revalidatePath('/')
}

export async function updateProcessStep(index: number, formData: FormData) {
    const db = getDb()
    db.process[index].title = formData.get('title') as string
    db.process[index].description = formData.get('description') as string
    saveDb(db)
    revalidatePath('/')
}

export async function updateReach(formData: FormData) {
    const db = getDb()
    db.reach.pill = formData.get('pill') as string
    db.reach.title = formData.get('title') as string
    db.reach.subtitle = formData.get('subtitle') as string
    db.reach.description = formData.get('description') as string
    saveDb(db)
    revalidatePath('/')
}

export async function addBlog(formData: FormData) {
    const title = formData.get('title') as string
    const excerpt = formData.get('excerpt') as string
    const content = formData.get('content') as string

    if (!title || !content) return

    const db = getDb()
    const newBlog: Blog = {
        id: Date.now().toString(),
        title,
        excerpt,
        content,
        date: new Date().toISOString().split('T')[0]
    }

    db.blogs.push(newBlog)
    saveDb(db)
    revalidatePath('/')
    revalidatePath('/admin')
}

export async function deleteBlog(id: string) {
    const db = getDb()
    db.blogs = db.blogs.filter(b => b.id !== id)
    saveDb(db)
    revalidatePath('/')
    revalidatePath('/admin')
}
