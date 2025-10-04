// fixbooking.js
export function renderBooking() {
  const main = document.getElementById("main");
  if (main) {
    main.innerHTML = `
      <section class="booking-page">
        <h2>Book a Service</h2>
        <form class="booking-form">

          <!-- Service -->
          <label for="service">Select Service</label>
          <select id="service" required>
            <option value="">-- Choose a service --</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="painting">Painting</option>
            <option value="cleaning">Cleaning</option>
            <option value="ac">AC Repair</option>
            <option value="carpentry">Carpentry</option>
          </select>

          <!-- Name -->
          <label for="fullname">Full Name</label>
          <input type="text" id="fullname" placeholder="Enter your full name" required />

          <!-- Phone -->
          <label for="phone">Phone Number</label>
          <input type="tel" id="phone" placeholder="e.g. 08012345678" pattern="\\d{11}" required />

          <!-- House Address -->
          <label for="address">House Address</label>
          <input type="text" id="address" placeholder="Street, house number" required />

          <!-- Landmark -->
          <label for="landmark">Nearest Landmark</label>
          <input type="text" id="landmark" placeholder="E.g. LASPOTECH Gate, Ikorodu Garage" required />

          <!-- Preferred Date -->
          <label for="date">Preferred Date</label>
          <input type="date" id="date" required />

          <!-- Preferred Time -->
          <label for="time">Preferred Time</label>
          <input type="time" id="time" required />

          <!-- Extra Details -->
          <label for="details">Job Details (optional)</label>
          <textarea id="details" rows="4" placeholder="Describe the problem..."></textarea>

          <!-- Submit -->
          <button type="submit" class="btn-primary">Confirm Booking</button>
        </form>
      </section>
    `;
  }
}
