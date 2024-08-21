import spx from 'spx';
import stickybits, { StickyBits } from 'stickybits';
import { isOutOfViewport } from 'utils/common';
import qvp from 'qvp';

export class Sticky extends spx.Component<typeof Sticky.define> {

  /**
   * Stimulus: Values
   */
  static define = {
    state: {
      useParent: Boolean,
      breakpoint: String,
      offset: Number,
      useFixed: Boolean,
      noStyles: Boolean,
      bottom: Boolean,
      bounding: Boolean,
      scrollElement: String,
      offsetElement: String,
      next: String,
      parentClass: {
        typeof: String,
        default: 'parent'
      },
      stickyClass: {
        typeof: String,
        default: 'sticky'
      },
      stuckClass: {
        typeof: String,
        default: 'stuck'
      },

    },
    nodes: <const>[
      'viewport',
      'fallback'
    ]
  };

  inViewport = () => {

    if (isOutOfViewport(this.dom.viewportNode)) {

    }

  };

  /**
   * Stimulus: Initialize
   */
  connect () {

    this.enabled = this.state.hasBreakpoint
      ? qvp.test(this.state.breakpoint, '|')
      : true;

    if (!this.enabled) return;

    this.options = {};

    if (this.state.hasBottom && this.state.bottom) {
      this.options.verticalPosition = 'bottom';
    }

    if (this.state.hasBounding) {
      this.options.useGetBoundingClientRect = this.state.bounding;
    }

    if (this.state.hasNoStyles) {
      this.options.noStyles = this.state.noStyles;
    }
    if (this.state.hasOffset) {
      this.options.stickyBitStickyOffset = this.state.offset;
    }

    if (this.state.hasScrollElement) {
      this.options.scrollEl = this.state.scrollElement;
    }

    if (this.state.hasUseFixed) {
      this.options.useFixed = this.state.useFixed;
    }

    if (this.state.hasParentClass || this.state.hasStuckClass || this.state.hasStickyClass) {
      this.options.useStickyClasses = true;
    }

  }

  /**
   * Stimulus: Connect
   */
  onmount () {

    if (!this.enabled && this.sticky instanceof stickybits) {

      this.unmount();

    } else {

      if (!this.enabled) return;

      //  spx.on('load', () => this.connect());

      if (this.state.hasOffsetElement) {
        this.options.stickyBitStickyOffset = this.getElementOffset();
      }

      if (this.state.hasUseParent && this.state.useParent) {
        this.sticky = stickybits(this.root.parentElement, this.options);
      } else {
        this.sticky = stickybits(this.root, this.options);
      }
    }
  }

  /**
   * Stimulus: Disconnec  t
   */
  unmount (): void {

    if (this.sticky) this.sticky.cleanup();
    if (this.dom.hasViewportNode) {
      removeEventListener('scroll', this.inViewport, false);
    }
  }

  getElementOffset () {

    const elements = this.state.offsetElement.split(',');

    let offset: number = 0;

    for (const selector of elements) {
      const { offsetHeight } = document.body.querySelector<HTMLElement>(selector);
      offset += offsetHeight;
    }

    return offset;
  }

  /* -------------------------------------------- */
  /* TYPE VALUES                                  */
  /* -------------------------------------------- */

  /**
   * Stickybits: The stickybits instance
   */
  sticky: StickyBits;
  /**
   * Stickybits: The stickybits instance
   */
  options: StickyBits.Options;
  /**
   * Stimulus: Whether or not sticky is enabled/disabled
   */
  enabled: boolean;


}
