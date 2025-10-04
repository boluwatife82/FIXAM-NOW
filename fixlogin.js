// fixlogin.js
export function renderLogin(onSuccess) {
  const main = document.getElementById("main");
  if (!main) return;

  main.innerHTML = `
  <section class="auth-page">
    <h2>Login</h2>
    <form id="loginForm" class="auth-form">
      <label>Email</label>
      <input type="email" id="loginEmail" placeholder="Enter your email" required />

      <label>Password</label>
      <input type="password" id="loginPassword" placeholder="Enter password" required />

      <button type="submit" class="btn-primary">Login</button>
    </form>

    <p style="margin-top:8px;">
      <a href="#" id="forgotLink">Forgot password?</a>
    </p>

    <p class="switch-auth">Don’t have an account? 
      <a href="#" id="goSignup">Sign Up</a>
    </p>
  </section>
  `;

  // Forgot password link
  document.getElementById("forgotLink").addEventListener("click", (e) => {
    e.preventDefault();
    import("./fixforgot.js").then((m) => m.renderForgot());
  });

  // Login form submission
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const users = JSON.parse(localStorage.getItem("fixam_users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid email or password.");
      return;
    }

    // ✅ Save active user
    localStorage.setItem("fixam_currentUser", JSON.stringify(user));

    // ✅ Trigger callback to update navbar
    if (onSuccess) onSuccess(user);

    // ✅ Redirect to home
    import("./fixhome.js").then((m) => m.renderHome());
  });

  // Switch to signup page
  document.getElementById("goSignup").addEventListener("click", (e) => {
    e.preventDefault();
    import("./fixsignup.js").then((m) => m.renderSignup(onSuccess));
  });
}
