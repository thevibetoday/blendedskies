document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('navbar');
  const navItems = document.querySelectorAll('.nav-item[data-dropdown]');
  const dropdownWrapper = document.getElementById('dropdown-wrapper');
  const dropdownContainers = document.querySelectorAll('.dropdown-container');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  // Handle dropdown hover
  navItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const dropdownId = item.getAttribute('data-dropdown');
      dropdownContainers.forEach(c => c.classList.remove('active'));
      const activeDropdown = document.getElementById(dropdownId);
      if (activeDropdown) {
        activeDropdown.classList.add('active');
        dropdownWrapper.classList.add('expanded');
      }
    });
  });

  // Close dropdown on mouse leave
  navbar.addEventListener('mouseleave', () => {
    dropdownWrapper.classList.remove('expanded');
    dropdownContainers.forEach(c => c.classList.remove('active'));
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Optional: close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      dropdownWrapper.classList.remove('expanded');
      dropdownContainers.forEach(c => c.classList.remove('active'));
    }
  });
});
