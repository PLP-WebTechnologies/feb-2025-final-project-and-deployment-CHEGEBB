// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });
}

// Close mobile menu when clicking a nav link
document.querySelectorAll('.nav-item a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navList.classList.remove('active');
    });
});

// Newsletter Form Submission
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        const subscriptionMessage = document.getElementById('subscription-message');
        
        // Simulate form submission
        setTimeout(() => {
            subscriptionMessage.textContent = `Thank you! Your email ${email} has been added to our newsletter.`;
            subscriptionMessage.style.color = '#2e7d32';
            this.reset();
            
            // Clear message after 5 seconds
            setTimeout(() => {
                subscriptionMessage.textContent = '';
            }, 5000);
        }, 1000);
    });
}

// Contact Form Validation and Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.style.display = 'none');
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Validate name
        if (name === '') {
            showError('name-error', 'Please enter your name');
            isValid = false;
        }
        
        // Validate email
        if (email === '') {
            showError('email-error', 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email-error', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate subject
        if (subject === '') {
            showError('subject-error', 'Please enter a subject');
            isValid = false;
        }
        
        // Validate message
        if (message === '') {
            showError('message-error', 'Please enter your message');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            const formMessage = document.getElementById('form-message');
            formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            formMessage.className = 'form-message success';
            
            // Reset form
            this.reset();
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    });
    
    function showError(id, message) {
        const errorElement = document.getElementById(id);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Blog Post Filtering
const categoryFilter = document.getElementById('category-filter');
if (categoryFilter) {
    categoryFilter.addEventListener('change', function() {
        const category = this.value;
        const posts = document.querySelectorAll('.post-card');
        
        posts.forEach(post => {
            if (category === 'all' || post.dataset.category === category) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    });
}

// Blog Search Functionality
const searchBtn = document.getElementById('search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', function() {
        const searchInput = document.getElementById('search-input').value.toLowerCase();
        const posts = document.querySelectorAll('.post-card');
        
        posts.forEach(post => {
            const title = post.querySelector('.post-title').textContent.toLowerCase();
            const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
            
            if (title.includes(searchInput) || excerpt.includes(searchInput)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    });
}

// Category sidebar filters
const categoryLinks = document.querySelectorAll('.categories a');
if (categoryLinks.length > 0) {
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.dataset.filter;
            const posts = document.querySelectorAll('.post-card');
            
            posts.forEach(post => {
                if (post.dataset.category === category) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
}

// Testimonial Slider
const testimonialSlider = document.getElementById('testimonial-slider');
if (testimonialSlider) {
    const slides = testimonialSlider.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[n].classList.add('active');
        dots[n].classList.add('active');
        currentSlide = n;
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
            showSlide(currentSlide);
        });
        
        nextBtn.addEventListener('click', () => {
            currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
            showSlide(currentSlide);
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto slider
    setInterval(() => {
        if (nextBtn) {
            nextBtn.click();
        }
    }, 5000);
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Initialize the first FAQ item as active
if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
}

// Animate elements when they come into view
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.post-card, .value-card, .team-member');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (elementPosition.top < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }
    
    // Add animation class
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Check on load and scroll
    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('load', checkIfInView);
    
    // Add animation class after elements are in view
    function animate() {
        animateElements.forEach(element => {
            if (element.classList.contains('animate')) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
});