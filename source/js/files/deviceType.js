//---------- Device type-------------------

function isMobile() {
  const regex =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
}

if (isMobile()) {
  document.body.classList.add("_touch");
  //   const menusArrows = document.querySelectorAll(".menu__arrow");
  const menusHub = document.querySelectorAll(".menu__link_hub");

  if (menusHub.length > 0) {
    for (let index = 0; index < menusHub.length; index++) {
      const menuHub = menusHub[index];
      menuHub.addEventListener("click", function (e) {
        menuHub.parentElement.classList.toggle("_active");
      });
    }
  }
} else {
  document.body.classList.add("_pc");
}
