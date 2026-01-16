// ============================================
// Dynamite Sports Learner - Main JavaScript
// ============================================

// Sports Data
const sportsData = [
    {
        id: 6,
        name: 'Volleyball',
        icon: 'fa-volleyball-ball',
        difficulty: 'beginner',
        duration: '5-7 weeks',
        description: 'Master serving, spiking, and team coordination in this exciting sport.',
        skills: ['Serve', 'Bump', 'Set', 'Spike', 'Block', 'Team Communication'],
        equipmentNeeded: ['Volleyball', 'Knee pads', 'Athletic shoes', 'Comfortable athletic wear'],
        benefits: ['Team coordination', 'Upper body strength', 'Quick reflexes', 'Cardiovascular fitness', 'Strategic thinking'],
        learnLink: 'https://dylyyy.github.io/DynamiteSportsLearner/'
    },
    {
        id: 1,
        name: 'Basketball',
        icon: 'fa-basketball-ball',
        difficulty: 'beginner',
        duration: '4-6 weeks',
        description: 'Learn dribbling, shooting, and team play fundamentals.',
        skills: ['Dribbling', 'Shooting', 'Passing', 'Defense', 'Teamwork'],
        equipmentNeeded: ['Basketball', 'Athletic shoes', 'Comfortable clothing'],
        benefits: ['Improves coordination', 'Builds teamwork', 'Enhances cardiovascular health'],
        learnLink: 'https://23026902.github.io/c240-chatbot/'
    },
    {
        id: 4,
        name: 'Table Tennis',
        icon: 'fa-table-tennis',
        difficulty: 'intermediate',
        duration: '6-8 weeks',
        description: 'Develop serve, forehand, backhand, and court strategy.',
        skills: ['Serve', 'Forehand', 'Backhand', 'Volley', 'Footwork'],
        equipmentNeeded: ['Ping pong paddle', 'Ping pong balls', 'Table tennis table'],
        benefits: ['Improves agility', 'Strategic thinking', 'Hand-eye coordination'],
        learnLink: 'https://bernicepoh.github.io/FA-Table-Tennis/'
    },
    {
        id: 10,
        name: 'Bowling',
        icon: 'fa-bowling-ball',
        difficulty: 'beginner',
        duration: '3-4 weeks',
        description: 'Learn proper bowling technique, grip, and lane strategy.',
        skills: ['Proper grip', 'Approach', 'Release', 'Pin targeting', 'Spare techniques'],
        equipmentNeeded: ['Bowling shoes', 'Bowling ball', 'Bowling glove (optional)'],
        benefits: ['Improves coordination', 'Hand-eye coordination', 'Precision and focus'],
        learnLink: 'https://23000518-nurqistina.github.io/FA-Bowling-Coach/'
    },
    {
        id: 5,
        name: 'Badminton',
        icon: 'fa-solid fa-feather',
        difficulty: 'beginner',
        duration: '3-4 weeks',
        description: 'Learn serves, smashes, and court positioning.',
        skills: ['Serve', 'Clear', 'Drop shot', 'Smash', 'Footwork'],
        equipmentNeeded: ['Badminton racket', 'Shuttlecocks', 'Court shoes'],
        benefits: ['Improves reflexes', 'Builds stamina', 'Enhances flexibility'],
        learnLink: 'https://irdinnaaaaaaaaa.github.io/final/'
    }
];

// ============================================
// DOM Elements
// ============================================
const sportsGrid = document.getElementById('sports-grid');
const searchInput = document.getElementById('sport-search');
const modal = document.getElementById('sport-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contact-form');
const loadingSpinner = document.getElementById('loading-spinner');
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');

// ============================================
// Initialize Application
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initSportsCards();
    initSearch();
    initNavigation();
    initModal();
    initContactForm();
    initSmoothScroll();
    initProgressTracking();
    initAnimations();
    initChatbot();
});

// ============================================
// Sports Cards Rendering
// ============================================
function initSportsCards() {
    renderSportsCards(sportsData);
}

function renderSportsCards(sports) {
    if (!sportsGrid) return;
    
    sportsGrid.innerHTML = '';
    
    if (sports.length === 0) {
        sportsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-light);">No sports found matching your search.</p>';
        return;
    }
    
    sports.forEach(sport => {
        const card = createSportCard(sport);
        sportsGrid.appendChild(card);
    });
}

function createSportCard(sport) {
    const card = document.createElement('div');
    card.className = 'sport-card';
    card.setAttribute('data-sport-id', sport.id);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Learn more about ${sport.name}`);
    
    card.innerHTML = `
        <div class="sport-card-header">
            <div class="sport-card-icon">
                <i class="fas ${sport.icon}" aria-hidden="true"></i>
            </div>
            <h3 class="sport-card-title">${sport.name}</h3>
        </div>
        <div class="sport-card-body">
            <p class="sport-card-description">${sport.description}</p>
            <div class="sport-card-meta">
                <span class="difficulty-badge difficulty-${sport.difficulty}">
                    ${sport.difficulty.charAt(0).toUpperCase() + sport.difficulty.slice(1)}
                </span>
                <span><i class="far fa-clock" aria-hidden="true"></i> ${sport.duration}</span>
            </div>
        </div>
    `;
    
    // Click event
    card.addEventListener('click', () => openSportModal(sport));
    
    // Keyboard accessibility
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openSportModal(sport);
        }
    });
    
    return card;
}

// ============================================
// Search Functionality
// ============================================
function initSearch() {
    if (!searchInput) return;
    
    searchInput.addEventListener('input', debounce((e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            renderSportsCards(sportsData);
            return;
        }
        
        const filteredSports = sportsData.filter(sport => {
            return sport.name.toLowerCase().includes(searchTerm) ||
                   sport.description.toLowerCase().includes(searchTerm) ||
                   sport.difficulty.toLowerCase().includes(searchTerm);
        });
        
        renderSportsCards(filteredSports);
    }, 300));
}

// Debounce utility function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// Modal Functionality
// ============================================
function initModal() {
    if (!modal || !modalClose) return;
    
    modalClose.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function openSportModal(sport) {
    if (!modal || !modalBody) return;
    
    const isCompleted = isSkillCompleted(sport.id);
    
    modalBody.innerHTML = `
        <div class="modal-sport-detail">
            <div style="text-align: center; margin-bottom: 2rem;">
                <i class="fas ${sport.icon}" style="font-size: 4rem; color: var(--color-primary);"></i>
                <h2 style="color: var(--color-secondary); margin-top: 1rem;">${sport.name}</h2>
                <span class="difficulty-badge difficulty-${sport.difficulty}">${sport.difficulty.charAt(0).toUpperCase() + sport.difficulty.slice(1)}</span>
            </div>
            
            <p style="color: var(--color-text-light); margin-bottom: 1.5rem;">${sport.description}</p>
            
            <div style="margin-bottom: 1.5rem;">
                <h3 style="color: var(--color-secondary); margin-bottom: 0.5rem;">
                    <i class="fas fa-dumbbell"></i> Skills You'll Learn
                </h3>
                <ul style="list-style: disc; margin-left: 2rem; color: var(--color-text);">
                    ${sport.skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h3 style="color: var(--color-secondary); margin-bottom: 0.5rem;">
                    <i class="fas fa-shopping-bag"></i> Equipment Needed
                </h3>
                <ul style="list-style: disc; margin-left: 2rem; color: var(--color-text);">
                    ${sport.equipmentNeeded.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <h3 style="color: var(--color-secondary); margin-bottom: 0.5rem;">
                    <i class="fas fa-heart"></i> Health Benefits
                </h3>
                <ul style="list-style: disc; margin-left: 2rem; color: var(--color-text);">
                    ${sport.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                </ul>
            </div>
            
            <div style="text-align: center; margin-top: 2rem;">
                <a 
                    href="${sport.learnLink}" 
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-primary" 
                    style="display: inline-block; margin-right: 1rem; text-decoration: none;">
                    <i class="fas fa-external-link-alt"></i> Learn More
                </a>
                <p style="margin-top: 1rem; color: var(--color-text-light); font-size: 0.875rem;">
                    <i class="far fa-clock"></i> Estimated duration: ${sport.duration}
                </p>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    
    // Focus trap
    modalClose.focus();
}

function closeModal() {
    if (!modal) return;
    
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
}

// ============================================
// Navigation
// ============================================
function initNavigation() {
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isExpanded = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close menu when clicking on links
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ============================================
// Smooth Scrolling
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for # only links
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// Contact Form
// ============================================
function initContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        // Validate
        if (!validateEmail(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading
        showLoading();
        
        // Simulate form submission
        setTimeout(() => {
            hideLoading();
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        }, 1500);
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// Progress Tracking with LocalStorage
// ============================================
function initProgressTracking() {
    // Check if localStorage is available
    if (typeof(Storage) === "undefined") {
        console.warn('LocalStorage not available');
        return;
    }
}

function isSkillCompleted(sportId) {
    const completedSkills = JSON.parse(localStorage.getItem('completedSkills') || '[]');
    return completedSkills.includes(sportId);
}

function toggleSkillCompletion(sportId) {
    let completedSkills = JSON.parse(localStorage.getItem('completedSkills') || '[]');
    
    if (completedSkills.includes(sportId)) {
        completedSkills = completedSkills.filter(id => id !== sportId);
        showNotification('Removed from completed skills', 'info');
    } else {
        completedSkills.push(sportId);
        showNotification('Congratulations! Skill marked as completed! 🎉', 'success');
    }
    
    localStorage.setItem('completedSkills', JSON.stringify(completedSkills));
    
    // Find the sport and reopen modal
    const sport = sportsData.find(s => s.id === sportId);
    if (sport) {
        openSportModal(sport);
    }
}

// ============================================
// Notification System
// ============================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--color-success)' : type === 'error' ? 'var(--color-primary)' : 'var(--color-secondary)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 4000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations to styles dynamically
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// ============================================
// Loading Spinner
// ============================================
function showLoading() {
    if (loadingSpinner) {
        loadingSpinner.classList.add('active');
    }
}

function hideLoading() {
    if (loadingSpinner) {
        loadingSpinner.classList.remove('active');
    }
}

// ============================================
// Scroll Animations
// ============================================
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll('.feature-card, .sport-card, .step, .showcase-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ============================================
// Performance Optimization - Lazy Loading
// ============================================
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// Utility Functions
// ============================================

// Get user's learning progress
function getUserProgress() {
    const completedSkills = JSON.parse(localStorage.getItem('completedSkills') || '[]');
    const totalSkills = sportsData.length;
    const percentage = Math.round((completedSkills.length / totalSkills) * 100);
    
    return {
        completed: completedSkills.length,
        total: totalSkills,
        percentage: percentage
    };
}

// Export functions for use in HTML onclick attributes
window.toggleSkillCompletion = toggleSkillCompletion;
window.openSportModal = openSportModal;
window.closeModal = closeModal;

// ============================================
// Chatbot Functionality
// ============================================
function initChatbot() {
    if (!chatbotToggle || !chatbotWindow || !chatbotClose) return;
    
    // Toggle chatbot window
    chatbotToggle.addEventListener('click', () => {
        toggleChatbot();
    });
    
    // Close chatbot
    chatbotClose.addEventListener('click', () => {
        closeChatbot();
    });
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatbotWindow.classList.contains('active')) {
            closeChatbot();
        }
    });
    
    // Placeholder for future chatbot input handling
    if (chatbotInput && chatbotSend) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !chatbotInput.disabled) {
                sendChatMessage();
            }
        });
        
        chatbotSend.addEventListener('click', () => {
            if (!chatbotSend.disabled) {
                sendChatMessage();
            }
        });
    }
}

function toggleChatbot() {
    if (chatbotWindow.classList.contains('active')) {
        closeChatbot();
    } else {
        openChatbot();
    }
}

function openChatbot() {
    chatbotWindow.classList.add('active');
    chatbotWindow.setAttribute('aria-hidden', 'false');
    
    // Show info notification about coming soon feature
    showNotification('AI Chatbot coming soon! This feature will help answer all your volleyball questions. 🏐', 'info');
}

function closeChatbot() {
    chatbotWindow.classList.remove('active');
    chatbotWindow.setAttribute('aria-hidden', 'true');
}

// Placeholder function for sending chat messages
// This will be replaced with actual AI integration in the future
function sendChatMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;
    
    // TODO: Integrate with AI chatbot API
    // For now, this is a placeholder
    console.log('Message to be sent to AI:', message);
    
    // Clear input
    chatbotInput.value = '';
    
    // Show coming soon notification
    showNotification('Chatbot integration coming soon!', 'info');
}

// Function to add a message to the chat window
// This will be used when the AI chatbot is integrated
function addChatMessage(message, isBot = true) {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (!messagesContainer) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isBot ? 'bot-message' : 'user-message'}`;
    
    messageDiv.innerHTML = `
        <i class="fas ${isBot ? 'fa-robot' : 'fa-user'}"></i>
        <div>
            ${isBot ? '<p><strong>Volleyball Coach AI</strong></p>' : ''}
            <p>${message}</p>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ============================================
// Console Welcome Message
// ============================================
console.log('%c🏆 Welcome to Dynamite Sports Learner! 🏆', 'color: #FF6B35; font-size: 20px; font-weight: bold;');
console.log('%cLearn new sports, get active, and pick up new skills!', 'color: #004E89; font-size: 14px;');
