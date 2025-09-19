// Menu burger
const menuIcon = document.querySelector(".menu__icon");
const body = document.querySelector("body");
const menuBody = document.querySelector(".menu__body");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("_active");
  menuBody.classList.toggle("_active");
  body.classList.toggle("_lock");
});
