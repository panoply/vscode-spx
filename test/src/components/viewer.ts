import spx from 'spx';
import embla, { EmblaCarouselType } from 'embla-carousel';
import qvp from 'qvp';

/* -------------------------------------------- */
/* CLASS                                        */
/* -------------------------------------------- */

export class Viewer extends spx.Component<typeof Viewer.define> {

  /**
   * Stimulus Values
   */
  static define = {
    state: {
      breakpoint: String,
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
        typeof: String,
        default: 'trimSnaps'
      },
      startIndex: {
        typeof: Number,
        default: 0
      },
      duration: {
        typeof: Number,
        default: 10
      }
    },
    nodes: <const>[
      'pairs',
      'images'
    ]
  };


  public connect () {

    this.active = false;

  }

  public onmount () {

    if (this.pairsClone === null && this.dom.pairsNode) {
      this.pairsClone = this.dom.pairsNode.cloneNode(true);
    }

    if (this.enabled && !this.active) {
      this.screen();
    }

  }

  public unmount () {


    if (this.active && this.enabled) this.carousel.destroy();

    this.active = false;

  }

  /**
   * Whether or not the carousel should be enabled
   */
  get enabled () {

    return this.state.hasBreakpoint
      ? qvp.test(this.state.breakpoint, '|')
      : true;
  }

  screen () {

    if (this.active === false && this.enabled === true) {

      if (this.dom.pairsNode) this.dom.pairsNode.remove();

      this.active = true;
      this.carousel = embla(this.root, {
        align: 'start',
        watchDrag: this.state.watchDrag,
        watchSlides: false,
        dragFree:this.state.dragFree,
        skipSnaps:this.state.skipSnaps,
        containScroll: <'trimSnaps' | 'keepSnaps'>this.state.containScroll,
        duration:this.state.duration,
        startIndex:this.state.startIndex,
        loop:this.state.loop
      });

    } else if (this.active && this.enabled === false) {

      if (!this.dom.pairsNode) {
        this.dom.imagesNode.append(this.pairsClone);
      }

      this.carousel.destroy();
      this.active = false;

    }

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

  /**
   * Siema
   *
   * Goto Slide
   */
  public goto ({ target }: { target: HTMLButtonElement}) {

    this.carousel.scrollTo(Number(target.id));

  }

  /**
   * Carousel Instance
   */
  carousel: EmblaCarouselType;
  /**
   * Stimulus: Whether or not viewer is enabled/disabled
   */
  active: boolean;

  /**
   * Pairs Clone
   */
  pairsClone: Node = null;


}
