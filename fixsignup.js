// fixsignup.js
export function renderSignup(onSuccess) {
  const main = document.getElementById("main");
  if (!main) return;

  main.innerHTML = `
    <section class="auth-page">
      <h2>Create Account</h2>
      <form id="signupForm" class="auth-form">
        <label>Full Name</label>
        <input type="text" id="signupName" placeholder="Enter your full name" required />

        <label>Email</label>
        <input type="email" id="signupEmail" placeholder="Enter your email" required />

        <label>Password</label>
        <input type="password" id="signupPassword" placeholder="Enter password" required />

        <button type="submit" class="btn-primary">Sign Up</button>
      </form>
      <p class="switch-auth">Already have an account? 
        <a href="#" id="goLogin">Login</a>
      </p>
    </section>
  `;

  // ✅ Handle signup submission
  document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    const users = JSON.parse(localStorage.getItem("fixam_users")) || [];
    const exists = users.find((u) => u.email === email);

    if (exists) {
      alert("User already exists, try logging in.");
      return;
    }

    // ✅ Save user
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("fixam_users", JSON.stringify(users));

    // ✅ Save active user (auto-login)
    localStorage.setItem("fixam_currentUser", JSON.stringify(newUser));

    // ✅ Trigger callback to update navbar
    if (onSuccess) onSuccess(newUser);

    alert("Signup successful! Welcome to FixAmNow 🚀");

    // ✅ Redirect to home
    import("./fixhome.js").then((m) => m.renderHome());
  });

  // Switch to login
  document.getElementById("goLogin").addEventListener("click", (e) => {
    e.preventDefault();
    import("./fixlogin.js").then((m) => m.renderLogin(onSuccess));
  });
}
