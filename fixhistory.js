// ✅ Exported function so router can call it
export function renderHistory() {
  const main = document.getElementById("main");
  if (!main) return;

  const bookings = JSON.parse(localStorage.getItem("fixam_bookings")) || [];

  if (!bookings.length) {
    main.innerHTML = `
      <section class="history-page">
        <h2>Your Booking History</h2>
        <p class="empty">
          No bookings yet. Go ahead and 
          <a href="#" class="btn-book">book a service</a>!
        </p>
      </section>
    `;
    return;
  }

  main.innerHTML = `
    <section class="history-page">
      <h2>Your Booking History</h2>
      <div class="history-list">
        ${bookings
          .map(
            (b) => `
          <div class="history-card">
            <h3>${b.service} Service</h3>
            <p><strong>Date:</strong> ${b.date} at ${b.time}</p>
            <p><strong>Address:</strong> ${b.address}</p>
            <p><strong>Landmark:</strong> ${b.landmark}</p>
            <p><strong>Status:</strong> 
              <span class="status ${b.status.toLowerCase()}">${b.status}</span>
            </p>
          </div>
        `
          )
          .join("")}
      </div>
    </section>
  `;
}
