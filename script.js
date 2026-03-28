document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    const body = document.body;

    mobileMenuBtn.addEventListener('click', () => {
        navList.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active'); // Add animation to bars if needed
        // Prevent scrolling when menu is open
        if (navList.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            body.style.overflow = 'auto';
        });
    });

    // --- Experience Tabs ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
             // Remove active class from all buttons
             tabBtns.forEach(b => b.classList.remove('active'));
             // Add active class to clicked button
             btn.classList.add('active');

             // Hide all contents
             tabContents.forEach(content => {
                 content.style.display = 'none';
                 content.classList.remove('basic-fade-in');
             });

             // Show target content
             const targetId = btn.getAttribute('data-target');
             const targetContent = document.querySelector(targetId);
             targetContent.style.display = 'block';
             // Trigger reflow to restart animation
             void targetContent.offsetWidth; 
             targetContent.classList.add('basic-fade-in');
        });
    });

    // --- Dynamic Year ---
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-animate');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Elements to animate
    const hiddenElements = document.querySelectorAll('.section-title, .about-text, .project-card, .hero-content > *');
    hiddenElements.forEach((el) => {
        el.classList.add('hidden-animate');
        observer.observe(el);
    });
});

/* Add these utility classes in JS or make sure they exist in CSS for animation */
/* 
.hidden-animate {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease-out;
}
.show-animate {
    opacity: 1;
    transform: translateY(0);
}
*/
