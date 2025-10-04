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
// document.addEventListener("click", (e) => {
//   const btn = e.target.closest(".accordion__button");
//   if (!btn) return;

//   const acc = btn.closest(".accordion");
//   const isSingle = acc.hasAttribute("data-single");

//   const expanded = btn.getAttribute("aria-expanded") === "true";
//   const newState = !expanded;
//   btn.setAttribute("aria-expanded", String(newState));

//   if (isSingle && newState) {
//     // закрити всі інші
//     acc
//       .querySelectorAll('.accordion__button[aria-expanded="true"]')
//       .forEach((b) => {
//         if (b !== btn) b.setAttribute("aria-expanded", "false");
//       });
//   }
// });

// ===============================================================
// Акордеон без стрибків висоти
document.addEventListener("DOMContentLoaded", () => {
  const acc = document.querySelector(".accordion");
  const single = acc.hasAttribute("data-single");
  const buttons = Array.from(acc.querySelectorAll(".acc-btn"));

  const panelByBtn = (btn) =>
    document.getElementById(btn.getAttribute("aria-controls"));

  // вирівняти hidden на старті
  buttons.forEach((b) => {
    const p = panelByBtn(b);
    p.hidden = b.getAttribute("aria-expanded") !== "true";
  });

  function setOpen(btn, open) {
    const panel = panelByBtn(btn);
    btn.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
  }

  // Головна фішка: «заморожуємо» висоту контейнера на час перемикання
  function switchPanels(newBtn) {
    const currentBtn = buttons.find(
      (b) => b.getAttribute("aria-expanded") === "true"
    );
    if (currentBtn === newBtn) {
      // повторний клік — просто згортання/розгортання
      const start = acc.offsetHeight;
      requestAnimationFrame(() => {
        setOpen(newBtn, newBtn.getAttribute("aria-expanded") !== "true"); // toggle
        const end = acc.offsetHeight;
        lockHeightTransition(start, end);
      });
      return;
    }

    // Виміряти висоту ДО змін
    const startHeight = acc.offsetHeight;

    // Застосувати зміни у два кроки, щоб браузер порахував кінцеву висоту
    setOpen(newBtn, true);
    if (single && currentBtn) setOpen(currentBtn, false);

    // Дочекатись перерахунку макету
    requestAnimationFrame(() => {
      const endHeight = acc.offsetHeight;
      lockHeightTransition(startHeight, endHeight);
    });
  }

  function lockHeightTransition(start, end) {
    // Зафіксувати стартову висоту
    acc.style.height = `${start}px`;
    // форс перерахунок стилів
    void acc.offsetHeight;
    // Запустити плавну зміну висоти до цільової
    acc.style.height = `${end}px`;

    const clear = () => {
      acc.style.height = ""; // повертаємо auto
      acc.removeEventListener("transitionend", clear);
    };
    acc.addEventListener("transitionend", clear, { once: true });
  }

  // Навігація й кліки
  buttons.forEach((btn, idx) => {
    btn.addEventListener("click", () => switchPanels(btn));
    btn.addEventListener("keydown", (e) => {
      let target = null;
      if (e.key === "ArrowDown") target = buttons[(idx + 1) % buttons.length];
      if (e.key === "ArrowUp")
        target = buttons[(idx - 1 + buttons.length) % buttons.length];
      if (e.key === "Home") target = buttons[0];
      if (e.key === "End") target = buttons[buttons.length - 1];
      if (target) {
        e.preventDefault();
        target.focus();
      }
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        switchPanels(btn);
      }
    });
  });
});
// ===============================================================

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
