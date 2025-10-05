import { navigate } from "./fixrouter.js";
import { renderLogin } from "./fixlogin.js";
import { renderSignup } from "../fixsignup.js";
import { Auth } from "./fixauth.js";

const header = document.getElementById("top");

function renderNavbar() {
  const user = Auth.user;
  header.innerHTML = `
    <nav class="navbar">
      <div class="nav-left">
        <img src="fixamnow logo.jpg" alt="FixAmNow Logo" />
        <span class="brand-name">FixAmNow</span>
      </div>

      <ul class="nav-links">
        <li><a href="#" data-page="home">Home</a></li>
        <li><a href="#" data-page="booking">Book</a></li>
        <li><a href="#" data-page="history">History</a></li>
        <li><a href="#" data-page="profile">Profile</a></li>
        <li><a href="#" data-page="map">Map</a></li>
      </ul>

      <div class="nav-auth">
        ${
          user
            ? `<span class="user-name">Hi, ${user.name}</span>
               <a href="#" id="logoutBtn" class="btn-logout">Logout</a>`
            : `<a href="#login" id="navLogin" class="btn-login">Login</a>
               <a href="#signup" id="navSignup" class="btn-signup">Sign Up</a>`
        }
      </div>
    </nav>
  `;

  // Attach events
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navigate(link.dataset.page);
    });
  });

  const navLogin = document.getElementById("navLogin");
  const navSignup = document.getElementById("navSignup");
  const logoutBtn = document.getElementById("logoutBtn");

  if (navLogin) {
    navLogin.addEventListener("click", (e) => {
      e.preventDefault();
      renderLogin((user) => {
        Auth.login(user); // Use real logged-in user
        renderNavbar(); // Update navbar
      });
    });
  }

  if (navSignup) {
    navSignup.addEventListener("click", (e) => {
      e.preventDefault();
      renderSignup((user) => {
        Auth.login(user); // Auto-login after signup
        renderNavbar();
      });
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      Auth.logout();
      renderNavbar();
      navigate("home");
    });
  }
}

// Initialize once when app loads
Auth.loadUser();
renderNavbar();

// ✅ Export so other files can refresh the navbar (like profile page)
export { renderNavbar };
