'use client';

import { useEffect, useRef } from 'react';

export default function UnicornWrapper() {
    const initialized = useRef(false);

    useEffect(() => {
        // 1. Initialize Unicorn Studio Script
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

        // 2. Aggressive polling to remove the Watermark Anchor Tag
        const hideBadge = () => {
            const links = document.querySelectorAll('a');
            links.forEach(link => {
                // Check if the link points to unicorn.studio
                if (link.href && link.href.includes('unicorn.studio')) {
                    link.style.display = 'none';
                    link.style.opacity = '0';
                    link.style.visibility = 'hidden';
                    link.style.pointerEvents = 'none';
                }
            });
        };

        // Run multiple times as the badge may be injected dynamically a few seconds after render
        const intervals = [
            setInterval(hideBadge, 100),
            setInterval(hideBadge, 500),
            setInterval(hideBadge, 1000),
            setInterval(hideBadge, 3000),
            setInterval(hideBadge, 5000),
        ];

        // Cleanup intervals after 10 seconds tracking
        return () => {
            intervals.forEach(clearInterval);
        };

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
