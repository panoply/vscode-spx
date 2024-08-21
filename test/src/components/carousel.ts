import spx, { SPX } from 'spx';
import embla, { EmblaCarouselType, EmblaOptionsType as O } from 'embla-carousel';
import qvp from 'qvp';

export class Carousel extends spx.Component<typeof Carousel.define> {

  /**
   * Stimulus Values
   */
  static define = {
    state: {
      breakpoint: String,
      xxs: Number,
      xs: Number,
      sm: Number,
      lg: Number,
      xl: Number,
      xxl: Number,
      id: String,
      align: {
        typeof: String<'start' | 'center' | 'end'>,
        default: 'start'
      },
      axis: {
        typeof: String<'x' | 'y'>,
        default: 'x'
      },
      dragFree: {
        typeof: Boolean,
        default: true
      },
      watchDrag: {
        typeof: Boolean,
        default: true
      },
      loop: {
        typeof: Boolean,
        default: true
      },
      skipSnaps: {
        typeof: Boolean,
        default: true
      },
      containScroll: {
        typeof: String<'containScroll' | 'keepSnaps'>,
        default: 'keepSnaps'
      },
      startIndex: {
        typeof: Number,
        default: 0
      },
      duration: {
        typeof: Number,
        default: 10
      },
      direction: {
        typeof: String<'ltr' | 'rtl'>,
        default: 'ltr'
      }
    },
    nodes: <const>[
      'slideshow',
      'nav'
    ]
  };

  /**
   * Whether or not the carousel should be enabled
   */
  get enabled () {
    return this.state.hasBreakpoint ? qvp.test(this.state.breakpoint, '|') : true;
  }

  /**
   * Returns the Embla carousel selector
   */
  get selector () {
    return this.dom.slideshowNode ? this.dom.slideshowNode : this.root;
  }

  /* -------------------------------------------- */
  /* STIMULUS LIFECYCLE                           */
  /* -------------------------------------------- */

  connect () {

    this.active = false;

  }

  onmount () {

    if (this.enabled && !this.active) this.screen();

  }


  unmount () {

    if (this.active && this.enabled) this.carousel.destroy();

  }

  /* -------------------------------------------- */
  /* METHODS                                      */
  /* -------------------------------------------- */

  get breakpoints () {
    const responsive: O['breakpoints'] = {};
    return responsive;
  }

  private screen () {

    if (!this.active && this.enabled) {

      this.active = true;
      this.carousel = embla(this.selector, {
        align: <O['align']>this.state.align,
        axis: <O['axis']>this.state.axis,
        direction: <O['direction']>this.state.direction,
        dragFree: this.state.dragFree,
        watchDrag: this.state.watchDrag,
        skipSnaps: this.state.skipSnaps,
        containScroll: <O['containScroll']>this.state.containScroll,
        duration: this.state.duration,
        startIndex: this.state.startIndex,
        loop: this.state.loop,
        watchSlides: false,
      });

      this.carousel.slideNodes().forEach(({
        firstElementChild
      }) => {
        if (firstElementChild.classList.contains('d-none')) {
          firstElementChild.classList.remove('d-none');
        }
      });

    } else if (this.active && !this.enabled) {

      this.carousel.destroy();
      this.active = false;
      this.clone = this.selector.cloneNode(true);

    }

  }

  /* -------------------------------------------- */
  /* STIMULUS EVENTS                              */
  /* -------------------------------------------- */

  /**
   * Carousel - Goto
   */
  public goto ({ attrs }: SPX.Event<{ index: number }>) {

    this.carousel.scrollTo(attrs.index, false);

  }

  /**
   * Carousel - Next
   */
  public next () {

    this.carousel.scrollNext();

  }

  /**
   * Carousel - Previous
   */
  public prev () {

    this.carousel.scrollPrev();

  }

  /* -------------------------------------------- */
  /* TYPES                                        */
  /* -------------------------------------------- */

  /**
   * Carousel Instance
   */
  carousel: EmblaCarouselType;
  /**
   * Carousel Clone
   */
  clone: Node;
  /**
   * Stimulus: Whether or not viewer is enabled/disabled
   */
  active: boolean;

}
