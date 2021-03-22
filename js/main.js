let margin = parseFloat(
  getComputedStyle(document.querySelector("div.center")).marginLeft
);

if (!window.matchMedia("(max-width: 480px)").matches) {
  document.querySelector("header.page-header > img").style.right =
    margin + "px";
} else {
  document.querySelector("header.page-header > img").style.right = "calc(-50%)";
}

let advantages = document.querySelector("div.advantages");

if (!window.matchMedia("(max-width: 1080px)").matches) {
  advantages.style.bottom = "0px";
  for (let advantage of advantages.children) {
    advantage.style.marginBottom = -advantage.offsetHeight / 2 + "px";
  }
}
if (window.matchMedia("(max-width: 1080px)").matches) {
  advantages.style.bottom = `-${
    parseFloat(getComputedStyle(advantages).height) -
    advantages.firstElementChild.offsetHeight / 2
  }px`;
}
if (!window.matchMedia("(max-width: 1080px)").matches) {
  advantages.style.paddingLeft = margin + "px";
  advantages.style.paddingRight = margin + "px";
}

let last_scroll = 0;
if (!window.matchMedia("(max-width: 480px)").matches) {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > last_scroll) {
      document.querySelector("div.header-top").classList.remove("active");
      last_scroll = window.pageYOffset;
    } else {
      document.querySelector("div.header-top").classList.add("active");
      last_scroll = window.pageYOffset;
    }
  });
}

for (let image of Array.from(
  document.querySelectorAll("header.page-header > img")
)) {
  image.addEventListener("dragstart", (event) => {
    event.preventDefault();
  });
  image.addEventListener("select", (e) => {
    e.preventDefault();
  });
}

document.querySelector("footer").style.padding =
  "0px " + getComputedStyle(document.querySelector("div.center")).paddingRight;
