export default class Carousel {
  constructor(carouselContainer) {
    this.carouselContainer = carouselContainer;
    this.slideQuantity = this.countSlides();
    this.currentSlideIndex = this.initialiseCurrentSlideIndex();

    this.activateNavigationBar();
    this.activateArrowButton('right');
    this.activateArrowButton('left');
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

  initialiseCurrentSlideIndex() {
    return this.slideQuantity ? 0 : null;
  }

  activateNavigationBar() {
    const navigationBar = this.getNavigationBar();
    this.populateDisplay(navigationBar);
  }

  getNavigationBar() {
    return this.carouselContainer.querySelector('.navigation');
  }

  populateDisplay(navigationBar) {
    for (let slideIndex = 0; slideIndex < this.slideQuantity; slideIndex += 1) {
      navigationBar.appendChild(this.makeNavigationDot(slideIndex));
    }
    this.activateDots(navigationBar);
  }

  makeNavigationDot(slideIndex) {
    const navigationDot = document.createElement('button');
    navigationDot.classList.add('dot');
    if (slideIndex === 0) {
      navigationDot.classList.add('active');
    }
    navigationDot.setAttribute('data-slide-index', slideIndex);
    return navigationDot;
  }

  activateDots(navigationBar) {
    navigationBar.querySelectorAll('.dot').forEach((navigationDot) => {
      navigationDot.addEventListener('click', () =>
        this.changeSlide(parseInt(navigationDot.getAttribute('data-slide-index'), 10))
      );
    });
  }

  activateArrowButton(direction) {
    const arrowButton = this.getArrowButton(direction);
    let change;
    if (direction === 'right') {
      change = 1;
    } else if (direction === 'left') {
      change = -1;
    }
    arrowButton.addEventListener('click', () => this.incrementSlide(change));
  }

  getArrowButton(direction) {
    return this.carouselContainer.querySelector(`button.arrow.${direction}`);
  }

  incrementSlide(difference) {
    this.changeSlide(this.currentSlideIndex + difference);
  }

  changeSlide(newSlideIndex) {
    this.currentSlideIndex = newSlideIndex;
    this.displayCurrentSlide();
    this.updateActiveNavigationDot();
  }

  displayCurrentSlide() {
    const slideListDiv = this.getSlideListDiv();
    const newLeft = `${-1 * 100 * this.currentSlideIndex}%`;
    slideListDiv.style.left = newLeft;
  }

  getSlideListDiv() {
    return document.querySelector('.slide-list');
  }

  updateActiveNavigationDot() {
    const navigationBar = this.getNavigationBar();
    navigationBar.querySelector('.active').classList.remove('active');
    navigationBar.childNodes[this.currentSlideIndex].classList.add('active');
  }
}
