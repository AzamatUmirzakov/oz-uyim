// блок "Как это работает"

const wrapper = document.querySelector(".how-it-works-wrapper");
const how_it_works = document.querySelector(".how-it-works");

const configuration = {
  steps_number: Array.from(document.querySelectorAll("li.step")).length,
  steps_interval: 200,
};
let state = {
  how_it_works_animating: false,
  start_point: 0,
};

function adaptive() {
  if (window.matchMedia("(max-height: 920px)").matches) {
    let header = how_it_works.querySelector("header h1");
    state.start_point =
      header.offsetHeight +
      parseFloat(getComputedStyle(header).marginBottom) +
      parseFloat(
        getComputedStyle(header.parentElement.parentElement).paddingTop
      );
  }
  let margin = parseFloat(
    getComputedStyle(document.querySelector("div.center")).marginLeft
  );
  if (window.matchMedia("(max-width: 1080px)").matches) {
    margin = parseFloat(
      getComputedStyle(document.querySelector("div.center")).paddingLeft
    );
  }
  if (!window.matchMedia("(max-width: 480px)").matches) {
    document.querySelector("header.page-header > img").style.right =
      margin + "px";
  } else {
    document.querySelector("header.page-header > img").style.right =
      "calc(-50%)";
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

  let last_scroll = 0;
  if (!window.matchMedia("(max-width: 480px)").matches) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > last_scroll) {
        document.querySelector("div.header-top").classList.remove("active");
        last_scroll = window.pageYOffset;
      } else {
        if (!state.how_it_works_animating) {
          document.querySelector("div.header-top").classList.add("active");
          last_scroll = window.pageYOffset;
        }
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
    "0px " +
    getComputedStyle(document.querySelector("div.center")).paddingRight;
}
adaptive();

setInterval(() => {
  adaptive();
}, 100);

wrapper.style.height =
  parseFloat(how_it_works.offsetHeight) +
  configuration.steps_number * configuration.steps_interval +
  state.start_point +
  "px";

const check_scroll = () => {
  if (wrapper.getBoundingClientRect().top <= -state.start_point) {
    // how_it_works.parentElement.style.top = "";
    // how_it_works.style.bottom = "";
    how_it_works.classList.remove("animation-end");
    how_it_works.classList.add("animation");
    how_it_works.style.top = -state.start_point + "px";
    how_it_works.style.height = `calc(100vh + ${state.start_point}px)`;
    state.how_it_works_animating = true;
    console.log(wrapper.getBoundingClientRect().bottom);
    if (
      wrapper.getBoundingClientRect().bottom <=
      how_it_works.getBoundingClientRect().bottom
    ) {
      how_it_works.style.top = "";
      how_it_works.classList.remove("animation");
      how_it_works.classList.add("animation-end");
      // how_it_works.style.bottom = state.start_point + "px";
      // how_it_works.parentElement.style.top = -state.start_point + "px";
    } else {
      switch_steps();
    }
  } else {
    how_it_works.classList.remove("animation");
    how_it_works.classList.remove("animation-end");
    state.how_it_works_animating = false;
  }
};

const switch_steps = () => {
  let current_scroll = wrapper.getBoundingClientRect().top + state.start_point;
  if (current_scroll < 0) {
    current_scroll = Math.abs(current_scroll);
    toggleStep(Math.floor(current_scroll / configuration.steps_interval));
  }
};

window.addEventListener("scroll", check_scroll);
check_scroll();

function toggleStep(index) {
  if (
    index < 0 ||
    index > Array.from(document.querySelectorAll(".step")).length - 1
  ) {
    return false;
  }
  for (let step of Array.from(document.querySelectorAll(".step"))) {
    step.classList.remove("open");
    if (!window.matchMedia("(max-width: 480px)").matches) {
      step.querySelector(".step-description").style.maxHeight = "0";
    }
  }
  const step = Array.from(document.querySelectorAll(".step"))[index];
  step.classList.toggle("open");
  if (!window.matchMedia("(max-width: 480px)").matches) {
    let maxHeight = 0;
    // debugger;
    for (let child of step.querySelector(".step-description").children) {
      maxHeight += parseFloat(getComputedStyle(child).height);
    }
    step.querySelector(".step-description").style.maxHeight = maxHeight + "px";
  }
}
