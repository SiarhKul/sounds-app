"use strict";

document.querySelector('.fullscreen').addEventListener('click', setFullScreen);

function setFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      turnOffFullscreen();
    }
  }
}

function slider(set) {
  var sliderContainer = document.querySelector(set.name),
      slider = sliderContainer.querySelector('.slider-wrapper'),
      sliderItem = slider.querySelectorAll('.slider-slide'),
      sliderArrows = sliderContainer.querySelectorAll('.slider-btn');
  var maxWidth = forSliderItem(sliderItem);
  var slidWidth = 0;
  var count = 0;

  function forSliderItem(sliderItem) {
    var w = 0;

    for (var i = 0; i < sliderItem.length - 1; i++) {
      w += sliderItem[i].clientWidth;
    }

    return w;
  }

  sliderArrows[0].addEventListener('click', flipLeft);

  function flipLeft() {
    if (count !== 0) {
      count--; // slidWidth -= sliderItem[count].clientWidth;

      slidWidth = slidWidth = sliderItem[0].clientWidth * count;
      ;
      slider.style.transform = "translateX(-".concat(slidWidth, "px)");
    } else {
      count = sliderItem.length - 1;
      slidWidth = maxWidth;
      slider.style.transform = "translateX(-".concat(slidWidth, "px)");
    }
  }

  sliderArrows[1].addEventListener('click', flipRight);

  function flipRight() {
    if (count < sliderItem.length - 1) {
      count++;
      slidWidth = sliderItem[0].clientWidth * count; // slidWidth += sliderItem[count].clientWidth;

      slider.style.transform = "translateX(-".concat(slidWidth, "px)");
    } else {
      count = 0;
      slidWidth = 0;
      slider.style.transform = "translateX(-".concat(slidWidth, "px)");
    }
  }

  window.addEventListener('resize', function () {
    slider.style.transform = "translateX(-".concat(sliderItem[0].clientWidth * count, "px)");
  });

  function slideInit(elem) {
    var surface = elem;
    var threshold = 150;
    var restraint = 100;
    var allowedTime = 300;
    var startX = 0;
    var startY = 0;
    var distX = 0;
    var distY = 0;
    var startTime = 0;
    var elapsedTime = 0;
    surface.addEventListener('mousedown', function (e) {
      e.target.style.cursor = 'pointer';
      startX = e.pageX;
      startY = e.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
    }, false);
    surface.addEventListener('mouseup', function (e) {
      distX = e.pageX - startX;
      distY = e.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;

      if (elapsedTime <= allowedTime) {
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          if (distX > 0) {
            flipRight();
          } else {
            flipLeft();
            ;
          }
        }
      }

      e.preventDefault();
    }, false);
    surface.addEventListener('touchstart', function (e) {
      console.log(e.target);

      if (e.target.classList.contains('slider-btns') || e.target.classList.contains('slider-btn')) {
        e.target.classList.contains('slider-btn--prev') ? flipRight() : flipLeft();
      }

      var touchobj = e.changedTouches[0];
      startX = touchobj.pageX;
      startY = touchobj.pageY;
      startTime = new Date().getTime();
      e.preventDefault();
    }, false);
    surface.addEventListener('touchmove', function (e) {
      e.preventDefault();
    }, false);
    surface.addEventListener('touchend', function (e) {
      var touchobj = e.changedTouches[0];
      distX = touchobj.pageX - startX;
      distY = touchobj.pageY - startY;
      elapsedTime = new Date().getTime() - startTime;

      if (elapsedTime <= allowedTime) {
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          distX > 0 ? flipRight() : flipLeft();
        }
      }

      e.preventDefault();
    }, false);
  }

  var elem = document.querySelector('.slider');
  slideInit(elem);
}

slider({
  name: ".slider"
});