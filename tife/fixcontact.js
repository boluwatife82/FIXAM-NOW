export function renderContact() {
  const main = document.getElementById("main");
  if (!main) return;

  main.innerHTML = `
    <section class="page contact-page">
      <h2>Contact Us</h2>
      <p>We’d love to hear from you! Reach out to us for inquiries, support, or partnerships.</p>

      <form id="contactForm" class="contact-form">
        <label>Name</label>
        <input type="text" id="contactName" placeholder="Your name" required />

        <label>Email</label>
        <input type="email" id="contactEmail" placeholder="Your email" required />

        <label>Message</label>
        <textarea id="contactMessage" placeholder="Write your message..." required></textarea>

        <button type="submit" class="btn-primary">Send Message</button>
      </form>
    </section>
  `;

  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message sent successfully! We’ll get back to you soon.");
    e.target.reset();
  });
}
