
import relapse from 'relapse';
import spx, { SPX } from 'spx';

/* -------------------------------------------- */
/* INTERFACE                                    */
/* -------------------------------------------- */

/**
 * Dropdown
 *
 * Facilitates Dropdown/Collapsible functionality.
 */
export class Dropdown extends spx.Component<typeof Dropdown.define>{

  /**
   * Stimulus Values
   */
  static define = {
    state: {
      selected: String,
      form: String,
      accordion: String,
      required: {
        typeof: Boolean,
        default: false
      },
      collapse: {
        typeof: String,
        default: 'closed'
      },
      type: {
        typeof: String,
        default: 'dropdown'
      }
    },
    nodes: <const>[
      'collapse',
      'button',
      'placeholder',
      'input',
      'viewport'
    ]
  };

  /**
   * Stimulus Classes
   *
   * @static
   * @memberof Dropdown
   */
  static classes = [
    'selected',
    'disabled',
    'invalid'
  ];

  /**
   * Returns all `<label>` elements in the dropdown
   */
  get labels () {

    return Array.from(this.root.getElementsByTagName('label'));

  }

  inViewport () {

    const rect = this.dom.collapseNode.getBoundingClientRect();

    for (const { element, folds } of relapse.get().values()) {
      if (element.id === this.state.accordion) {

        if (!(
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        )) {
          const fold = folds.find(fold => fold.expanded === true);
          if (fold) fold.close();
        }

        break;
      }
    }

  }

  /**
   * Toggle - Open/Close
   */
  toggle (event: SPX.Event) {

    event.preventDefault();

    if (this.root.classList.contains('is-open')) return this.close();

    this.state.collapse = 'opened';
    this.root.classList.add('is-open');
    this.dom.buttonNode.classList.remove('selected');

    if (this.state.hasAccordion) this.inViewport();

    // listen for outside clicks
    addEventListener('click', this.outsideClick);

  }

  /**
   * Click detected outside, eg: document body
   */
  outsideClick = (event: Event) => {

    if (this.dom.buttonNode !== event.target) {
      if (this.root.classList.contains('is-open')) {
        this.close();
      }
    }

  };

  /**
   * Close Dropdown
   */
  close () {

    this.root.classList.remove('is-open');

    if (this.state.collapse === 'selected' || this.state.hasSelected) {
      this.root.classList.add('selected');
    } else {
      this.state.collapse = 'closed';
    }

    removeEventListener('click', this.outsideClick);

  }

  /**
   * Select Inputs
   *
   * Used for Dropdown Forms
   */
  select ({ target }: { target: HTMLInputElement }) {

    this.state.selected = target.value;
    this.dom.buttonNode.innerText = target.getAttribute('aria-label');
    this.state.collapse = 'selected';
    this.labels.forEach(label => {

      if (label.getAttribute('for') === target.value) {
        if (!label.classList.contains('selected')) {
          label.classList.add('selected');
        }
      } else {
        if (label.classList.contains('selected')) {
          label.classList.remove('selected');
        }
      }

    });

    this.close();

  }

  /**
   * Items in dropdown - An ul > li <select> element equivelent
   */
  options (event: SPX.MouseEvent) {

    if (event.currentTarget instanceof HTMLElement) {
      const [ selected ] = event.currentTarget.getElementsByClassName('selected');
      if (selected) this.state.selected = selected.id; // the <span> text
    }

    if (this.state.hasRequired) {

      if (this.dom.buttonNode.classList.contains('is-invalid')) {
        this.dom.buttonNode.classList.remove('is-invalid');
      }

      this.state.required = false;
      this.dom.buttonNode.classList.add('selected');
    }

    this.state.selected = event.target.textContent;
    this.dom.buttonNode.textContent = event.target.textContent;
    this.state.collapse = 'selected';

    this.toggle(event);


  }


}
