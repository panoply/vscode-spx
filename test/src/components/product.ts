import spx from 'spx';
import m from 'mithril';
import qvp from 'qvp';
import embla, { EmblaCarouselType } from 'embla-carousel';

export class Product extends spx.Component<typeof Product.define> {

  static cache: Map<string, number> = new Map();

  static define = {
    state: {
      breakpoint: {
        typeof: String,
        persist: true,
        default: ''

      },
      name: String,
      href: String,
      variant: String,
      price: String,
      title: String,
      slideSize: Number,
      dotsRendered: Boolean,
      index: {
        typeof: Number,
        persist: true,
        default: 0
      },
      bookmark: Boolean,
      emblaActive: Boolean,
    },
    nodes: <const>[
      'href',
      'variant',
      'dots',
      'bookmark'
    ]
  };

  /**
   * Returns product state cache map
   */
  get cache() {

    return Product.cache.get(this.root.id);
  }

  /**
   * Returns the dot navigation child elements
   */
  get navs() {
    return this.dom.dotsNode.children;
  }

  /**
   * Returns the `data-spx` schema
   */
  get spx() {
    return spx.$.config.schema + 'data';
  }

  /**
   * Returns the current slide
   */
  get slideTarget() {
    return this.carousel.slideNodes()[this.state.index];
  }

  /**
   * Whether or not the carousel variant slider should be enabled.
   */
  get isMobile() {
    return qvp.test(this.state.breakpoint, '|');
  }

  /**
   * Whether or not the current item is within viewport
   */
  get inViewport() {

    const rect = this.root.getBoundingClientRect();
    const wh = window.innerHeight || document.documentElement.clientHeight;
    const ww = window.innerWidth || document.documentElement.clientWidth;
    const v = (rect.top <= wh) && ((rect.top + rect.height) >= 0);
    const h = (rect.left <= ww) && ((rect.left + rect.width) >= 0);

    return v && h;

  }

  /**
   * Stimulus: Connect
   */
  onmount() {

    if (this.isMobile) {

      this.dots();

      if (this.inViewport) this.onEmbla();

      this.intersect = new IntersectionObserver(this.onIntersect.bind(this), { root: null });

    }

    if ($.bookmarks.has(this.root.id)) {
      this.dom.bookmarkNode.classList.add('active');
    }

    if (this.state.emblaActive) return;

    if (this.isMobile) {
      this.intersect.observe(this.root);
    }

  }

  unmount(): void {

    if (this.state.emblaActive) {
      this.carousel.reInit({ active: false });
      this.intersect.unobserve(this.root);
      this.intersect.disconnect();
      this.state.emblaActive = false;
    }

  }


  /**
   * Renders the navigation dots to product item.
   */
  dots() {

    if (this.state.dotsRendered) return;

    const slides = Array.from(Array(this.state.slideSize).keys());

    m.render(
      this.dom.dotsNode,
      slides.map(active => [
        m('button', {
          type: 'button',
          class: `dot ${active === this.state.index ? 'active' : ''}`
        })
      ])
    );

  }

  /**
   * Establish an Embla instance
   */
  onEmbla() {

    this.carousel = embla(this.root, {
      align: 'start',
      dragFree: false,
      watchDrag: true,
      containScroll: 'keepSnaps',
      duration: 10,
      loop: true,
      startIndex: this.state.index,
      watchSlides: false
    });

    if (this.state.index > 0) this.onSlide();

    this.carousel.on('select', this.onSlide.bind(this));
    this.state.emblaActive = true;


  }

  /**
   * Called for every new slide encountered.
   */
  onSlide() {

    this.state.index = this.carousel.selectedScrollSnap();

    const next = this.navs.item(this.state.index);
    const prev = this.navs.item(this.carousel.previousScrollSnap());

    if (prev.classList.contains('active')) {
      prev.classList.remove('active');
    }

    if (!next.classList.contains('active')) {
      next.classList.add('active');
    }

    console.log(this.dom.variantNode)
    if (this.state.index === 0) {

      this.dom.variantNode.innerHTML = this.onAttrs([
        ['href', this.state.href],
        [`${this.spx}:id`, this.root.id],
        [`${this.spx}:name`, this.state.title],
        [`${this.spx}:price`, this.state.price]
      ], this.state.variant);

    } else {

      this.dom.variantNode.innerHTML = this.onAttrs([
        ['href', 'data-href'],
        [`${this.spx}:id`, 'data-id'],
        [`${this.spx}:name`, 'data-name'],
        [`${this.spx}:price`, 'data-price']
      ]);

    }

  }

  /**
   * When swiping between products the `spx-data-*` attributes
   * and various other elements are required to align with current
   * slide.
   */
  onAttrs(attrs: string[][], variantName: string = null) {

    for (const [product, variant] of attrs) {
      const vattrs = variantName === null ? this.slideTarget.getAttribute(variant) : variant;
      this.dom.hrefNode.setAttribute(product, vattrs);
    }

    return this.slideTarget.getAttribute('data-variant') || this.state.variant;

  }

  onIntersect([entry]: IntersectionObserverEntry[]) {

    if (entry.isIntersecting === true) {
      if (!this.state.emblaActive) {
        this.onEmbla();
      } else {
        this.carousel.reInit({ active: true });
      }
    } else if (this.state.emblaActive) {
      this.intersect.unobserve(this.root);
    }

  }

  onBookmark() {

    if ($.bookmarks.has(this.root.id)) {
      $.bookmarks.delete(this.root.id);
      $.session.bookmarks = Array.from($.bookmarks);
      if (this.dom.bookmarkNode.classList.contains('active')) {
        this.dom.bookmarkNode.classList.remove('active');
      }
    } else {
      $.bookmarks.add(this.root.id);
      $.session.bookmarks = Array.from($.bookmarks);
      if (!this.dom.bookmarkNode.classList.contains('active')) {
        this.dom.bookmarkNode.classList.add('active');
      }
    }

  }

  /**
   * Embla Carousel Instance
   */
  carousel: EmblaCarouselType;

  /**
   * Instance of Intersection Observer
   */
  intersect: IntersectionObserver;

}
