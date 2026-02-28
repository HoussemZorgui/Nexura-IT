'use client';

export default function ScrollTopButton() {
    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-gray-600 hover:text-cyan-400 hover:border-cyan-400 transition-all font-bold">
            ↑
        </button>
    );
}
