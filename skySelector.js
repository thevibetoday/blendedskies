function setupSkySelector() {
  const skySelector = document.querySelector('.sky-selector');
  const skyPanorama = document.querySelector('.sky-panorama');
  const skyBackdrop = document.querySelector('.sky-backdrop');
  const orbEmoji = document.querySelector('.orb-emoji');
  const orbInner = document.querySelector('.orb-inner');

  if (!skySelector || !skyPanorama || !skyBackdrop) return;

  skySelector.addEventListener('click', (e) => {
    e.preventDefault();
    const isExpanded = skySelector.getAttribute('aria-expanded') === 'true';
    skySelector.setAttribute('aria-expanded', !isExpanded);
    skyPanorama.classList.toggle('open');
    skyBackdrop.classList.toggle('active');
  });

  skyBackdrop.addEventListener('click', () => {
    skyPanorama.classList.remove('open');
    skyBackdrop.classList.remove('active');
    skySelector.setAttribute('aria-expanded', 'false');
  });

  skySelector.addEventListener('mouseenter', () => {
    orbEmoji.style.opacity = '1';
    orbInner.style.opacity = '0';
  });

  skySelector.addEventListener('mouseleave', () => {
    if (orbEmoji.textContent === '🌤️' && !skyPanorama.classList.contains('open')) {
      orbEmoji.style.opacity = '0';
      orbInner.style.opacity = '1';
    }
  });
}
