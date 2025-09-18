//---------- Device type-------------------
let userAgent = navigator.userAgent.toLowerCase(),
  width = screen.availWidth,
  height = screen.availHeight,
  userIsOnMobileDevice = checkIfUserIsOnMobileDevice(userAgent);

if (userIsOnMobileDevice) {
  document.body.classList.add("_touch");
} else {
  document.body.classList.add("_pc");
}
function checkIfUserIsOnMobileDevice($userAgent) {
  if ($userAgent.includes("mobi") || $userAgent.includes("tablet")) {
    return true;
  }
  if ($userAgent.includes("android")) {
    if (height > width && width < 800) {
      // Screen is higher than it’s wide, so we have portrait mode
      return true;
    }
    if (width > height && height < 800) {
      // Screen is wider than it’s high, so we have landscape mode
      return true;
    }
  }
  return false;
}
