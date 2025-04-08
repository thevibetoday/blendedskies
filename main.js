async function submitUserInfo() {
  const name = document.getElementById('userName').value.trim();
  const email = document.getElementById('userEmail').value.trim();
  const mood = document.getElementById('userMood').value;
  const vibe = document.getElementById('userVibe').value;

  if (!name || !email || !mood || !vibe) {
    alert("Please complete all fields!");
    return;
  }

  const payload = {
    name,
    email,
    mood,
    vibe,
    time: new Date().toISOString(),
    url: window.location.href
  };

  // Save to localStorage
  localStorage.setItem('blendedskies_user', JSON.stringify(payload));

  // OPTIONAL: Save to Google Sheets via Apps Script
  try {
    await fetch('https://script.google.com/macros/s/YOUR_DEPLOYED_SCRIPT_ID/exec', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error("Google Sheets save error:", e);
  }

  // Hide the welcome overlay
  document.getElementById('welcomeOverlay').style.display = 'none';

  // OPTIONAL: Redirect to experience based on vibe
  // window.location.href = `navbar.html?sky=${vibe}`;
}

// On page load, hide form if already submitted before
window.onload = () => {
  const existing = localStorage.getItem('blendedskies_user');
  if (existing) {
    document.getElementById('welcomeOverlay').style.display = 'none';
    // OPTIONAL: auto-redirect to their previous spot
    // const data = JSON.parse(existing);
    // window.location.href = `navbar.html?sky=${data.vibe}`;
  }
};
