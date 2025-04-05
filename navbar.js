document.addEventListener('DOMContentLoaded', function() {
    // Core Elements
    const neuralGate = document.querySelector('.neural-gate');
    const interfaceSphere = document.querySelector('.interface-sphere');
    const neuralDimension = document.querySelector('.neural-dimension');
    const sectorNodes = document.querySelectorAll('.sector-node');
    const skyBackdrop = document.querySelector('.sky-backdrop');
    const noiseOverlay = document.querySelector('.noise-overlay');
    const hologramProjector = document.querySelector('.hologram-projector');
    const navbar = document.querySelector('.quantum-navbar');
    const gateText = document.querySelector('.gate-text');
    const biometricScan = document.querySelector('.biometric-scan');
    const dimensionScanner = document.querySelector('.dimension-scanner');
    
    // Check if all required elements exist
    if (!neuralGate || !interfaceSphere || !neuralDimension || 
        !noiseOverlay || !navbar || !gateText || !biometricScan) {
        console.error('Core neural components missing from dimensional plane.');
        return;
    }
    
    // Quantum State
    let dimensionOpen = false;
    let currentSector = null;
    
    // Create quantum particles
    generateQuantumField();
    
    // Toggle neural dimension
    function toggleDimension() {
        dimensionOpen = !dimensionOpen;
        
        if (dimensionOpen) {
            // Open dimension
            interfaceSphere.classList.add('active');
            neuralDimension.classList.add('open');
            skyBackdrop && skyBackdrop.classList.add('active');
            navbar.classList.add('expanded');
            
            // Scan animation
            dimensionScanner.style.opacity = '1';
            
            // Sequentially reveal sector nodes for dimensional stabilization
            sectorNodes.forEach((node, index) => {
                setTimeout(() => {
                    node.style.opacity = '1';
                    node.style.transform = 'translateY(0)';
                }, 100 + (index * 70));
            });
            
            // Add particle animation
            document.body.classList.add('particles-active');
        } else {
            // Close dimension
            interfaceSphere.classList.remove('active');
            neuralDimension.classList.remove('open');
            skyBackdrop && skyBackdrop.classList.remove('active');
            navbar.classList.remove('expanded');
            
            // Reset dimension scanner
            dimensionScanner.style.opacity = '0';
            
            // Reset sector nodes
            sectorNodes.forEach(node => {
                node.style.opacity = '';
                node.style.transform = '';
            });
            
            // Remove particle animation
            document.body.classList.remove('particles-active');
        }
    }
    
    // Toggle dimension when clicking the neural gate
    neuralGate.addEventListener('click', function(e) {
        e.preventDefault();
        toggleDimension();
        
        // Quantum pulse effect
        createQuantumPulse(e);
    });
    
    // Touch events for neural interfaces
    neuralGate.addEventListener('touchend', function(e) {
        if (!this.isScrolling) {
            e.preventDefault();
            toggleDimension();
        }
    });
    
    // Track scrolling state
    neuralGate.addEventListener('touchmove', function() {
        this.isScrolling = true;
    });
    
    neuralGate.addEventListener('touchstart', function() {
        this.isScrolling = false;
    });
    
    // Close dimension with escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && dimensionOpen) {
            toggleDimension();
        }
    });
    
    // Neural backdrop interaction
    if (skyBackdrop) {
        skyBackdrop.addEventListener('click', function() {
            if (dimensionOpen) toggleDimension();
        });
    }
    
    // Handle sector node selection
    sectorNodes.forEach(node => {
        // Initially hide the nodes
        node.style.opacity = '0';
        node.style.transform = 'translateY(20px)';
        
        node.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get sector data
            const sectorType = this.getAttribute('data-sector');
            
            // Navigate to corresponding neural sector
            if (sectorType) {
                navigateToSector(sectorType);
            }
            
            // Create sector selection pulse
            createSectorPulse(e, this);
        });
        
        // Touch events for neural interfaces
        node.addEventListener('touchend', function(e) {
            if (!this.isScrolling) {
                e.preventDefault();
                
                // Get sector data
                const sectorType = this.getAttribute('data-sector');
                
                // Navigate to corresponding neural sector
                if (sectorType) {
                    navigateToSector(sectorType);
                }
                
                // Create sector selection pulse
                const touch = e.changedTouches[0];
                createSectorPulse({clientX: touch.clientX, clientY: touch.clientY}, this);
            }
        });
        
        // Track scrolling state
        node.addEventListener('touchmove', function() {
            this.isScrolling = true;
        });
        
        node.addEventListener('touchstart', function() {
            this.isScrolling = false;
        });
        
        // Add hover effects for holographic projections
        node.addEventListener('mouseenter', function() {
            const projection = this.querySelector('.node-projection');
            const sectorType = this.getAttribute('data-sector');
            let glowColor;
            
            switch(sectorType) {
                case 'alpha-cognition':
                    glowColor = 'rgba(0, 240, 255, 0.4)';
                    break;
                case 'beta-synthesis':
                    glowColor = 'rgba(119, 0, 255, 0.4)';
                    break;
                case 'gamma-flux':
                    glowColor = 'rgba(255, 0, 170, 0.4)';
                    break;
                case 'delta-void':
                    glowColor = 'rgba(170, 0, 255, 0.4)';
                    break;
                case 'epsilon-nexus':
                    glowColor = 'rgba(0, 255, 170, 0.4)';
                    break;
                default:
                    glowColor = 'rgba(0, 240, 255, 0.3)';
            }
            
            if (projection) {
                projection.style.boxShadow = `0 0 25px ${glowColor}`;
            }
        });
        
        node.addEventListener('mouseleave', function() {
            const projection = this.querySelector('.node-projection');
            if (projection) {
                projection.style.boxShadow = '';
            }
        });
    });
    
    // Neural sector navigation
    function navigateToSector(sectorType) {
        // Map sectors to their corresponding neural pathways
        const neuralPathways = {
            'alpha-cognition': 'cognitive.html',
            'beta-synthesis': 'synthesis.html', 
            'gamma-flux': 'quantum.html',
            'delta-void': 'void.html',
            'epsilon-nexus': 'nexus.html'
        };
        
        // Default pathway if sector type doesn't match mapping
        const defaultPathway = 'index.html';
        
        // Get the neural pathway for the selected sector
        const pathwayUrl = neuralPathways[sectorType] || defaultPathway;
        
        // Initiate neural interface transition
        setTimeout(() => {
            window.location.href = pathwayUrl;
        }, 500);
    }
    
    // Create quantum pulse effect
    function createQuantumPulse(e) {
        const pulse = document.createElement('div');
        pulse.className = 'quantum-pulse';
        
        const rect = neuralGate.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        pulse.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 10px;
            height: 10px;
            background: rgba(0, 240, 255, 0.8);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            z-index: 2000;
            box-shadow: 0 0 20px rgba(0, 240, 255, 0.8);
            pointer-events: none;
            animation: quantum-pulse 1s forwards ease-out;
        `;
        
        document.body.appendChild(pulse);
        
        setTimeout(() => {
            pulse.remove();
        }, 1000);
    }
    
    // Create sector pulse effect
    function createSectorPulse(e, node) {
        const pulse = document.createElement('div');
        pulse.className = 'sector-pulse';
        
        const rect = node.getBoundingClientRect();
        const projection = node.querySelector('.node-projection');
        const projRect = projection.getBoundingClientRect();
        
        const centerX = projRect.left + projRect.width / 2;
        const centerY = projRect.top + projRect.height / 2;
        
        // Get sector color
        const sectorType = node.getAttribute('data-sector');
        let pulseColor;
        
        switch(sectorType) {
            case 'alpha-cognition':
                pulseColor = 'rgba(0, 240, 255, 0.8)';
                break;
            case 'beta-synthesis':
                pulseColor = 'rgba(119, 0, 255, 0.8)';
                break;
            case 'gamma-flux':
                pulseColor = 'rgba(255, 0, 170, 0.8)';
                break;
            case 'delta-void':
                pulseColor = 'rgba(170, 0, 255, 0.8)';
                break;
            case 'epsilon-nexus':
                pulseColor = 'rgba(0, 255, 170, 0.8)';
                break;
            default:
                pulseColor = 'rgba(0, 240, 255, 0.8)';
        }
        
        pulse.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 10px;
            height: 10px;
            background: ${pulseColor};
            border-radius: 50%;
            transform: translate(-50%, -50%);
            z-index: 2000;
            box-shadow: 0 0 20px ${pulseColor};
            pointer-events: none;
            animation: quantum-pulse 1s forwards ease-out;
        `;
        
        document.body.appendChild(pulse);
        
        setTimeout(() => {
            pulse.remove();
        }, 1000);
    }
    
    // Add quantum pulse animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes quantum-pulse {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(20); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Generate quantum field
    function generateQuantumField() {
        const particleCount = window.innerWidth < 768 ? 30 : 50;
        const container = document.createElement('div');
        container.className = 'quantum-field';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0;
            transition: opacity 1s ease;
        `;
        
        document.body.appendChild(container);
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'quantum-particle';
            
            // Random particle properties
            const size = Math.random() * 3 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 5 + 5;
            const color = Math.random() > 0.5 ? 'var(--neural-primary)' : 'var(--neural-secondary)';
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}vw;
                top: ${y}vh;
                background: ${color};
                border-radius: 50%;
                box-shadow: 0 0 ${size * 3}px ${color};
                animation: float-particle ${duration}s infinite ease-in-out ${delay}s;
                opacity: 0.7;
            `;
            
            container.appendChild(particle);
        }
        
        // Add particle animation
        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            @keyframes float-particle {
                0%, 100% { transform: translate(0, 0); }
                25% { transform: translate(${Math.random() * 30 + 10}px, -${Math.random() * 30 + 10}px); }
                50% { transform: translate(${Math.random() * 20 + 5}px, ${Math.random() * 30 + 10}px); }
                75% { transform: translate(-${Math.random() * 30 + 10}px, ${Math.random() * 20 + 5}px); }
            }
            
            body.particles-active .quantum-field {
                opacity: 1;
            }
        `;
        document.head.appendChild(particleStyle);
    }
    
    // Handle scroll effects
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Neural interfaces adjust based on scroll
        if (scrollTop > 20) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 240, 255, 0.15)';
            navbar.style.borderBottom = '1px solid rgba(0, 240, 255, 0.3)';
            
            if (window.innerWidth > 480) {
                navbar.style.height = '65px';
            } else {
                navbar.style.height = '55px';
            }
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.borderBottom = '1px solid rgba(0, 240, 255, 0.2)';
            
            if (window.innerWidth > 480) {
                navbar.style.height = '80px';
            } else {
                navbar.style.height = '60px';
            }
        }
    });
    
    // Parallax effect for quantum field
    document.addEventListener('mousemove', function(e) {
        if (!document.body.classList.contains('particles-active')) return;
        
        const particles = document.querySelectorAll('.quantum-particle');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        particles.forEach(particle => {
            const depthFactor = parseFloat(particle.style.width) / 2;
            const moveX = (mouseX - 0.5) * depthFactor * 20;
            const moveY = (mouseY - 0.5) * depthFactor * 20;
            
            particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Reset quantum field
        const existingField = document.querySelector('.quantum-field');
        if (existingField) {
            existingField.remove();
        }
        
        generateQuantumField();
        
        // Adjust navbar height
        if (window.innerWidth <= 480) {
            navbar.style.height = dimensionOpen ? '55px' : '60px';
        } else {
            navbar.style.height = dimensionOpen ? '65px' : '80px';
        }
    });
    
    // Initialize questionnaire selection
    const optionItems = document.querySelectorAll('.options li');
    optionItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove selection from siblings
            const siblings = Array.from(this.parentNode.children);
            siblings.forEach(sibling => {
                sibling.classList.remove('selected');
            });
            
            // Add selection to clicked item
            this.classList.add('selected');
            
            // Create selection pulse
            const rect = this.getBoundingClientRect();
            const pulse = document.createElement('div');
            pulse.className = 'selection-pulse';
            
            pulse.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                width: 5px;
                height: 5px;
                background: var(--neural-primary);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                z-index: 1100;
                box-shadow: 0 0 10px var(--neural-primary);
                pointer-events: none;
                animation: selection-pulse 0.5s forwards ease-out;
            `;
            
            document.body.appendChild(pulse);
            
            setTimeout(() => {
                pulse.remove();
            }, 500);
        });
    });
    
    // Add selection pulse animation
    const selectionStyle = document.createElement('style');
    selectionStyle.textContent = `
        @keyframes selection-pulse {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(10); opacity: 0; }
        }
    `;
    document.head.appendChild(selectionStyle);
});
