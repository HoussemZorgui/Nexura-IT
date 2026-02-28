'use client';

/** Renders a brand-quality logo for known companies, or a text fallback for custom ones */
export function BrandLogo({ logoType, name, className = "" }: { logoType: string; name: string, className?: string }) {
    const commonClass = `${className}`;

    switch (logoType) {
        case 'microsoft':
            return (
                <svg viewBox="0 0 88 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={commonClass}>
                    <rect x="0" y="0" width="10" height="10" fill="#F25022" />
                    <rect x="12" y="0" width="10" height="10" fill="#7FBA00" />
                    <rect x="0" y="12" width="10" height="10" fill="#00A4EF" />
                    <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
                    <text x="28" y="17" fontFamily="'Segoe UI', Arial, sans-serif" fontWeight="400" fontSize="14" fill="white">Microsoft</text>
                </svg>
            );
        case 'google':
            return (
                <svg viewBox="0 0 80 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={commonClass}>
                    <text x="0" y="18" fontFamily="'Product Sans', Arial, sans-serif" fontWeight="400" fontSize="18" fill="#4285F4">G</text>
                    <text x="11" y="18" fontFamily="'Product Sans', Arial, sans-serif" fontWeight="400" fontSize="18" fill="#EA4335">o</text>
                    <text x="22" y="18" fontFamily="'Product Sans', Arial, sans-serif" fontWeight="400" fontSize="18" fill="#FBBC05">o</text>
                    <text x="33" y="18" fontFamily="'Product Sans', Arial, sans-serif" fontWeight="400" fontSize="18" fill="#4285F4">g</text>
                    <text x="44" y="18" fontFamily="'Product Sans', Arial, sans-serif" fontWeight="400" fontSize="18" fill="#34A853">l</text>
                    <text x="50" y="18" fontFamily="'Product Sans', Arial, sans-serif" fontWeight="400" fontSize="18" fill="#EA4335">e</text>
                </svg>
            );
        case 'ey':
            return (
                <svg viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={commonClass}>
                    <text x="0" y="20" fontFamily="'Arial', sans-serif" fontWeight="900" fontSize="22" fill="#FFE600">EY</text>
                </svg>
            );
        case 'revolut':
            return (
                <svg viewBox="0 0 76 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={commonClass}>
                    <circle cx="10" cy="12" r="9" fill="white" />
                    <path d="M7 8h4.5a2.5 2.5 0 010 5H7V8z" fill="#0075EB" />
                    <path d="M11.5 13L15 18h-2.5L9 13" fill="#0075EB" />
                    <text x="22" y="18" fontFamily="'Arial', sans-serif" fontWeight="700" fontSize="14" fill="white">Revolut</text>
                </svg>
            );
        case 'stripe':
            return (
                <svg viewBox="0 0 56 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={commonClass}>
                    <text x="0" y="18" fontFamily="'Arial', sans-serif" fontWeight="700" fontSize="17" fill="#6772E5">stripe</text>
                </svg>
            );
        case 'airbus':
            return (
                <svg viewBox="0 0 72 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={commonClass}>
                    <rect x="0" y="6" width="22" height="12" rx="2" fill="#00205B" />
                    <text x="2" y="16.5" fontFamily="'Arial', sans-serif" fontWeight="900" fontSize="10" fill="white">AIRBUS</text>
                    <text x="26" y="17" fontFamily="'Arial', sans-serif" fontWeight="300" fontSize="13" fill="white" letterSpacing="1">Group</text>
                </svg>
            );
        default:
            // Generic text logo with gradient
            return (
                <span className={commonClass} style={{
                    fontFamily: 'Inter, sans-serif', fontWeight: 800,
                    letterSpacing: '-0.02em',
                    background: 'linear-gradient(to right, #fff, #aaa)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                }}>
                    {name}
                </span>
            );
    }
}
