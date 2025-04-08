function setupInteractions() {
  document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const product = btn.closest('.product-item');
      const productName = product.querySelector('h3').textContent;
      if (btn.classList.contains('add-btn')) {
        showNotification(`${productName} added to bag`);
      }
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const panorama = document.querySelector('.sky-panorama');
      const backdrop = document.querySelector('.sky-backdrop');
      const selector = document.querySelector('.sky-selector');
      if (panorama?.classList.contains('open')) {
        panorama.classList.remove('open');
        backdrop.classList.remove('active');
        selector.setAttribute('aria-expanded', 'false');
      }
    }
  });
}
