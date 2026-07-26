import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const HEADER_OFFSET = 100;
const TARGET_WAIT_MS = 2_000;

function getTargetId(hash: string) {
    const encodedId = hash.slice(1);

    try {
        return decodeURIComponent(encodedId);
    } catch {
        return encodedId;
    }
}

function scrollToTarget(targetId: string) {
    const target = document.getElementById(targetId);

    if (!target) {
        return false;
    }

    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({
        top: Math.max(0, top),
        behavior: 'auto',
    });
    return true;
}

export default function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (!hash) {
            window.scrollTo(0, 0);
            return;
        }

        const targetId = getTargetId(hash);
        let observer: MutationObserver | undefined;
        let timeoutId: number | undefined;

        const stopWaiting = () => {
            observer?.disconnect();
            if (timeoutId !== undefined) {
                window.clearTimeout(timeoutId);
            }
        };

        const frameId = window.requestAnimationFrame(() => {
            if (scrollToTarget(targetId)) {
                return;
            }

            observer = new MutationObserver(() => {
                if (scrollToTarget(targetId)) {
                    stopWaiting();
                }
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });

            timeoutId = window.setTimeout(() => {
                observer?.disconnect();
                window.scrollTo(0, 0);
            }, TARGET_WAIT_MS);
        });

        return () => {
            window.cancelAnimationFrame(frameId);
            stopWaiting();
        };
    }, [pathname, hash]);

    return null;
}
