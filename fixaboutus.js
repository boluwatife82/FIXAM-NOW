export function renderAbout() {
  const main = document.getElementById("main");
  if (!main) return;

  main.innerHTML = `
    <section class="page about-page">
      <h2>About FixAmNow</h2>
      <p>FixAmNow is a trusted platform that connects customers with verified artisans across Nigeria.
      We make it simple to book repairs, maintenance, and installation services safely and quickly.</p>
      
      <h3>Our Mission</h3>
      <p>To simplify home repairs through technology and trust.</p>

      <h3>Our Vision</h3>
      <p>To become Nigeria’s most reliable home-service brand.</p>
    </section>
  `;
}
