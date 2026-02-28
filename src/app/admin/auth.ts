'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'nexura2026'

export async function loginAdmin(formData: FormData) {
    const password = formData.get('password') as string
    if (password === ADMIN_PASSWORD) {
        (await cookies()).set('admin_session', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        })
        redirect('/admin')
    } else {
        redirect('/admin/login?error=1')
    }
}

export async function logoutAdmin() {
    (await cookies()).delete('admin_session')
    redirect('/admin/login')
}

export async function checkAdminAuth() {
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')
    if (!session || session.value !== 'authenticated') {
        redirect('/admin/login')
    }
}
