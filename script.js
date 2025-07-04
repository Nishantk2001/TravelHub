const burger = document.getElementById("burger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");

// Close sidebar
closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});
burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");

  // Prevent scrolling when sidebar is open
  if (sidebar.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

overlay.addEventListener("click", () => {
  burger.classList.remove("active");
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
});

// Close sidebar when clicking on links (optional)
const navLinks = document.querySelectorAll(".sidebar .nav-links a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// Testimonial section js
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".testimonial-carousel");
  const cards = document.querySelectorAll(".testimonial-card");
  const indicators = document.querySelectorAll(".indicator");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const cardWidth = cards[0].offsetWidth + 20; // card width + gap
  let currentPosition = 0;
  let currentIndex = 0;
  const cardsPerView = Math.min(3, cards.length);
  const totalSlides = Math.ceil(cards.length / cardsPerView);

  // Initialize indicators based on total slides
  function initIndicators() {
    const indicatorsContainer = document.querySelector(".indicators");
    indicatorsContainer.innerHTML = "";

    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement("span");
      indicator.classList.add("indicator");
      if (i === 0) indicator.classList.add("active");
      indicator.addEventListener("click", () => goToSlide(i));
      indicatorsContainer.appendChild(indicator);
    }
  }

  // Update carousel position
  function updateCarousel() {
    carousel.style.transform = `translateX(${-currentPosition}px)`;
    updateIndicators();
  }

  // Update active indicator
  function updateIndicators() {
    document.querySelectorAll(".indicator").forEach((indicator, i) => {
      indicator.classList.toggle("active", i === currentIndex);
    });
  }

  // Go to specific slide
  function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;

    currentIndex = index;
    currentPosition = index * cardsPerView * cardWidth;
    updateCarousel();
  }

  // Next slide
  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      currentPosition += cardsPerView * cardWidth;
    } else {
      // Loop back to first slide
      currentIndex = 0;
      currentPosition = 0;
    }
    updateCarousel();
  }

  // Previous slide
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      currentPosition -= cardsPerView * cardWidth;
    } else {
      // Loop to last slide
      currentIndex = totalSlides - 1;
      currentPosition = currentIndex * cardsPerView * cardWidth;
    }
    updateCarousel();
  }

  // Event listeners
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Auto-rotate slides (optional)
  let autoRotate = setInterval(nextSlide, 5000);

  // Pause auto-rotation on hover
  const carouselContainer = document.querySelector(
    ".testimonial-carousel-container"
  );
  carouselContainer.addEventListener("mouseenter", () => {
    clearInterval(autoRotate);
  });

  carouselContainer.addEventListener("mouseleave", () => {
    autoRotate = setInterval(nextSlide, 8000);
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    cardWidth = cards[0].offsetWidth + 20;
    currentPosition = currentIndex * cardsPerView * cardWidth;
    updateCarousel();
  });

  // Initialize
  initIndicators();
  updateCarousel();
});

// Subscription section js
function subscribe(e) {
  e.preventDefault();
  const emailInput = document.getElementById("email");
  const email = emailInput.value;

  if (email) {
    alert(`Thank you for subscribing with: ${email}`);
    emailInput.value = "";
  }
}
