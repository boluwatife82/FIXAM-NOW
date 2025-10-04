// // fixmap.js
// import { navigate } from "./fixrouter.js"; // ✅ to go back home

// export function renderMap() {
//   const app = document.getElementById("app");
//   if (!app) return;

//   app.innerHTML = `
//     <section class="map-page">
//       <h2>Find Artisans Near You</h2>
//       <p>Explore top-rated FixAmNow artisans in your city.</p>

//       <input type="text" id="locationInput" placeholder="Enter a city (e.g., Lagos, Abuja)" />
//       <div id="mapDisplay" class="fake-map">
//         <p>🗺️ Map preview will appear here once you enter a location.</p>
//       </div>

//       <button id="backHomeBtn" class="btn-back">← Back to Home</button>
//     </section>
//   `;

//   const LOCATIONS = {
//     lagos: { lat: 6.5244, lng: 3.3792 },
//     abuja: { lat: 9.0765, lng: 7.3986 },
//     "port harcourt": { lat: 4.8156, lng: 7.0498 },
//   };

//   function getCoordinates(locationName) {
//     if (!locationName) return null;
//     const key = locationName.trim().toLowerCase();
//     return LOCATIONS[key] || null;
//   }

//   const input = document.getElementById("locationInput");
//   const mapDisplay = document.getElementById("mapDisplay");

//   input.addEventListener("change", () => {
//     const coords = getCoordinates(input.value);
//     if (coords) {
//       mapDisplay.innerHTML = `
//         <div class="map-info">
//           <h3>📍 ${input.value}</h3>
//           <p>Latitude: ${coords.lat}</p>
//           <p>Longitude: ${coords.lng}</p>
//           <p>Available artisans: 🧰 Electrician, 🔧 Plumber, 🪜 Carpenter</p>
//         </div>
//       `;
//     } else {
//       mapDisplay.innerHTML = `<p style="color:red;">❌ No data for "${input.value}". Try Lagos, Abuja, or Port Harcourt.</p>`;
//     }
//   });

//   // ✅ Back to home
//   document.getElementById("backHomeBtn").addEventListener("click", () => {
//     navigate("home");
//   });
// }

// fixmap.js

// Function to render the fake map
export function renderMap(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = "<p>Map will be rendered here</p>";
  }
}

// Hardcoded sample locations
const LOCATIONS = {
  lagos: { lat: 6.5244, lng: 3.3792 },
  abuja: { lat: 9.0765, lng: 7.3986 },
  "port harcourt": { lat: 4.8156, lng: 7.0498 },
};

// Get coordinates from a text location
function getCoordinates(locationName) {
  if (!locationName) return null;
  const key = locationName.trim().toLowerCase();
  return LOCATIONS[key] || { lat: 0, lng: 0 };
}

// Example: attach to input
function initLocationInput(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;

  input.addEventListener("change", () => {
    const coords = getCoordinates(input.value);
    console.log("User selected location:", coords);
  });
}

// ✅ Handle "Back to Home" button click
document.addEventListener("DOMContentLoaded", () => {
  const homeBtn = document.getElementById("home-btn");

  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      console.log("Back button clicked"); // Debug check
      window.location.href = "index.html"; // navigate to homepage
    });
  } else {
    console.warn("Home button not found on page");
  }

  // Optional: Initialize map if there's a container
  renderMap("map");
});
