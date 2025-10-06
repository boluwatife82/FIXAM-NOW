// notfound.js
export function renderNotFound() {
  const main = document.getElementById("main");
  if (!main) return;

  main.innerHTML = `
    <section class="notfound-page">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for doesn’t exist.</p>
      <button id="goHome" class="btn-primary">Back to Home</button>
    </section>
  `;

  document.getElementById("goHome").addEventListener("click", () => {
    import("./fixhome.js").then((m) => m.renderHome());
  });
}
