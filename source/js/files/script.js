// Menu burger
const menuIcon = document.querySelector(".menu__icon");
const body = document.querySelector("body");
const menuBody = document.querySelector(".menu__body");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("_active");
  menuBody.classList.toggle("_active");
  body.classList.toggle("_lock");
});

// Accordion
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".accordion__button");
  if (!btn) return;

  const acc = btn.closest(".accordion");
  const isSingle = acc.hasAttribute("data-single");

  const expanded = btn.getAttribute("aria-expanded") === "true";
  const newState = !expanded;
  btn.setAttribute("aria-expanded", String(newState));

  if (isSingle && newState) {
    // закрити всі інші
    acc
      .querySelectorAll('.accordion__button[aria-expanded="true"]')
      .forEach((b) => {
        if (b !== btn) b.setAttribute("aria-expanded", "false");
      });
  }
});
