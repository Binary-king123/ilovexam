// ================================================================
// iLoveExams Global Fullscreen Enforcer
// Enables immersive full screen mode across all website pages on user interaction.
// ================================================================

(function () {
  function triggerGlobalFullscreen() {
    const docEl = document.documentElement;
    if (
      !document.fullscreenElement &&
      !document.webkitFullscreenElement &&
      !document.mozFullScreenElement &&
      !document.msFullscreenElement
    ) {
      const requestFS =
        docEl.requestFullscreen ||
        docEl.webkitRequestFullscreen ||
        docEl.mozRequestFullScreen ||
        docEl.msRequestFullscreen;

      if (requestFS) {
        requestFS.call(docEl).catch(() => {
          // Silent catch for browser autoplay/fullscreen restriction policies
        });
      }
    }
  }

  function onUserGesture() {
    triggerGlobalFullscreen();
  }

  // Bind to user gesture events to comply with browser user-activation security rules
  window.addEventListener('click', onUserGesture, { passive: true });
  window.addEventListener('touchstart', onUserGesture, { passive: true });
  window.addEventListener('keydown', onUserGesture, { passive: true });

  // Attempt initial trigger on load
  document.addEventListener('DOMContentLoaded', () => {
    triggerGlobalFullscreen();
  });
})();
