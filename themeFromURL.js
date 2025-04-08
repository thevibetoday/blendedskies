function applySkyFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const skyParam = urlParams.get('sky');
  const validSkies = ['blended', 'clear-blue', 'sunset-glow', 'storm-brewing', 'starry-night', 'rainbow-sky'];

  if (!skyParam || !validSkies.includes(skyParam)) return;

  // Apply skyParam to DOM and update visuals
}
