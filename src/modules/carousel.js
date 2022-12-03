export default class Carousel {
  constructor(carouselContainer) {
    this.carouselContainer = carouselContainer;
    this.slideQuantity = this.countSlides();
    this.currentImageIndex = this.initialiseCurrentImageIndex();

    this.fillNavigationBar();
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
}
