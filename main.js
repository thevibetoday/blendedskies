document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const searchBtn = document.getElementById('searchBtn');
  const searchModal = document.getElementById('searchModal');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const notifyBtn = document.getElementById('notifyBtn');
  const notificationDrawer = document.getElementById('notificationDrawer');
  const notificationItems = document.querySelectorAll('.notification-item');
  const notificationCloseButtons = document.querySelectorAll('.notification-close');
  const themeToggle = document.getElementById('themeToggle');
  const contextMenu = document.getElementById('contextMenu');
  const progressBar = document.getElementById('progressBar');
  let isNavExpanded = false;
  let isNotificationOpen = false;
  
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navbar.classList.toggle('expanded');
    isNavExpanded = !isNavExpanded;
  });
  
  searchBtn.addEventListener('click', function() {
    searchModal.classList.add('active');
    setTimeout(() => {
      searchInput.focus();
    }, 100);
  });
  
  searchClose.addEventListener('click', function() {
    searchModal.classList.remove('active');
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && searchModal.classList.contains('active')) {
      searchModal.classList.remove('active');
    }
  });
  
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    if (query.length > 1) {
      const results = [
        { icon: 'D', title: 'Dashboard', desc: 'Main control panel' },
        { icon: 'P', title: 'Projects', desc: 'Your active projects' },
        { icon: 'A', title: 'Analytics', desc: 'Performance metrics' },
        { icon: 'S', title: 'Settings', desc: 'System preferences' },
        { icon: 'U', title: 'Users', desc: 'Team members' }
      ].filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.desc.toLowerCase().includes(query)
      );
      
      searchResults.innerHTML = '';
      
      results.forEach(result => {
        const resultCard = document.createElement('div');
        resultCard.className = 'result-card';
        resultCard.innerHTML = `
          <div class="result-icon">${result.icon}</div>
          <div class="result-title">${result.title}</div>
          <div class="result-desc">${result.desc}</div>
        `;
        searchResults.appendChild(resultCard);
        resultCard.style.animationDelay = `${searchResults.children.length * 0.05}s`;
      });
    } else {
      searchResults.innerHTML = '';
    }
  });
  
  notifyBtn.addEventListener('click', function() {
    notificationDrawer.classList.toggle('active');
    isNotificationOpen = !isNotificationOpen;
    
    if (isNavExpanded) {
      menuToggle.classList.remove('active');
      navbar.classList.remove('expanded');
      isNavExpanded = false;
    }
  });
  
  notificationCloseButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const notificationItem = this.parentNode;
      notificationItem.style.height = `${notificationItem.offsetHeight}px`;
      
      notificationItem.offsetHeight;
      
      notificationItem.style.height = '0';
      notificationItem.style.opacity = '0';
      notificationItem.style.margin = '0';
      notificationItem.style.padding = '0';
      
      setTimeout(() => {
        notificationItem.remove();
        
        const remainingNew = document.querySelectorAll('.notification-item.new').length;
        const badge = notifyBtn.querySelector('.badge');
        badge.textContent = remainingNew;
        
        if (remainingNew === 0) {
          badge.style.display = 'none';
        }
      }, 300);
    });
  });
  
  themeToggle.addEventListener('click', function() {
    this.classList.toggle('dark');
    
    document.body.classList.toggle('light-theme');
    
    if (document.body.classList.contains('light-theme')) {
      document.documentElement.style.setProperty('--dark', '#f8f8f8');
      document.documentElement.style.setProperty('--light', '#222');
    } else {
      document.documentElement.style.setProperty('--dark', '#111');
      document.documentElement.style.setProperty('--light', '#f8f8f8');
    }
  });
  
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    
    const x = e.clientX;
    const y = e.clientY;
    
    contextMenu.style.display = 'flex';
    contextMenu.style.top = `${y}px`;
    contextMenu.style.left = `${x}px`;
    
    const menuRect = contextMenu.getBoundingClientRect();
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    
    if (menuRect.right > screenW) {
      contextMenu.style.left = `${screenW - menuRect.width - 10}px`;
    }
    
    if (menuRect.bottom > screenH) {
      contextMenu.style.top = `${screenH - menuRect.height - 10}px`;
    }
  });
  
  document.addEventListener('click', function() {
    contextMenu.style.display = 'none';
  });
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
  
  document.addEventListener('click', function(e) {
    if (isNotificationOpen && !notificationDrawer.contains(e.target) && !notifyBtn.contains(e.target)) {
      notificationDrawer.classList.remove('active');
      isNotificationOpen = false;
    }
  });
  
  const menuItems = document.querySelectorAll('.menu-item');
  
  menuItems.forEach(item => {
    item.addEventListener('mouseover', function() {
      this.style.transform = 'translateY(-5px) scale(1.05)';
      this.style.boxShadow = '0 10px 25px rgba(0, 255, 255, 0.3)';
    });
    
    item.addEventListener('mouseout', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });
  
  const navPills = document.querySelectorAll('.nav-pill');
  
  navPills.forEach(pill => {
    pill.addEventListener('mouseover', function() {
      navPills.forEach(p => {
        if (p !== this) {
          p.style.opacity = '0.6';
        }
      });
    });
    
    pill.addEventListener('mouseout', function() {
      navPills.forEach(p => {
        p.style.opacity = '1';
      });
    });
  });
  
  navbar.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const angleY = (x - centerX) / centerX * 2;
    const angleX = (y - centerY) / centerY * 1;
    
    this.style.transform = `perspective(1000px) rotateX(${-angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
  });
  
  navbar.addEventListener('mouseleave', function() {
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
  
  function createStars() {
    const stars = 100;
    const searchModalBg = searchModal;
    
    for (let i = 0; i < stars; i++) {
      const star = document.createElement('span');
      star.className = 'star';
      
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 2;
      const duration = 3 + Math.random() * 7;
      
      star.style.cssText = `
        position: absolute;
        top: ${y}%;
        left: ${x}%;
        width: ${size}px;
        height: ${size}px;
        background: rgba(0, 255, 255, ${Math.random() * 0.7 + 0.3});
        border-radius: 50%;
        z-index: -1;
        opacity: ${Math.random()};
        animation: twinkle ${duration}s infinite alternate;
      `;
      
      searchModalBg.appendChild(star);
    }
  }
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes twinkle {
      0% { opacity: 0.3; transform: scale(0.7); }
      100% { opacity: 1; transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
  
  createStars();
  
  function simulateNewNotification() {
    const notifications = [
      'Your project has been updated.',
      'New message from Team Lead: "Great work!"',
      'System maintenance scheduled for tomorrow.',
      'Your analytics report is ready to view.',
      'New feature has been deployed successfully.'
    ];
    
    const randomIndex = Math.floor(Math.random() * notifications.length);
    const message = notifications[randomIndex];
    
    const notificationItem = document.createElement('div');
    notificationItem.className = 'notification-item new';
    notificationItem.innerHTML = `
      <div class="notification-time">Just now</div>
      <div class="notification-message">${message}</div>
      <button class="notification-close">×</button>
    `;
    
    const notificationList = document.getElementById('notificationList');
    notificationList.insertBefore(notificationItem, notificationList.firstChild);
    
    const badge = notifyBtn.querySelector('.badge');
    const newCount = parseInt(badge.textContent) + 1;
    badge.textContent = newCount;
    badge.style.display = 'flex';
    
    notifyBtn.classList.add('pulse');
    setTimeout(() => {
      notifyBtn.classList.remove('pulse');
    }, 2000);
    
    const closeBtn = notificationItem.querySelector('.notification-close');
    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      const item = this.parentNode;
      
      item.style.height = `${item.offsetHeight}px`;
      item.offsetHeight;
      
      item.style.height = '0';
      item.style.opacity = '0';
      item.style.margin = '0';
      item.style.padding = '0';
      
      setTimeout(() => {
        item.remove();
        
        const remainingNew = document.querySelectorAll('.notification-item.new').length;
        badge.textContent = remainingNew;
        
        if (remainingNew === 0) {
          badge.style.display = 'none';
        }
      }, 300);
    });
  }
  
  setInterval(() => {
    if (Math.random() > 0.5) {
      simulateNewNotification();
    }
  }, 30000 + Math.random() * 30000);
  
  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    let lastTap = 0;
    navbar.addEventListener('click', function() {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      
      if (tapLength < 500 && tapLength > 0) {
        recognition.start();
        
        const listeningIndicator = document.createElement('div');
        listeningIndicator.className = 'listening-indicator';
        listeningIndicator.innerHTML = 'Listening...';
        listeningIndicator.style.cssText = `
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 255, 255, 0.2);
          color: var(--primary);
          padding: 10px 20px;
          border-radius: 20px;
          font-weight: bold;
          z-index: 1000;
        `;
        document.body.appendChild(listeningIndicator);
        
        recognition.onend = function() {
          document.body.removeChild(listeningIndicator);
        };
      }
      lastTap = currentTime;
    });
    
    recognition.onresult = function(event) {
      const command = event.results[0][0].transcript.toLowerCase();
      
      if (command.includes('search')) {
        searchModal.classList.add('active');
        setTimeout(() => {
          searchInput.focus();
        }, 100);
      } else if (command.includes('notification')) {
        notificationDrawer.classList.toggle('active');
        isNotificationOpen = !isNotificationOpen;
      } else if (command.includes('theme') || command.includes('dark') || command.includes('light')) {
        themeToggle.click();
      }
    };
  }
  
  const buttons = document.querySelectorAll('.action-btn, .avatar');
  
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(x - centerX, 2) + 
        Math.pow(y - centerY, 2)
      );
      
      if (distance < 50) {
        const pull = 1 - distance / 50;
        const moveX = (x - centerX) * pull * 0.2;
        const moveY = (y - centerY) * pull * 0.2;
        
        this.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
  
  const logo = document.querySelector('.logo');
  const logoIcon = document.querySelector('.logo-icon');
  
  logo.addEventListener('mouseenter', function() {
    for (let i = 0; i < 10; i++) {
      createParticle();
    }
  });
  
  function createParticle() {
    const particle = document.createElement('span');
    particle.className = 'logo-particle';
    
    const rect = logoIcon.getBoundingClientRect();
    const size = Math.random() * 5 + 2;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${Math.random() > 0.5 ? 'var(--primary)' : 'var(--secondary)'};
      border-radius: 50%;
      top: ${rect.top + rect.height/2 + (Math.random() - 0.5) * 20}px;
      left: ${rect.left + rect.width/2 + (Math.random() - 0.5) * 20}px;
      pointer-events: none;
      opacity: ${Math.random() * 0.5 + 0.5};
      z-index: 1000;
    `;
    
    document.body.appendChild(particle);
    
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 60 + 40;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    let opacity = 1;
    
    function animate() {
      const x = parseFloat(particle.style.left);
      const y = parseFloat(particle.style.top);
      
      particle.style.left = `${x + vx * 0.05}px`;
      particle.style.top = `${y + vy * 0.05}px`;
      
      opacity -= 0.02;
      particle.style.opacity = opacity;
      
      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        particle.remove();
      }
    }
    
    requestAnimationFrame(animate);
  }
});
