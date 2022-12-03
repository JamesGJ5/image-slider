export default class Carousel {
  constructor(carouselContainer) {
    this.carouselContainer = carouselContainer;
    this.slideQuantity = this.countSlides();
    this.currentSlideIndex = this.initialiseCurrentImageIndex();

    this.fillNavigationBar();
    this.activateRightArrowButton();
    // this.activateLeftArrowButton();
  }

  set currentSlideIndex(value) {
    if (value !== null) {
      this._currentSlideIndex =
        ((value % this.slideQuantity) + this.slideQuantity) % this.slideQuantity;
    }
  }

  get currentSlideIndex() {
    return this._currentSlideIndex;
  }

  countSlides() {
    return this.carouselContainer.querySelectorAll('.slide-list img').length;
  }

  initialiseCurrentImageIndex() {
    return this.slideQuantity ? 0 : null;
  }

  fillNavigationBar() {
    const navigationBar = this.getNavigationBar();
    for (let slideIndex = 0; slideIndex < this.slideQuantity; slideIndex += 1) {
      navigationBar.appendChild(this.makeNavigationDot(slideIndex));
    }
  }

  getNavigationBar() {
    return this.carouselContainer.querySelector('.navigation');
  }

  makeNavigationDot(slideIndex) {
    const navigationDot = document.createElement('button');
    navigationDot.classList.add('dot');
    if (slideIndex === 0) {
      navigationDot.classList.add('active');
    }
    return navigationDot;
  }

  activateRightArrowButton() {
    const rightArrowButton = this.getArrowButton('right');
    rightArrowButton.addEventListener('click', () => this.incrementSlide(+1));
  }

  getArrowButton(direction) {
    return this.carouselContainer.querySelector(`button.arrow.${direction}`);
  }

  incrementSlide(change) {
    this.currentSlideIndex += change;
    this.goToCurrentSlide();
  }

  goToCurrentSlide() {
    this.displayCurrentSlide();
  }

  displayCurrentSlide() {
    const slideListDiv = this.getSlideListDiv();
    const newLeft = `${-1 * 100 * this.currentSlideIndex}%`;
    slideListDiv.style.left = newLeft;
  }

  getSlideListDiv() {
    return document.querySelector('.slide-list');
  }
}
