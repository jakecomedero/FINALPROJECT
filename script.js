document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navList = document.querySelector('.nav-list');
    const body = document.body;
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    body.appendChild(overlay);
    
    mobileNavToggle.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
        this.classList.toggle('active');
        navList.classList.toggle('show');
        overlay.classList.toggle('show');
        
        // Prevent body scrolling when menu is open
        if (!expanded) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking on overlay
    overlay.addEventListener('click', function() {
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        mobileNavToggle.classList.remove('active');
        navList.classList.remove('show');
        overlay.classList.remove('show');
        body.style.overflow = '';
    });
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-list a').forEach(function(link) {
        link.addEventListener('click', function() {
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            mobileNavToggle.classList.remove('active');
            navList.classList.remove('show');
            overlay.classList.remove('show');
            body.style.overflow = '';
        });
    });
    
    // Scroll Animation for Skill Bars
    const skillsSection = document.querySelector('.skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Set initial width to 0
    skillBars.forEach(bar => {
        bar.style.width = '0';
    });
    
    // Animate skill bars when they come into view
    function animateSkillBars() {
        if (!skillsSection) return;
        
        const sectionPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            skillBars.forEach(bar => {
                const width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
                bar.style.width = width;
            });
            window.removeEventListener('scroll', animateSkillBars);
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', animateSkillBars);
    
    // Call once to check if skills section is already in view
    animateSkillBars();
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow and reduce padding when scrolling down
        if (scrollTop > 50) {
            header.style.padding = '0.7rem 0';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (targetId === '#' || !targetId) return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to nav links based on current section
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-list a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - header.offsetHeight - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');

            if (href === current || (href === 'index.html' && current === '')) {
                link.classList.add('active');
            }
        });
    }

    // Call on scroll and on page load
    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink();
});
