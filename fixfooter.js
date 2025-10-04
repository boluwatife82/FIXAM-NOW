import { navigate } from "./fixrouter.js";

document.addEventListener("DOMContentLoaded", () => {
  const footer = document.getElementById("footer");
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer-container">
      <div class="footer-col">
        <img src="fixamnow logo.jpg" alt="FixAmNow Logo" class="footer-logo" />
        <p>FixAmNow connects you with trusted artisans for all your home needs. Fast, safe, reliable.</p>
      </div>
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#" data-page="home">Home</a></li>
          <li><a href="#" data-page="services">Services</a></li>
          <li><a href="#" data-page="about">About Us</a></li>
          <li><a href="#" data-page="contact">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact Us</h4>
        <ul>
          <li>Email: support@fixamnow.com</li>
          <li>Phone: +234 902 596 9724</li>
          <li>Location: Ikorodu, Lagos, Nigeria</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${new Date().getFullYear()} FixAmNow. All rights reserved.</p>
    </div>
  `;

  // enable internal routing
  footer.querySelectorAll("a[data-page]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navigate(link.dataset.page);
    });
  });
});
