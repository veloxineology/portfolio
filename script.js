document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Portfolio Loaded Successfully!");

    // ===== NAVIGATION TAB HIGHLIGHTING =====
    document.querySelectorAll(".tabs a").forEach(link => {
        link.addEventListener("click", function () {
            document.querySelectorAll(".tabs a").forEach(tab => tab.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // ===== FADE-IN ANIMATION ON SCROLL =====
    const fadeElements = document.querySelectorAll(".fade-in");

    function fadeInOnScroll() {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                el.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", fadeInOnScroll);
    fadeInOnScroll(); // Run on page load

    // ===== BLOG SEARCH FUNCTIONALITY =====
    const searchInput = document.getElementById("search");
    const blogList = document.getElementById("blog-list");

    if (searchInput && blogList) {
        searchInput.addEventListener("input", function () {
            const searchText = searchInput.value.toLowerCase();
            const blogs = blogList.getElementsByClassName("blog-entry");

            for (let blog of blogs) {
                const title = blog.querySelector(".blog-title").textContent.toLowerCase();
                if (title.includes(searchText)) {
                    blog.style.display = "block";
                } else {
                    blog.style.display = "none";
                }
            }
        });
    }
});
