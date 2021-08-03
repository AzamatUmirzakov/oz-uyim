"use strict";

// блок "Как это работает"
var wrapper = document.querySelector(".how-it-works-wrapper");
var buttons = document.querySelector(".how-it-works-inside .header-buttons");
var buy_steps = document.querySelector(".buy-steps").cloneNode(true);
var sell_steps = document.querySelector(".sell-steps").cloneNode(true);
var state = {
  how_it_works_animating: false,
  start_point: 0,
  current: "buy"
};
var configuration = {
  steps_number: Array.from(document.querySelectorAll("li.step")).length,
  steps_interval: 200,
  images: {
    buy: ["./assets/images/buy-step-1.png", "./assets/images/buy-step-2.png", "./assets/images/buy-step-3.png"],
    sell: ["./assets/images/sell-step-1.png", "./assets/images/sell-step-2.png", "./assets/images/sell-step-3.png"]
  }
};
document.querySelector(".buy-steps").remove();
changeGuide(state.current);
buttons.addEventListener("click", function (event) {
  var target = event.target;

  if (target.tagName == "BUTTON") {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = buttons.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var button = _step.value;
        button.classList.remove("active");
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    target.classList.add("active"); // if (target.dataset.value == "sell") {
    //   document.querySelector(".steps").style.display = "none";
    //   document.querySelector(".sell-steps").style.display = "grid";
    // }

    changeGuide(target.dataset.value);
  }
});

function changeGuide(guide) {
  switch (guide) {
    case "sell":
      document.querySelector(".buy-steps").remove();
      document.querySelector(".how-it-works-inside").append(sell_steps);
      break;

    case "buy":
      document.querySelector(".sell-steps").remove();
      document.querySelector(".how-it-works-inside").append(buy_steps);
      break;
  }

  state.current = guide;
  configuration.steps_number = Array.from(document.querySelectorAll("li.step")).length;
  var how_it_works = document.querySelector(".how-it-works");
  wrapper.style.height = parseFloat(how_it_works.offsetHeight) + configuration.steps_number * configuration.steps_interval + state.start_point + "px";
  switch_steps();
}

adaptive();
setInterval(function () {
  adaptive();
}, 1000);

var check_scroll = function check_scroll() {
  var how_it_works = document.querySelector(".how-it-works");
  wrapper.style.height = parseFloat(how_it_works.offsetHeight) + configuration.steps_number * configuration.steps_interval + state.start_point + "px";

  if (wrapper.getBoundingClientRect().top <= -state.start_point) {
    // how_it_works.parentElement.style.top = "";
    // how_it_works.style.bottom = "";
    how_it_works.classList.remove("animation-end");
    how_it_works.classList.add("animation");
    how_it_works.style.top = -state.start_point + "px";
    how_it_works.style.height = "calc(100vh + ".concat(state.start_point, "px)");
    state.how_it_works_animating = true;

    if (wrapper.getBoundingClientRect().bottom <= how_it_works.getBoundingClientRect().bottom) {
      how_it_works.style.top = "";
      how_it_works.classList.remove("animation");
      how_it_works.classList.add("animation-end"); // how_it_works.style.bottom = state.start_point + "px";
      // how_it_works.parentElement.style.top = -state.start_point + "px";
    }
  } else {
    how_it_works.classList.remove("animation");
    how_it_works.classList.remove("animation-end");
    state.how_it_works_animating = false;
  }

  switch_steps();
};

function switch_steps() {
  var current_scroll = wrapper.getBoundingClientRect().top + state.start_point;

  if (current_scroll < 0) {
    current_scroll = Math.abs(current_scroll);
    toggleStep(Math.floor(current_scroll / configuration.steps_interval));
  }
}

window.addEventListener("scroll", check_scroll);
check_scroll();

function toggleStep(index) {
  // if (index < 0) {
  //   index = 0;
  // } else if (
  //   index >
  //   Array.from(document.querySelectorAll(".step")).length - 1
  // ) {
  //   index = Array.from(document.querySelectorAll(".step")).length - 1;
  // }
  if (index < 0 || index > Array.from(document.querySelectorAll(".step")).length - 1) {
    return false;
  }

  for (var _i = 0, _Array$from = Array.from(document.querySelectorAll(".step")); _i < _Array$from.length; _i++) {
    var _step3 = _Array$from[_i];

    _step3.classList.remove("open");

    if (!window.matchMedia("(max-width: 750px)").matches) {
      _step3.querySelector(".step-description").style.maxHeight = "0";
    }
  }

  var step = Array.from(document.querySelectorAll(".step"))[index];
  step.classList.toggle("open");

  if (!window.matchMedia("(max-width: 750px)").matches) {
    var maxHeight = 0; // debugger;

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = step.querySelector(".step-description").children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var child = _step2.value;
        maxHeight += parseFloat(getComputedStyle(child).height);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    step.querySelector(".step-description").style.maxHeight = maxHeight + "px";
  }

  var step_image = document.querySelector(".step-image img");
  step_image.src = configuration.images[state.current][index];
}

function adaptive() {
  var how_it_works = document.querySelector(".how-it-works");

  if (window.matchMedia("(max-height: 920px)").matches) {
    var header = how_it_works.querySelector("header h1");
    state.start_point = header.offsetHeight + parseFloat(getComputedStyle(header).marginBottom) + parseFloat(getComputedStyle(header.parentElement.parentElement).paddingTop);
  }

  var margin = parseFloat(getComputedStyle(document.querySelector("div.center")).marginLeft);

  if (window.matchMedia("(max-width: 1080px)").matches) {
    margin = parseFloat(getComputedStyle(document.querySelector("div.center")).paddingLeft);
  }

  if (!window.matchMedia("(max-width: 750px)").matches) {
    document.querySelector("header.page-header > img").style.right = margin + "px";
  } else {
    document.querySelector("header.page-header > img").style.right = "calc(-50%)";
  }

  var advantages = document.querySelector("div.advantages");
  advantages.style.paddingLeft = margin + "px";
  advantages.style.paddingRight = margin + "px";

  if (!window.matchMedia("(max-width: 1080px)").matches) {
    advantages.style.bottom = -advantages.firstElementChild.offsetHeight / 2 + "px";
  }

  if (window.matchMedia("(max-width: 1080px)").matches) {
    advantages.style.bottom = "-".concat(parseFloat(getComputedStyle(advantages).height) - advantages.firstElementChild.offsetHeight / 2, "px");
  }

  var last_scroll = 0;

  if (!window.matchMedia("(max-width: 750px)").matches) {
    window.addEventListener("scroll", function () {
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

  for (var _i2 = 0, _Array$from2 = Array.from(document.querySelectorAll("header.page-header > img")); _i2 < _Array$from2.length; _i2++) {
    var image = _Array$from2[_i2];
    image.addEventListener("dragstart", function (event) {
      event.preventDefault();
    });
    image.addEventListener("select", function (e) {
      e.preventDefault();
    });
  }

  document.querySelector("footer").style.padding = "0px " + getComputedStyle(document.querySelector("div.center")).paddingRight;
}