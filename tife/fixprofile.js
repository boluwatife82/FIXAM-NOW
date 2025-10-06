import { Auth } from "../fixauth.js";
import { renderNavbar } from "../fixnavbar.js";

const app = document.getElementById("main");

export function renderProfile() {
  const user = Auth.user;

  if (!user) {
    app.innerHTML = `<p>Please log in to view your profile.</p>`;
    return;
  }

  app.innerHTML = `
    <div class="profile-container">
      <div class="profile-card">
        <img id="profileImg" src="${
          user.image || "default-avatar.jpg"
        }" alt="Profile Picture" class="profile-pic" />
        <input type="file" id="uploadImg" accept="image/*" hidden />

        <p><strong>Name:</strong> 
          <span id="profileName">${user.name}</span>
          <input type="text" id="editName" value="${user.name}" />
        </p>
        <p><strong>Email:</strong> <span id="profileEmail">${
          user.email
        }</span></p>

        <div class="btn-group">
          <button id="editBtn" class="btn">Edit Info</button>
          <button id="saveBtn" class="btn" style="display:none;">Save</button>
          <button id="changePicBtn" class="btn">Change Picture</button>
        </div>
      </div>
    </div>
  `;

  const uploadImg = document.getElementById("uploadImg");
  const changePicBtn = document.getElementById("changePicBtn");
  const editBtn = document.getElementById("editBtn");
  const saveBtn = document.getElementById("saveBtn");
  const profileCard = document.querySelector(".profile-card");
  const editNameInput = document.getElementById("editName");

  // 🖼️ Change Picture
  changePicBtn.addEventListener("click", () => uploadImg.click());
  uploadImg.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      Auth.updateProfile({ image: reader.result });
      renderProfile();
      renderNavbar();
    };
    reader.readAsDataURL(file);
  });

  // ✏️ Edit Mode
  editBtn.addEventListener("click", () => {
    profileCard.classList.add("editing");
    editBtn.style.display = "none";
    saveBtn.style.display = "inline-block";
  });

  // 💾 Save
  saveBtn.addEventListener("click", () => {
    const newName = editNameInput.value.trim();
    if (newName) {
      Auth.updateProfile({ name: newName });
      renderProfile();
      renderNavbar();
    }
  });
}
