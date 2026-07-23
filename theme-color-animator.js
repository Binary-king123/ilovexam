/**
 * theme-color-animator.js
 * Animates the Chrome/Android address bar with a "love heartbeat"
 * by cycling the <meta name="theme-color"> through romantic hues.
 *
 * Works on:  Android Chrome, Samsung Internet, Edge Mobile
 * Silently ignored on: iOS Safari, desktop Chrome (they ignore theme-color)
 */
(function () {
    'use strict';

    // Love / heart colour palette — deep reds, roses, corals
    const PALETTE = [
        '#e0004d', // iLovexams brand red
        '#c20042',
        '#a8003a',
        '#c20042',
        '#e0004d',
        '#f0305a', // rose peak
        '#e8184a',
        '#e0004d',
        '#c20042',
    ];

    // Heartbeat timing: slow build, quick peak, slow fade
    // Each value = ms to hold that colour before moving to the next
    const TIMING = [400, 300, 300, 300, 200, 150, 200, 400, 600];

    let metaTag = document.querySelector('meta[name="theme-color"]');
    if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.name = 'theme-color';
        document.head.appendChild(metaTag);
    }

    let idx = 0;

    function tick() {
        metaTag.setAttribute('content', PALETTE[idx]);
        const delay = TIMING[idx] || 400;
        idx = (idx + 1) % PALETTE.length;
        setTimeout(tick, delay);
    }

    // Start after a short delay so page load isn't affected
    setTimeout(tick, 800);
})();
