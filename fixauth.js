export const Auth = {
  user: null,

  loadUser() {
    const saved = localStorage.getItem("fixam_user");
    if (saved) {
      this.user = JSON.parse(saved);
    }
  },

  login(userData) {
    this.user = userData;
    localStorage.setItem("fixam_user", JSON.stringify(this.user));
  },

  logout() {
    this.user = null;
    localStorage.removeItem("fixam_user");
  },

  updateProfile(updates) {
    if (!this.user) return;
    this.user = { ...this.user, ...updates };
    localStorage.setItem("fixam_user", JSON.stringify(this.user)); // ✅ persist changes
  },
};

Auth.loadUser();
