// ================================================================
// iLoveExams Global Fullscreen Enforcer
// Triggers immersive full screen mode on first meaningful user gesture.
// Complies with browser user-activation security requirements.
// ================================================================

(function () {
  let fullscreenTriggered = false;

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
    // Remove listeners once triggered (they'll have been set as 'once')
  }

  // Only attach once; use { once: true } so the handler auto-removes
  document.addEventListener('click',      onFirstGesture, { once: true, passive: true });
  document.addEventListener('touchstart', onFirstGesture, { once: true, passive: true });
  document.addEventListener('keydown',    onFirstGesture, { once: true, passive: true });
})();
