// fixforgot.js
// Frontend-only simulated "forgot password" flow using localStorage.
// NOT SECURE for production — only for demo/testing.

function genCode() {
  // 6-digit numeric code
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Storage helpers
function readUsers() {
  return JSON.parse(localStorage.getItem("fixam_users")) || [];
}
function writeUsers(users) {
  localStorage.setItem("fixam_users", JSON.stringify(users));
}

// tokens stored under key "fixam_reset_tokens" as { email: code, ... }
function readTokens() {
  return JSON.parse(localStorage.getItem("fixam_reset_tokens")) || {};
}
function writeTokens(toks) {
  localStorage.setItem("fixam_reset_tokens", JSON.stringify(toks));
}

export function renderForgot() {
  const main = document.getElementById("main");
  if (!main) return;

  main.innerHTML = `
    <section class="auth-page">
      <h2>Forgot Password</h2>

      <!-- Step 1: Request reset code -->
      <div id="forgot-step1">
        <p>Enter the email you used to sign up. We'll send a reset code (simulated) to it.</p>
        <form id="requestCodeForm" class="auth-form">
          <label>Email</label>
          <input type="email" id="forgotEmail" placeholder="you@example.com" required />
          <button type="submit" class="btn-primary">Send Reset Code</button>
        </form>
        <p id="requestFeedback" style="color:green;margin-top:10px;"></p>
      </div>

      <!-- Step 2: Enter code + new password (hidden initially) -->
      <div id="forgot-step2" style="display:none; margin-top: 20px;">
        <p>Enter the code sent to your email and choose a new password.</p>
        <form id="resetForm" class="auth-form">
          <label>Reset Code</label>
          <input type="text" id="resetCode" placeholder="123456" required />

          <label>New Password</label>
          <input type="password" id="newPassword" placeholder="New password (min 6 chars)" required />

          <label>Confirm New Password</label>
          <input type="password" id="confirmPassword" placeholder="Confirm new password" required />

          <button type="submit" class="btn-primary">Reset Password</button>
        </form>
        <p id="resetFeedback" style="color:red;margin-top:10px;"></p>
      </div>

      <p style="margin-top:16px;">
        <a href="#" id="backToLogin">Back to Login</a>
      </p>
    </section>
  `;

  // Step 1: request code
  const requestForm = document.getElementById("requestCodeForm");
  const feedback1 = document.getElementById("requestFeedback");
  const step2 = document.getElementById("forgot-step2");

  requestForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document
      .getElementById("forgotEmail")
      .value.trim()
      .toLowerCase();
    const users = readUsers();
    const user = users.find((u) => (u.email || "").toLowerCase() === email);

    if (!user) {
      feedback1.style.color = "red";
      feedback1.textContent = "No account found for that email.";
      return;
    }

    // generate code and save token
    const code = genCode();
    const tokens = readTokens();
    tokens[email] = {
      code,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 15).toISOString(), // 15 minutes
    };
    writeTokens(tokens);

    // For demo: show the code to the user (simulate sending email)
    // In production you'd send an email instead.
    feedback1.style.color = "green";
    feedback1.innerHTML = `Reset code generated. <strong>Code (demo): ${code}</strong>.
      This code expires in 15 minutes. Use it below to set a new password.`;

    // reveal step 2
    step2.style.display = "block";
    // optionally prefill code into field (helpful for demo)
    document.getElementById("resetCode").value = code;
  });

  // Step 2: submit reset
  const resetForm = document.getElementById("resetForm");
  const feedback2 = document.getElementById("resetFeedback");

  resetForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document
      .getElementById("forgotEmail")
      .value.trim()
      .toLowerCase();
    const enteredCode = document.getElementById("resetCode").value.trim();
    const newPassword = document.getElementById("newPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (!email) {
      feedback2.textContent = "Email missing. Go back and enter your email.";
      return;
    }
    if (newPassword.length < 6) {
      feedback2.textContent = "Password must be at least 6 characters.";
      return;
    }
    if (newPassword !== confirm) {
      feedback2.textContent = "Passwords do not match.";
      return;
    }

    const tokens = readTokens();
    const token = tokens[email];
    if (!token) {
      feedback2.textContent =
        "No reset request found for this email. Request a new code.";
      return;
    }

    // check expiry
    if (new Date(token.expiresAt) < new Date()) {
      delete tokens[email];
      writeTokens(tokens);
      feedback2.textContent = "Reset code expired. Request a new code.";
      return;
    }

    if (token.code !== enteredCode) {
      feedback2.textContent = "Invalid reset code.";
      return;
    }

    // all good — update user's password
    const users = readUsers();
    const idx = users.findIndex((u) => (u.email || "").toLowerCase() === email);
    if (idx === -1) {
      feedback2.textContent = "No user found (unexpected).";
      return;
    }

    // update password field name used in your signup/login (it was 'password')
    users[idx].password = newPassword;
    writeUsers(users);

    // consume token
    delete tokens[email];
    writeTokens(tokens);

    // success
    feedback2.style.color = "green";
    feedback2.textContent = "Password reset successful. Redirecting to login…";

    setTimeout(() => {
      // navigate back to login UI - import dynamically to avoid circular import problems
      import("../fixlogin.js").then((m) => m.renderLogin());
    }, 900);
  });

  document.getElementById("backToLogin").addEventListener("click", (e) => {
    e.preventDefault();
    import("../fixlogin.js").then((m) => m.renderLogin());
  });
}
