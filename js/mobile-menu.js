// Mobile Menu Logic
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-link");

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
        // Optional: Toggle icon between menu and x
        const icon = mobileMenuBtn.querySelector("i");
        if (mobileMenu.classList.contains("hidden")) {
            icon.setAttribute("data-feather", "menu");
        } else {
            icon.setAttribute("data-feather", "x");
        }
        feather.replace();
    });

    mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
            const icon = mobileMenuBtn.querySelector("i");
            icon.setAttribute("data-feather", "menu");
            feather.replace();
        });
    });
}
