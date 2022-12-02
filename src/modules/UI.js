import Carousel from './carousel';

export default class UI {
  static loadCarousels() {
    const carouselContainerList = UI.getCarouselContainerList();
    carouselContainerList.forEach((container) => UI.makeCarousel(container));
  }

  static getCarouselContainerList() {
    return document.querySelectorAll('.carousel');
  }

  static makeCarousel(container) {
    return new Carousel(container);
  }
}
