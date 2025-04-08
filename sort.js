function setupSorting() {
  const sortSelect = document.getElementById('sort-select');
  if (!sortSelect) return;

  sortSelect.addEventListener('change', () => {
    const sortValue = sortSelect.value;
    // Sort logic and reappend items to DOM
  });
}
