
import spx, { SPX } from 'spx';
import embla, { EmblaCarouselType } from 'embla-carousel';
import qvp from 'qvp';

export class Variants extends spx.Component<typeof Variants.define> {

  /**
   * Stimulus Values
   */
  static define = {
    state: {
      current: String,
      breakpoint: String,
      limit: Number,
      count: Number,
      emblaActive: Boolean,
      startIndex: {
        typeof: Number,
        default: 0
      }
    },
    nodes: <const>[
      'variant',
      'carousel'
    ]
  };

  /**
   * Whether or not the carousel should be enabled
   */
  get enabled () {
    return this.state.hasBreakpoint ? qvp.test(this.state.breakpoint, '|') : true;
  }

  get sticky () {
    return spx.component('sticky');
  }

  /**
   * Stimulus Initialize
   */
  onmount () {

    if (this.state.count > this.state.limit) {
      this.onCarousel();
    }

  }

  onCarousel () {

    if (!this.state.emblaActive && this.enabled) {

      this.carousel = embla(this.dom.carouselNode, {
        align: 'start',
        dragFree: true,
        watchDrag: true,
        skipSnaps: true,
        containScroll: 'keepSnaps',
        duration: 10,
        startIndex: this.state.startIndex,
        loop: true
      });

      this.carousel.slideNodes().forEach((slide, index) => {

        if (slide.classList.contains('active') && index >= this.state.limit) {
          this.carousel.scrollTo(index, true);
        }

      });

      this.state.emblaActive = true;

    } else if (this.state.emblaActive && !this.enabled) {

      this.carousel.destroy();
      this.state.emblaActive = false;

    }
  }

  /**
   * Tiggers within the dom whenever via `data-action` upon mouseover
   * of a collection product `<a href>` node. The logic assumes `<picture>`
   * images and determines swaps via lazySizes attribute annotation.
   */
  onHover ({ target }: SPX.Event) {

    if (qvp.isTouch) return;

    this.dom.variantNode.innerText = target.getAttribute('aria-label');

    const current = this.state.current;
    const element = this.dom.variantNode;

    target.addEventListener('pointerleave', function handle () {
      element.innerText = current;
      target.removeEventListener('pointerleave', handle);
    }, { once: true });

  };

  carousel: EmblaCarouselType;

}
