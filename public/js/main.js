// ===================================
// NAVBAR FUNCTIONALITY
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const body = document.body;

// Toggle hamburger menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===================================
// STICKY NAVBAR
// ===================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// SMOOTH SCROLLING
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            // Get navbar height for offset calculation
            const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - navbarHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// IMPACT COUNTER ANIMATION
// ===================================
const impactNumbers = document.querySelectorAll('.impact-number');
const impactSection = document.getElementById('impact');
let counterAnimated = false;

const animateCounter = (element) => {
    const targetText = element.getAttribute('data-target');
    if (!targetText) return;
    
    // Extract numeric value and suffix
    const match = targetText.match(/^(\d+)(\+?)$/);
    if (!match) {
        // If not a simple number format, just display it statically
        element.textContent = targetText;
        return;
    }
    
    const target = parseInt(match[1]);
    const suffix = match[2] || '';
    
    // Validate target is a valid number
    if (isNaN(target) || target <= 0) {
        element.textContent = targetText;
        return;
    }
    
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    };
    
    updateCounter();
};

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
            impactNumbers.forEach(number => {
                animateCounter(number);
            });
            counterAnimated = true;
        }
    });
}, observerOptions);

if (impactSection) {
    observer.observe(impactSection);
}

// ===================================
// FORM VALIDATION & SUBMISSION
// ===================================
const joinForm = document.getElementById('joinForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnLoader = document.getElementById('btnLoader');
const formMessage = document.getElementById('formMessage');

// Phone number validation
const phoneInput = document.getElementById('phoneNumber');
phoneInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    if (e.target.value.length > 10) {
        e.target.value = e.target.value.slice(0, 10);
    }
});

// Email validation
const emailInput = document.getElementById('email');
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Age validation
const ageInput = document.getElementById('age');
ageInput.addEventListener('input', (e) => {
    if (e.target.value < 18) {
        e.target.setCustomValidity('You must be at least 18 years old');
    } else if (e.target.value > 100) {
        e.target.setCustomValidity('Please enter a valid age');
    } else {
        e.target.setCustomValidity('');
    }
});

// Form submission
joinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!validateEmail(emailInput.value)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Validate phone number
    if (phoneInput.value.length !== 10) {
        showMessage('Please enter a valid 10-digit phone number', 'error');
        return;
    }
    
    // Get form data
    const formData = new FormData(joinForm);
    const countryCode = formData.get('countryCode');
    const phoneNumber = formData.get('phoneNumber');
    const fullPhone = countryCode + phoneNumber;
    
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: fullPhone,
        age: formData.get('age'),
        state: formData.get('state'),
        country: formData.get('country'),
        message: formData.get('message')
    };
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Submitting...';
    btnLoader.style.display = 'inline-block';
    formMessage.style.display = 'none';
    
    try {
        console.log('📤 Submitting form data...');
        console.log('Data:', data);
        
        const response = await fetch('/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        console.log('📥 Response received:', response.status, response.statusText);
        
        const result = await response.json();
        console.log('📋 Result:', result);
        
        if (response.ok && result.success) {
            showMessage('✅ ' + (result.message || 'Thank you for joining! We will contact you soon.'), 'success');
            joinForm.reset();
            btnText.textContent = 'Submitted ✓';
            setTimeout(() => {
                btnText.textContent = 'Submit Application';
            }, 3000);
        } else {
            // Server returned an error
            let errorMsg = result.message || 'Something went wrong. Please try again.';
            if (result.errorType) {
                console.error('❌ Server error type:', result.errorType);
                errorMsg += ` (Error: ${result.errorType})`;
            }
            showMessage('⚠️ ' + errorMsg, 'error');
        }
    } catch (error) {
        console.error('❌ Form submission error:', error);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        
        let errorMessage = '⚠️ Unable to submit form. ';
        
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            errorMessage += 'Cannot connect to server. Please check if the server is running.';
        } else if (error.name === 'SyntaxError') {
            errorMessage += 'Server response error. Please try again.';
        } else {
            errorMessage += 'Please check your connection and try again.';
        }
        
        showMessage(errorMessage, 'error');
    } finally {
        submitBtn.disabled = false;
        btnLoader.style.display = 'none';
    }
});

// Show form message
const showMessage = (message, type) => {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
};

// ===================================
// ANIMATIONS ON SCROLL
// ===================================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .story-card, .impact-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animation styles
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.project-card, .story-card, .impact-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ===================================
// VIDEO/IMAGE BACKGROUND HANDLING
// ===================================
const heroVideo = document.getElementById('hero-video');
const heroImage = document.getElementById('hero-image');

if (heroVideo && heroImage) {
    // Check if video can be loaded
    heroVideo.addEventListener('loadeddata', () => {
        // Video loaded successfully, keep it visible
        heroVideo.style.display = 'block';
        heroImage.style.display = 'none';
    });
    
    heroVideo.addEventListener('error', () => {
        // Video failed to load, show image fallback
        heroVideo.style.display = 'none';
        heroImage.style.display = 'block';
    });
    
    // Pause video when not in viewport for performance
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroVideo.play().catch(err => {
                    // If video play fails, show image
                    console.log('Video autoplay blocked or failed, using image fallback');
                    heroVideo.style.display = 'none';
                    heroImage.style.display = 'block';
                });
            } else {
                heroVideo.pause();
            }
        });
    }, { threshold: 0.5 });
    
    videoObserver.observe(heroVideo);
}

// ===================================
// PREVENT FORM RESUBMISSION
// ===================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

console.log('Chinar Charity Foundation - Website Loaded Successfully');
