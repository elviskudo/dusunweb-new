// Initialize Feather Icons
feather.replace();

// Simple Fade-in Animation on Scroll
const sections = document.querySelectorAll(".fade-in-section");
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            }
        });
    },
    {
        threshold: 0.1, // Adjust this value to control when the animation triggers
        rootMargin: "0px 0px -50px 0px", // Offset to trigger a bit earlier
    },
);

sections.forEach((section) => {
    observer.observe(section);
});

// Modal Logic
const serviceModal = document.getElementById("service-modal");
const modalCloseBtn = serviceModal.querySelector(".modal-close");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const serviceTriggers =
    document.querySelectorAll(".service-trigger");

let serviceDetails = {};

fetch("data/service-details.json")
    .then((response) => response.json())
    .then((data) => {
        serviceDetails = data;
    })
    .catch((error) => console.error("Error loading service details:", error));

// Fetch Testimonials
fetch("data/testimonials.json")
    .then((response) => response.json())
    .then((data) => {
        const container = document.getElementById("testimonials-container");
        if (container) {
            data.forEach((testimonial, index) => {
                const item = document.createElement("div");
                item.className = "carousel-item gumroad-card p-6 fade-in-section";
                item.style.transitionDelay = `${index * 100}ms`;
                item.innerHTML = `
                    <p class="text-gray-700 italic leading-relaxed mb-4">
                        "${testimonial.content}"
                    </p>
                    <p class="font-semibold text-gray-800">
                        - ${testimonial.author}, ${testimonial.role ? testimonial.role + ", " : ""}${testimonial.location}
                    </p>
                `;
                container.appendChild(item);

                // Observe the new element for fade-in animation
                observer.observe(item);
            });
        }
    })
    .catch((error) => console.error("Error loading testimonials:", error));

serviceTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
        const serviceId = trigger.dataset.serviceId;
        const data = serviceDetails[serviceId];

        if (data) {
            modalTitle.textContent = data.title;
            modalBody.innerHTML = `
                        <img src="${data.image}" alt="${data.title}" class="w-full h-auto rounded-md mb-4">
                        <p class="text-lg text-gray-800 leading-relaxed mb-6">${data.caption}</p>
                        ${data.details}
                    `;
            serviceModal.classList.add("open");
            document.body.style.overflow = "hidden"; // Prevent scrolling
        }
    });
});

modalCloseBtn.addEventListener("click", () => {
    serviceModal.classList.remove("open");
    document.body.style.overflow = ""; // Restore scrolling
});

// Close modal when clicking outside
serviceModal.addEventListener("click", (e) => {
    if (e.target === serviceModal) {
        serviceModal.classList.remove("open");
        document.body.style.overflow = "";
    }
});

// Keyboard ESC to close modal
document.addEventListener("keydown", (e) => {
    if (
        e.key === "Escape" &&
        serviceModal.classList.contains("open")
    ) {
        serviceModal.classList.remove("open");
        document.body.style.overflow = "";
    }
});