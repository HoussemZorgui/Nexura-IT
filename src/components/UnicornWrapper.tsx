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

        // 2. Ultimate Aggressive Watermark Obliteration
        const obliterateWatermark = () => {
            try {
                // Method A: Nuke by direct query selector
                document.querySelectorAll('a[href*="unicorn.studio"]').forEach(el => el.remove());

                // Method B: Nuke by traversing all text nodes in the DOM
                const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
                let node;
                while ((node = walker.nextNode())) {
                    if (node.nodeValue && node.nodeValue.toLowerCase().includes('unicorn.studio')) {
                        if (node.parentElement && node.parentElement.tagName !== 'SCRIPT' && node.parentElement.tagName !== 'STYLE') {
                            node.parentElement.style.setProperty('display', 'none', 'important');
                            node.parentElement.style.setProperty('opacity', '0', 'important');
                            node.parentElement.style.setProperty('visibility', 'hidden', 'important');
                        }
                    }
                }

                // Method C: Nuke inside any Shadow DOMs (if the library uses Web Components)
                document.querySelectorAll('*').forEach((el: any) => {
                    if (el.shadowRoot) {
                        el.shadowRoot.querySelectorAll('a').forEach((link: HTMLAnchorElement) => {
                            if (link.href && link.href.includes('unicorn.studio')) {
                                link.remove();
                            }
                        });
                    }
                });
            } catch (e) {
                // Silent catch to prevent visual errors during rapid execution
            }
        };

        // Run aggressively in the first few seconds
        const intervals = [
            setInterval(obliterateWatermark, 10), // Ultra-fast (every 10ms)
            setInterval(obliterateWatermark, 100),
            setInterval(obliterateWatermark, 1000)
        ];

        // And watch the DOM continuously to catch it exactly when the script injects it
        const observer = new MutationObserver(() => {
            obliterateWatermark();
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            intervals.forEach(clearInterval);
            observer.disconnect();
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
