// ================================================================
// iLoveExams Global Fullscreen Enforcer
// Triggers immersive full screen mode on first meaningful user gesture on Desktop.
// Strictly bypassed on Mobile / Tablet devices.
// ================================================================

(function () {
  let fullscreenTriggered = false;

  // Detect mobile/tablet devices
  const isMobile = window.innerWidth <= 991 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) {
    return; // Completely disable global fullscreen on mobile/tablets
  }

  function triggerGlobalFullscreen() {
    if (fullscreenTriggered) return;   // Only trigger once per page load
    if (document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement) {
      fullscreenTriggered = true;
      return; // Already fullscreen
    }

    const docEl = document.documentElement;
    const requestFS =
      docEl.requestFullscreen ||
      docEl.webkitRequestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.msRequestFullscreen;

    if (requestFS) {
      requestFS.call(docEl)
        .then(() => { fullscreenTriggered = true; })
        .catch(() => {
          // Browser denied — don't retry, respect the decision
          fullscreenTriggered = true;
        });
    }
  }

  // Unbind after first successful trigger to avoid repeated calls
  function onFirstGesture() {
    triggerGlobalFullscreen();
  }

  // Only attach once; use { once: true } so the handler auto-removes
  document.addEventListener('click',      onFirstGesture, { once: true, passive: true });
  document.addEventListener('touchstart', onFirstGesture, { once: true, passive: true });
  document.addEventListener('keydown',    onFirstGesture, { once: true, passive: true });
})();
