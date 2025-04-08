document.addEventListener('DOMContentLoaded', () => {
  initializeImagesObserver();
  updateProductFilters();
  hideLoadingOverlay();
  setupSkySelector();
  setupFilters();
  setupSorting();
  setupPagination();
  setupInteractions();
  applySkyFromURL();
  setupScrollBehavior();
});
