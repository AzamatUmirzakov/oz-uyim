// блок "Как это работает"

const wrapper = document.querySelector(".how-it-works-wrapper");

let buttons = document.querySelector(".how-it-works-inside .header-buttons");
let buy_steps = document.querySelector(".buy-steps");
let sell_steps = document.querySelector(".sell-steps");

buy_steps.addEventListener("click", (e) => {
  if (window.matchMedia("(max-width: 750px)").matches) {
    return false;
  }
  if (e.target.closest(".steps-list li.step")) {
    toggleStep(e.target.closest(".steps-list li.step"));
  }
});
sell_steps.addEventListener("click", (e) => {
  if (window.matchMedia("(max-width: 750px)").matches) {
    return false;
  }
  if (e.target.closest(".steps-list li.step")) {
    toggleStep(e.target.closest(".steps-list li.step"));
  }
});
changeGuide("buy");

buttons.addEventListener("click", (event) => {
  let target = event.target;
  if (target.tagName == "BUTTON") {
    for (let button of buttons.children) {
      button.classList.remove("active");
    }
    target.classList.add("active");
    changeGuide(target.dataset.value);
  }
});

adaptive();

setInterval(() => {
  adaptive();
}, 1000);

function changeGuide(guide) {
  switch (guide) {
    case "sell":
      document.querySelector(".buy-steps").style.display = "none";
      document.querySelector(".sell-steps").style.display = "";
      if (!window.matchMedia("(max-width: 750px)").matches) {
        toggleStep(document.querySelector(".sell-steps").firstElementChild);
      }
      break;
    case "buy":
      document.querySelector(".sell-steps").style.display = "none";
      document.querySelector(".buy-steps").style.display = "";
      if (!window.matchMedia("(max-width: 750px)").matches) {
        toggleStep(document.querySelector(".buy-steps").firstElementChild);
      }
      break;
  }
}

function toggleStep(step) {
  for (let temp of step.parentElement.children) {
    temp.classList.remove("open");
    if (!window.matchMedia("(max-width: 750px)").matches) {
      temp.querySelector(".step-description").style.maxHeight = "0";
    }
  }
  step.classList.toggle("open");
  if (!window.matchMedia("(max-width: 750px)").matches) {
    let maxHeight = 0;
    // debugger;
    for (let child of step.querySelector(".step-description").children) {
      maxHeight += parseFloat(getComputedStyle(child).height);
    }
    step.querySelector(".step-description").style.maxHeight = maxHeight + "px";
  }
  let step_image = document.querySelector(".step-image img");
  step_image.src = step.querySelector("img").src;
}

function adaptive() {
  let margin = parseFloat(
    getComputedStyle(document.querySelector("div.center")).marginLeft
  );
  if (window.matchMedia("(max-width: 1080px)").matches) {
    margin = parseFloat(
      getComputedStyle(document.querySelector("div.center")).paddingLeft
    );
  }

  let advantages = document.querySelector("div.advantages");

  advantages.style.paddingLeft = margin + "px";
  advantages.style.paddingRight = margin + "px";
  if (!window.matchMedia("(max-width: 1080px)").matches) {
    advantages.style.bottom =
      -advantages.firstElementChild.offsetHeight / 2 + "px";
  }
  if (window.matchMedia("(max-width: 1080px)").matches) {
    advantages.style.bottom = `-${
      parseFloat(getComputedStyle(advantages).height) -
      advantages.firstElementChild.offsetHeight / 2
    }px`;
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
    "0px " +
    getComputedStyle(document.querySelector("div.center")).paddingRight;
}
