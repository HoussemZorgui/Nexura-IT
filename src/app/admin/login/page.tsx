import { loginAdmin } from '../auth'

interface LoginPageProps {
    searchParams: Promise<{ error?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
    const params = await searchParams
    const hasError = params.error === '1'

    return (
        <div className="min-h-screen bg-[#08080a] flex items-center justify-center p-6" style={{ fontFamily: "'Inter', sans-serif" }}>

            {/* Subtle background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00d2ff]/[0.03] rounded-full blur-[120px]" />
            </div>

            <div className="relative w-full max-w-[380px]">

                {/* Logo */}
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-9 h-9 rounded-xl bg-[#00d2ff] flex items-center justify-center shrink-0">
                        <span className="text-black text-sm font-black">N</span>
                    </div>
                    <div>
                        <p className="text-[15px] font-semibold text-white">Nexura IT</p>
                        <p className="text-[11px] text-gray-500">Administration</p>
                    </div>
                </div>

                {/* Card */}
                <div className="bg-[#0d0d0f] border border-[#1e1e22] rounded-2xl p-8">
                    <h1 className="text-[22px] font-bold text-white mb-1">Connexion</h1>
                    <p className="text-[13px] text-gray-500 mb-8">Accès réservé aux administrateurs</p>

                    {hasError && (
                        <div className="flex items-center gap-3 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl mb-6" role="alert">
                            <svg className="w-4 h-4 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 8v4m0 4h.01" />
                            </svg>
                            <p className="text-[13px] text-red-400">Mot de passe incorrect. Veuillez réessayer.</p>
                        </div>
                    )}

                    <form action={loginAdmin} className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-[0.1em] mb-2">
                                Mot de passe administrateur
                            </label>
                            <input
                                type="password"
                                name="password"
                                autoFocus
                                autoComplete="current-password"
                                placeholder="••••••••"
                                required
                                className="w-full bg-[#111113] border border-[#2a2a2e] rounded-xl px-4 py-3 text-[14px] text-white placeholder-gray-700 focus:outline-none focus:border-[#00d2ff]/50 focus:bg-[#111] transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-white text-black text-[14px] font-semibold rounded-xl hover:bg-gray-100 active:scale-[0.99] transition-all mt-2 shadow-sm"
                        >
                            Accéder au tableau de bord
                        </button>
                    </form>
                </div>

                <p className="text-center text-[12px] text-gray-600 mt-6">
                    <a href="/" className="hover:text-gray-400 transition-colors">← Retour au site public</a>
                </p>
            </div>
        </div>
    )
}
