export function renderServices() {
  const main = document.getElementById("main");
  if (!main) return;

  main.innerHTML = `
    <section class="page services-page">
      <h2>Our Services</h2>
      <ul class="services-list">
        <li>⚡ Electrical Repairs</li>
        <li>🚰 Plumbing</li>
        <li>🧱 Masonry & Carpentry</li>
        <li>🧹 Cleaning Services</li>
        <li>🔧 Appliance Repairs</li>
      </ul>
      <p>Each artisan is background-checked and reviewed by real customers.</p>
    </section>
  `;
}
