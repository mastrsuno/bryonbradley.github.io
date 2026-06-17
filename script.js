const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");
const modal = document.querySelector("#project-modal");
const modalImage = document.querySelector("#modal-image");
const modalTitle = document.querySelector("#modal-title");
const modalType = document.querySelector("#modal-type");
const modalSummary = document.querySelector("#modal-summary");
const modalLink = document.querySelector("#modal-link");

let lastFocusedElement = null;

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    siteNav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter || "all";

    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projects.forEach((project) => {
      const categories = project.dataset.category || "";
      project.hidden = filter !== "all" && !categories.includes(filter);
    });
  });
});

function getProjectButton(source) {
  const card = source.closest(".project-card");
  return card?.querySelector(".project-preview");
}

function openProjectModal(button) {
  if (!modal || !button) return;

  lastFocusedElement = document.activeElement;

  modalTitle.textContent = button.dataset.title || "Project";
  modalType.textContent = button.dataset.type || "Selected work";
  modalSummary.textContent = button.dataset.summary || "";
  modalLink.href = button.dataset.url || "#";
  modalImage.src = button.dataset.image || "";
  modalImage.alt = `${button.dataset.title || "Project"} preview`;

  modal.hidden = false;
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close")?.focus();
}

function closeProjectModal() {
  if (!modal) return;

  modal.hidden = true;
  document.body.classList.remove("modal-open");
  modalImage.removeAttribute("src");

  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus();
  }
}

document.querySelectorAll(".project-preview").forEach((button) => {
  button.addEventListener("click", () => openProjectModal(button));
});

document.querySelectorAll("[data-open-project]").forEach((button) => {
  button.addEventListener("click", () => openProjectModal(getProjectButton(button)));
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", closeProjectModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && !modal.hidden) {
    closeProjectModal();
  }
});
