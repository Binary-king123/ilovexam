(function () {
    'use strict';
    let metaTag = document.querySelector('meta[name="theme-color"]');
    if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.name = 'theme-color';
        document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', '#e0004d');
})();

