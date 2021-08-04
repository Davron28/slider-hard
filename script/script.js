class SLIDER {
  constructor({ slider, direction, time, autoplay, interval }) {
    this.slider = document.querySelector(slider);
    this.sliderLine = this.slider.querySelector(".slider__line");
    this.slides = [...this.sliderLine.children];
    this.prev = document.querySelector(".slider__prev");
    this.next = document.querySelector(".slider__next");
    this.dir = direction.toUpperCase() == "X" ? "X" : "Y";
    this.timeMove = time != undefined ? time : 1000;

    this.width = this.sliderLine.clientWidth;
    this.height = this.sliderLine.clientHeight;
    this.moveSize = this.dir == "X" ? this.width : this.height;
    this.interval = interval ?? 3000;
    this.activeSlide = 0;
    this.autoplay = autoplay;

    this.sliderLine.style = `position:relative;
                                 height: ${this.height}px;
                                 overflow: hidden;`;
    this.slides.forEach((sl, i) => {
      sl.style = `position: absolute;
                        width: ${this.width}px;
                        height: ${this.height}px;`;

      if (i != this.activeSlide) {
        sl.style.transform = `translate${this.dir}(${this.moveSize}px)`;
      }
      if (i === this.slides.length - 1) {
        sl.style.transform = `translate${this.dir}(${-this.moveSize}px)`;
      }
    });

    this.prev.addEventListener("click", () => this.move(this.prev));
    this.next.addEventListener("click", () => this.move(this.next));

    this.autoplaying();
  }
  move(btn) {
    this.disabledBtn();

    let btnPlusOrMinus = btn == this.next ? this.moveSize * -1 : this.moveSize;
    this.slides.forEach((slide, i) => {
      slide.style.transition = "0ms";
      if (i != this.activeSlide) {
        slide.style.transform = `translate${this.dir}(${
          btnPlusOrMinus * -1
        }px)`;
      }
    });
    this.slides[
      this.activeSlide
    ].style.transform = `translate${this.dir}(${btnPlusOrMinus}px)`;
    this.slides[this.activeSlide].style.transition = this.timeMove + "ms";
    if (btn == this.next) {
      this.activeSlide++;
      if (this.activeSlide == this.slides.length) {
        this.activeSlide = 0;
      }
    } else if (btn == this.prev) {
      this.activeSlide--;
      if (this.activeSlide < 0) {
        this.activeSlide = this.slides.length - 1;
      }
    }
    this.slides[this.activeSlide].style.transform = `translate${this.dir}(0px)`;
    this.slides[this.activeSlide].style.transition = this.timeMove + "ms";
  }
  disabledBtn() {
    this.next.disabled = true;
    this.prev.disabled = true;
    setTimeout(() => {
      this.next.disabled = false;
      this.prev.disabled = false;
    }, this.timeMove + 200);
  }
  autoplaying() {
    if (this.autoplay === true) {
      let interval = setInterval(() => {
        this.move(this.next);
      }, this.interval + 1000);
      this.slider.addEventListener("mouseenter", () => {
        clearInterval(interval);
      });
      this.slider.addEventListener('mouseleave', () => {
        interval = setInterval(() => {
            this.move(this.next);
          }, this.interval + 1000);
      })
    }
  }
}

let slider = new SLIDER({
  slider: ".slider",
  direction: "x",
  time: 1000,
  interval: 2000,
  autoplay: false,
});

let slider2 = new SLIDER({
  slider: ".slider2",
  direction: "y",
  time: 1000,
  interval: 2000,
  autoplay: false,
});
