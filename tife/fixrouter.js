// fixrouter.js
import { renderHome } from "./fixhome.js";
import { renderBooking } from "./fixbooking.js";
import { renderHistory } from "./fixhistory.js";
import { renderProfile } from "./fixprofile.js";
import { renderMap } from "./fixmap.js";
import { renderNotFound } from "./fixnotfound.js";
import { renderAbout } from "./fixaboutus.js";
import { renderServices } from "../fixservices.js";
import { renderContact } from "./fixcontact.js";

// ✅ Central navigation controller
export function navigate(page) {
  const main = document.getElementById("main");
  if (!main) return;

  main.innerHTML = "<p>Loading...</p>";

  switch (page) {
    case "home":
      renderHome();
      break;
    case "booking":
      renderBooking();
      break;
    case "history":
      renderHistory();
      break;
    case "profile":
      renderProfile();
      break;
    case "map":
      renderMap();
      break;
    case "about":
      renderAbout();
      break;
    case "services":
      renderServices();
      break;
    case "contact":
      renderContact();
      break;
    default:
      renderNotFound();
  }
}

// ✅ On first load
document.addEventListener("DOMContentLoaded", () => {
  navigate("home"); // Load default page
});
