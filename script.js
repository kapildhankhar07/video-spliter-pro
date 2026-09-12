document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Reveal only once
                }
            });
        }, {
            root: null,
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // If reduced motion is on, reveal everything immediately
        revealElements.forEach(el => el.classList.add('active'));
    }

    // 4. Interactive FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        
        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            const answer = item.querySelector('.faq-answer');
            
            // Close all items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // 5. Download Notification (Toast)
    const downloadButtons = document.querySelectorAll('.download-button');
    const toastContainer = document.getElementById('toast-container');

    function showDownloadToast() {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-title">DOWNLOAD INITIALIZED</div>
            <div class="toast-file">Video-Splitter-Pro.zip</div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
        
        // Remove after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toastContainer.contains(toast)) {
                    toastContainer.removeChild(toast);
                }
            }, 400); // Wait for transition to finish
        }, 4000);
    }

    downloadButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            showDownloadToast();
            // Note: We DO NOT call e.preventDefault(). 
            // The browser will natively handle downloading the href="Video-Splitter-Pro.zip".
        });
    });

    // 6. Desktop Mouse Glow Effect
    const mouseGlow = document.querySelector('.mouse-glow');
    
    // Only initialize mouse glow on non-touch devices and if reduced motion is false
    const isTouchDevice = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    
    if (mouseGlow && !isTouchDevice && !prefersReducedMotion) {
        // Make it visible once mouse moves
        document.addEventListener('mousemove', (e) => {
            if (mouseGlow.style.opacity === '' || mouseGlow.style.opacity === '0') {
                mouseGlow.style.opacity = '1';
            }
            // Use requestAnimationFrame for smoother performance
            requestAnimationFrame(() => {
                mouseGlow.style.left = e.clientX + 'px';
                mouseGlow.style.top = e.clientY + 'px';
            });
        });

        // Hide when mouse leaves the viewport
        document.addEventListener('mouseleave', () => {
            mouseGlow.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            mouseGlow.style.opacity = '1';
        });
    }
});