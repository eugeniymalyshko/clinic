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
// Map
// Створюємо карту
let map = L.map("map", { scrollWheelZoom: false }).setView(
  [50.45059074295707, 30.378224474472542],
  16
);

// Додаємо шари з OSM
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 20,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors',
}).addTo(map);

// Додаємо маркер
L.marker([50.45059074295707, 30.378224474472542])
  .addTo(map)
  //   .bindPopup("<b>Кмкл №5</b><br>")
  .openPopup();
