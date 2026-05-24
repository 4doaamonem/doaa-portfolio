document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dark / Light Theme Engine Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn.querySelector('i');

    // Default system initialization checked against explicit schema definitions
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        let newTheme = 'dark';

        if (currentTheme === 'dark') {
            newTheme = 'light';
            themeIcon.className = 'fas fa-moon';
        } else {
            newTheme = 'dark';
            themeIcon.className = 'fas fa-sun';
        }

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    });

    // Persistent storage checks for user theme mapping
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }


    // 2. High-Performance Intersection Observer for Scroll Animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const scrollObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const appearanceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optimize DOM tracking loops
            }
        });
    }, scrollObserverOptions);

    fadeElements.forEach(element => {
        appearanceObserver.observe(element);
    });


    // 3. Smooth Navigation Anchor Alignment Corrections
    const navigationLinks = document.querySelectorAll('.nav-menu a, .back-to-top, .hero-cta a');

    navigationLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const sectionPosition = targetSection.offsetTop - navbarHeight - 20;

                    window.scrollTo({
                        top: targetId === '#' ? 0 : sectionPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});