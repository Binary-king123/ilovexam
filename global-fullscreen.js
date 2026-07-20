// ============================================================
// iLoveExams — Global Fullscreen Enforcer (global-fullscreen.js)
// Enables automatic fullscreen on load or click on all pages.
// ============================================================
(function() {
    'use strict';

    function goFullscreen() {
        // Skip if already in fullscreen
        if (document.fullscreenElement || 
            document.webkitFullscreenElement || 
            document.mozFullScreenElement || 
            document.msFullscreenElement) {
            return;
        }

        const el = document.documentElement;
        try {
            if (el.requestFullscreen) {
                el.requestFullscreen().catch(err => {
                    // Log but ignore: browser requires user interaction first
                });
            } else if (el.webkitRequestFullscreen) {
                el.webkitRequestFullscreen();
            } else if (el.msRequestFullscreen) {
                el.msRequestFullscreen();
            }
        } catch (e) {
            console.error('Failed to enter fullscreen:', e);
        }
    }

    // Try going fullscreen on load
    window.addEventListener('load', goFullscreen);
    window.addEventListener('DOMContentLoaded', goFullscreen);

    // Enforce fullscreen on any user action (reliable gesture trigger)
    const gestures = ['click', 'keydown', 'touchstart', 'mousedown'];
    gestures.forEach(evtName => {
        document.addEventListener(evtName, goFullscreen, { passive: true });
    });
})();
