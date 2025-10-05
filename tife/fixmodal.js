// modal.js
export function showModal(message) {
  let modal = document.getElementById("fixamModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "fixamModal";
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-content">
        <span id="closeModal" class="modal-close">&times;</span>
        <p id="modalMessage"></p>
      </div>
    `;
    document.body.appendChild(modal);
  }

  document.getElementById("modalMessage").textContent = message;
  modal.style.display = "block";

  document.getElementById("closeModal").onclick = () => {
    modal.style.display = "none";
  };
  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };
}
