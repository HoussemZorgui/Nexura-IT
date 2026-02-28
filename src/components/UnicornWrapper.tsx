'use client';

import { useEffect, useRef } from 'react';

export default function UnicornWrapper() {
    const initialized = useRef(false);

    useEffect(() => {
        // Initialize Unicorn Studio Script
        if (!initialized.current) {
            initialized.current = true;
            const initUnicorn = () => {
                var u = (window as any).UnicornStudio;
                if (u && u.init) {
                    if (document.readyState === "loading") {
                        document.addEventListener("DOMContentLoaded", function () { u.init() });
                    } else {
                        u.init();
                    }
                } else {
                    (window as any).UnicornStudio = { isInitialized: false };
                    var i = document.createElement("script");
                    i.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js";
                    i.onload = function () {
                        if (document.readyState === "loading") {
                            document.addEventListener("DOMContentLoaded", function () { (window as any).UnicornStudio.init() });
                        } else {
                            (window as any).UnicornStudio.init();
                        }
                    };
                    (document.head || document.body).appendChild(i);
                }
            };
            initUnicorn();
        }
    }, []);

    return (
        /* L'astuce physique incontournable : Le conteneur parent empêche tout débordement (overflow: hidden). */
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, overflow: 'hidden' }}>

            {/* Le conteneur de l'animation est "trop grand" et décalé vers le haut de 80px.
            Le bas de l'animation dépasse donc de 80px sous l'écran. 
            Le filigrane "unicorn" se fixant en bas, il sera physiquement hors-champ ! */}
            <div style={{ position: 'absolute', top: '-80px', left: 0, width: '100%', height: 'calc(100vh + 160px)' }}>
                <div
                    data-us-project="5tFNl87FO3DvM6CBTB65"
                    style={{ width: '100%', height: '100%' }}
                ></div>
            </div>

        </div>
    );
}
