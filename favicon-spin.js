(function() {
  function initFaviconSpin() {
    // Find the standard favicon elements
    let favicon = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="alternate icon"]');
    if (!favicon) {
      // If it doesn't exist, create it
      favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/png';
      document.head.appendChild(favicon);
    }

    const img = new Image();
    // Resolve full path or fallback to favicon.svg
    const currentHref = favicon.getAttribute('href');
    img.src = currentHref && !currentHref.startsWith('data:') ? currentHref : 'favicon.svg';

    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      let angle = 0;

      function animate() {
        ctx.clearRect(0, 0, 32, 32);
        ctx.save();
        ctx.translate(16, 16);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.drawImage(img, -16, -16, 32, 32);
        ctx.restore();

        try {
          favicon.href = canvas.toDataURL('image/png');
        } catch (e) {
          // Ignore security exceptions if running via file:// protocol
        }
        angle = (angle + 3) % 360; // Adjust rotation speed (degrees per frame)
        requestAnimationFrame(animate);
      }
      animate();
    };

    img.onerror = function() {
      console.warn('Failed to load favicon image for spinning animation');
    };
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFaviconSpin);
  } else {
    initFaviconSpin();
  }
})();
