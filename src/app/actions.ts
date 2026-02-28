'use server'

import { getDb, saveDb, Blog, Settings } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function updateSettings(formData: FormData) {
    const settings: Settings = {
        telephone: formData.get('telephone') as string,
        address: formData.get('address') as string,
        email: formData.get('email') as string,
    }
    const db = getDb()
    db.settings = settings
    saveDb(db)
    revalidatePath('/')
    revalidatePath('/admin')
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
