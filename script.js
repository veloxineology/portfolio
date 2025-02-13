document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Portfolio Initialized Successfully!");

    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            mobileMenuBtn.classList.toggle('open');
        });
    }

    // ===== NAVIGATION TAB HIGHLIGHTING =====
    document.querySelectorAll(".tabs a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelectorAll(".tabs a").forEach(tab => tab.classList.remove("active"));
            this.classList.add("active");
            // Add smooth page transition
            setTimeout(() => window.location.href = this.href, 300);
        });
    });

    // ===== FADE-IN ANIMATION ON SCROLL =====
    const fadeElements = document.querySelectorAll(".fade-in");
    const animateOnScroll = () => {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                el.classList.add("visible");
            }
        });
    };

    // Optimized scroll handler
    const scrollHandler = () => {
        animateOnScroll();
        // Add parallax effects for future use
        document.querySelectorAll('.parallax').forEach(el => {
            const speed = parseFloat(el.dataset.speed) || 0.5;
            const offset = window.pageYOffset * speed;
            el.style.transform = `translateY(${offset}px)`;
        });
    };

    window.addEventListener("scroll", scrollHandler);
    animateOnScroll(); // Initial check

    // ===== ENHANCED BLOG SEARCH =====
    const blogSearch = document.getElementById("search");
    const blogList = document.getElementById("blog-list");
    if (blogSearch && blogList) {
        let timeoutId;
        blogSearch.addEventListener("input", function () {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                const searchText = this.value.toLowerCase();
                const blogs = blogList.querySelectorAll(".blog-post");
                
                blogs.forEach(blog => {
                    const title = blog.querySelector("h3").textContent.toLowerCase();
                    const excerpt = blog.querySelector(".post-excerpt").textContent.toLowerCase();
                    blog.style.display = (title.includes(searchText) || excerpt.includes(searchText) 
                        ? "block" 
                        : "none";
                });
            }, 300); // 300ms debounce delay
        });
    }

    // ===== CARD HOVER EFFECTS =====
    document.querySelectorAll(".project-card, .repo-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-5px) scale(1.02)";
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0) scale(1)";
        });
    });

    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== ERROR HANDLING =====
    window.onerror = function (message, source, lineno, colno, error) {
        console.error(`Error: ${message} at ${source}:${lineno}`);
        const errorContainer = document.createElement('div');
        errorContainer.className = 'global-error';
        errorContainer.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <p>Something went wrong. Please try refreshing the page.</p>
        `;
        document.body.prepend(errorContainer);
        setTimeout(() => errorContainer.remove(), 5000);
    };
});

// ===== LOADING ANIMATIONS =====
function initializeSkeletonLoader(container) {
    const skeletons = container.querySelectorAll('.skeleton-line');
    skeletons.forEach(line => {
        line.style.animationDelay = `${Math.random() * 0.5}s`;
    });
}

// ===== DEBOUNCE HELPER =====
function debounce(func, wait = 100) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
