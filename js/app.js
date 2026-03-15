// Core Application Logic

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const viewContainer = document.getElementById('viewContainer');
    
    // Store instances of our views
    const views = {
        dashboard: window.DashboardView,
        medicineFinder: window.MedicineFinderView,
        consultTracker: window.ConsultTrackerView,
        reportAnalyzer: window.ReportAnalyzerView,
        medicineRecommender: window.MedicineRecommenderView
    };

    // Navigation and View Routing
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked
            item.classList.add('active');
            
            const viewName = item.getAttribute('data-view');
            loadView(viewName);
        });
    });

    function loadView(viewName) {
        const transitionOverlay = document.getElementById('transitionOverlay');
        const needsTransition = ['medicineFinder', 'reportAnalyzer', 'medicineRecommender'].includes(viewName);

        if (needsTransition && transitionOverlay) {
            // Update overlay text dynamically
            const titleEl = transitionOverlay.querySelector('.transition-text');
            if (viewName === 'medicineFinder') {
                titleEl.textContent = "Don't waste your time searching in different sites, we got it covered.";
                titleEl.style.fontSize = "22px";
                titleEl.style.lineHeight = "1.4";
                titleEl.style.padding = "0 20px";
            } else if (viewName === 'reportAnalyzer') {
                titleEl.textContent = "Don't waste your time trying to decode complex medical jargon, we got it covered.";
                titleEl.style.fontSize = "22px";
                titleEl.style.lineHeight = "1.4";
                titleEl.style.padding = "0 20px";
            } else if (viewName === 'medicineRecommender') {
                titleEl.textContent = "Don't waste your time figuring out which medicine is best, we got it covered.";
                titleEl.style.fontSize = "22px";
                titleEl.style.lineHeight = "1.4";
                titleEl.style.padding = "0 20px";
            }

            // Show transition overlay first
            transitionOverlay.classList.remove('active');
            
            // Force reflow to reset animation
            void transitionOverlay.offsetWidth;
            
            transitionOverlay.classList.add('active');
            
            // Wait for animation, then swap content, then fade out
            setTimeout(() => {
                renderViewContent(viewName);
                
                setTimeout(() => {
                    transitionOverlay.classList.remove('active');
                }, 600); // Wait a bit after rendering to fade out
            }, 1800); // 1.8s for drawing and text animations to finish
        } else {
            renderViewContent(viewName);
        }
    }

    function renderViewContent(viewName) {
        // Clear current view
        viewContainer.innerHTML = '';
        
        // If view class exists, render it
        if (views[viewName]) {
            const viewInstance = new views[viewName]();
            viewContainer.appendChild(viewInstance.render());
            
            // Add active class for animation
            setTimeout(() => {
                const section = viewContainer.querySelector('.view-section');
                if (section) section.classList.add('active');
            }, 10);
        } else {
            // Fallback content if view script isn't loaded yet
            viewContainer.innerHTML = `
                <div class="view-section active glass-card" style="text-align: center; padding: 60px;">
                    <i class="ri-loader-4-line" style="font-size: 48px; color: var(--primary); animation: spin 1s linear infinite;"></i>
                    <h2 style="margin-top: 20px;">Loading View...</h2>
                </div>
            `;
            
            console.error(`View ${viewName} not found.`);
            // For now, load Dashboard logic by default if others are missing
            if(viewName !== 'dashboard' && views.dashboard) {
                 setTimeout(() => loadView('dashboard'), 1000);
            }
        }
    }

    // Add spin animation to global styles via JS for fallback loader
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin { 100% { transform: rotate(360deg); } }
        /* Toast Notification Styles */
        .toast {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: var(--bg-surface);
            border: 1px solid var(--primary);
            color: var(--text-main);
            padding: 16px 24px;
            border-radius: var(--radius-md);
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
            z-index: 1000;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s, transform 0.3s;
        }
        .toast.show {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Toast Functionality
    window.showToast = function(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Trigger reflow for animation
        setTimeout(() => toast.classList.add('show'), 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // Header actions
    const notifBtn = document.querySelector('.notification-btn');
    const settingsBtn = document.querySelectorAll('.header-actions .icon-btn')[1];

    // Panels
    const pageOverlay = document.getElementById('pageOverlay');
    const settingsPanel = document.getElementById('settingsPanel');
    const notificationsPanel = document.getElementById('notificationsPanel');
    
    // Panel Toggles
    if(notifBtn) {
        notifBtn.addEventListener('click', () => {
            notificationsPanel.classList.add('open');
            pageOverlay.classList.add('open');
        });
    }

    if(settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            settingsPanel.classList.add('open');
            pageOverlay.classList.add('open');
        });
    }

    // Close buttons and overlay
    document.querySelectorAll('.close-btn, #pageOverlay, #saveSettingsBtn').forEach(btn => {
        btn.addEventListener('click', () => {
            if(btn.id === 'saveSettingsBtn') window.showToast('Settings saved successfully!');
            settingsPanel.classList.remove('open');
            notificationsPanel.classList.remove('open');
            pageOverlay.classList.remove('open');
        });
    });

    // Theme Toggle
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if(themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const switchEl = document.getElementById('themeSwitch');
            const iconEl = document.getElementById('themeIcon');
            const textEl = document.getElementById('themeText');
            
            if(document.body.classList.contains('light-theme')) {
                // Light mode active
                switchEl.classList.remove('active');
                iconEl.className = 'ri-sun-fill';
                textEl.textContent = 'Light Mode';
            } else {
                // Dark mode active
                switchEl.classList.add('active');
                iconEl.className = 'ri-moon-fill';
                textEl.textContent = 'Dark Mode';
            }
        });
    }

    // Initial Load
    loadView('dashboard');
});
