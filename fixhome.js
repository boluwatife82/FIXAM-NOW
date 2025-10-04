// import { image } from "framer-motion/client";

// // ✅ Services
const services = [
  {
    image: "p1.jpg",
    name: "Plumbing",
    description: "Fix all your leaks, taps, and pipes fast.",
    basePrice: 5000,
  },
  {
    image: "e2.jpg",
    name: "Electrical",
    description: "Wiring, installations, and repairs safely done.",
    basePrice: 7000,
  },
  {
    image: "handy2.jpg",
    name: "Painting",
    description: "Fresh walls and smooth finishes for your home.",
    basePrice: 4000,
  },
  {
    image: "gen3.jpg",
    name: "generator man",
    description: "Deep clean services for a sparkling home.",
    basePrice: 3000,
  },
];

// ✅ Testimonials
const testimonials = [
  {
    text: "The electrician showed up sharp-sharp at LASPOTECH and fixed my light wahala. Very reliable!",
    author: "Sade, LASPOTECH",
  },
  {
    text: "I booked a plumber from Garage, and he came on time. No stress at all!",
    author: "Kunle, Ikorodu Garage",
  },
  {
    text: "FixAmNow really helped me in Agric. The carpenter did a clean job for a fair price.",
    author: "Musa, Agric Ikorodu",
  },
  {
    text: "Na so my gen spoil for Ijede, I just book from FixAmNow. The electrician reach before 1 hour, job clean die.",
    author: "Tope, Ijede",
  },
  {
    text: "Normally plumber dey always delay, but this one from FixAmNow reach fast-fast for Sabo. Sharp service!",
    author: "Blessing, Sabo Ikorodu",
  },
  {
    text: "I try them for furniture wahala at Ikorodu Garage side. The carpenter too sabi, arrange everything well.",
    author: "Johnson, Garage Ikorodu",
  },
  {
    text: "The AC repair guy dem send me in Agric na correct person. No story, he just do the work and go.",
    author: "Mariam, Agric Ikorodu",
  },
  {
    text: "My tap dey leak for LASPOTECH hostel, I no even stress. Booked plumber and e settle am sharp. 100% recommend.",
    author: "David, LASPOTECH",
  },
  {
    text: "First time using FixAmNow at Ebute. I be fear at first, but the artisan show up on time and no overcharge me. Nice one!",
    author: "Chika, Ebute Ikorodu",
  },
];

let currentIndex = 0;
const perPage = 3;

// ✅ Render testimonials
function renderTestimonials() {
  const container = document.querySelector(".testimonial-list");
  if (!container) return;

  container.innerHTML = testimonials
    .slice(currentIndex, currentIndex + perPage)
    .map(
      (t) => `
        <div class="testimonial-card">
          <p>"${t.text}"</p>
          <span>- ${t.author}</span>
        </div>
      `
    )
    .join("");
}

// ✅ Exported function
export function renderHome() {
  const main = document.getElementById("main");
  if (!main) return;

  main.innerHTML = `
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Reliable Home Services at Your Fingertips 🛠️</h1>
        <p>
          Book trusted artisans near you in minutes. Fast, safe, and affordable. 
          We provide plumbing, electrical, painting, AC repair and other handyman services across major places in Ikorodu for now.
        </p>
        <div class="hero-buttons">
          <a href="#" class="btn-primary btn-book">Book a Service</a>
          <a href="#" class="btn-secondary">Learn More</a>
        </div>
      </div>
    </section>

    <!-- Popular Services -->
    <!-- Popular Services -->
    <section class="services">
     <h2>Our Popular Services</h2>
    <div class="service-list">
      ${services
        .map(
          (svc) => `
          <div class="service-card">
            <div class="service-icon">
              <img src="${svc.image}" alt="${svc.name}" />
            </div>
            <h3>${svc.name}</h3>
            <p>${svc.description}</p>
            <span class="price">From ₦${svc.basePrice}</span>
            <a href="#" class="btn-card btn-book" data-service="${svc.name}">Book Now</a>
          </div>`
        )
        .join("")}
  </div>
</section>


    
      <!-- Testimonials Section -->
    <section class="testimonials">
      <h2>What Our Customers Say</h2>
      <div class="testimonial-list"></div>
      <div class="testimonial-controls">
        <button id="prev">Prev</button>
        <button id="next">Next</button>
      </div>
    </section>

    <!-- Call-to-Action -->
    <section class="cta-book">
      <h2>Ready to Get Started?</h2>
      <a href="#" class="cta-btn btn-book">Book Now</a>
    </section>
  `;

  // ✅ Setup testimonials
  renderTestimonials();
  document.getElementById("next").addEventListener("click", () => {
    if (currentIndex + perPage < testimonials.length) {
      currentIndex += perPage;
      renderTestimonials();
    }
  });
  document.getElementById("prev").addEventListener("click", () => {
    if (currentIndex - perPage >= 0) {
      currentIndex -= perPage;
      renderTestimonials();
    }
  });

  // ✅ Handle Book buttons
  document.querySelectorAll(".btn-book").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const service = btn.getAttribute("data-service");
      if (service) localStorage.setItem("selectedService", service);
      const booking = await import("./fixbooking.js");
      booking.renderBooking();
    });
  });
}
