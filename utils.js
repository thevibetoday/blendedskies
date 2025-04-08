function initializeImagesObserver() {
  // Lazy load images using IntersectionObserver
}

function hideLoadingOverlay() {
  const overlay = document.getElementById('loading-overlay');
  if (!overlay) return;
  overlay.classList.add('hidden');
  setTimeout(() => overlay.style.display = 'none', 300);
}

function showNotification(message) {
  let notification = document.querySelector('.add-notification');
  if (!notification) {
    notification = document.createElement('div');
    notification.className = 'add-notification';
    document.body.appendChild(notification);
  }

  notification.textContent = message;
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

function setupScrollBehavior() {
  const canvasControls = document.querySelector('.canvas-controls');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      canvasControls?.classList.add('scrolled');
    } else {
      canvasControls?.classList.remove('scrolled');
    }
  });
}
