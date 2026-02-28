'use client';

import { useEffect, useRef } from 'react';

export default function UnicornWrapper() {
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        // Execute the specific init script the user provided, adapted for React lifecycle
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
    }, []);

    return (
        <div
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, overflow: 'hidden' }}
        >
            <div
                data-us-project="5tFNl87FO3DvM6CBTB65"
                style={{ width: '100%', height: '100%', minHeight: '100vh' }}
            ></div>
        </div>
    );
}
