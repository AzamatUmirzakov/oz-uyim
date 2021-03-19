let margin = parseFloat(
  getComputedStyle(document.querySelector("div.center")).marginLeft
);

document.querySelector("header.page-header > img").style.right = margin + "px";

let advantages = document.querySelector("div.advantages");

advantages.style.bottom = "0px";
for (let advantage of advantages.children) {
  advantage.style.marginBottom = -advantage.offsetHeight / 2 + "px";
}
advantages.style.paddingLeft = margin + "px";
advantages.style.paddingRight = margin + "px";

let last_scroll = 0;
window.addEventListener('scroll', () => {
  console.log(true);
  if (window.pageYOffset > last_scroll) {
    document.querySelector('div.header-top').classList.remove('active');
    last_scroll = window.pageYOffset;
  } else {
    document.querySelector('div.header-top').classList.add('active');
    last_scroll = window.pageYOffset;
  }
})