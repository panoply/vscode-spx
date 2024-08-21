import spx from 'spx'

export class Modal extends spx.Component<typeof Modal.define>{

  /**
   * Stimulus Values
   */
  static define = {
    state: {
      active: Boolean,
      threshold: Number,
      width: String,
      class: String,
      isOpen: Boolean,
      enable: Boolean,
      bodyOverflow: Boolean,
      closeButton: Boolean,
      closeBackdrop: Boolean
    },
    nodes: <const>[
      'template',
      'open'
    ]
  };



  /**
   * Stimulus Initialize
   */
  connect () {

    if (!this.state.hasEnable) this.state.enable = true;

  }

  /**
   * Stimulus Connect
   */
  unmount (): void {

    if (this.state.isOpen) {

      this.close();

    }

  }

  get mountNode () {
    return document.getElementById('modal-mount')
  }

  get mountChild () {
    return this.mountNode.firstElementChild
  }


  /**
   * Click detected outside, eg: document body
   */
  outsideClick = ({ target }: MouseEvent) => {

    if (target instanceof HTMLElement) {
      if (this.mountNode === target || target.getAttribute('data-close') === 'modal') {
        this.close();
        document.removeEventListener('click', this.outsideClick);
      }
    }

  }

  open () {

    if (this.state.enable === false) return;

    if (!this.state.isOpen) {

      if (this.state.hasWidth) {
        this.mountChild.setAttribute('style', `width: ${this.state.width};`);
      } else {
        this.mountChild.classList.add('row', ...this.state.class.split(' '));
      }

      this.mountNode.classList.add('is-open');
      this.mountChild.appendChild(this.dom.templateNode.content.cloneNode(true));
      this.state.isOpen = true;

      document.body.setAttribute('style', 'overflow: hidden;');
      document.addEventListener('keydown', this.close);
      document.addEventListener('click', this.outsideClick);
    }

  }

  /**
   * Hide the GDRP component banner.
   */
  close = (event?: KeyboardEvent) => {

    console.log(event)

    if (event && event.key.toUpperCase() !== 'ESCAPE') return;

    if (this.state.isOpen) {

      document.body.removeAttribute('style');
      document.removeEventListener('keydown', this.close);

      this.mountNode.classList.remove('is-open');
      this.mountChild.removeChild(this.mountChild.firstElementChild);


      if (this.state.hasWidth) {
        this.mountChild.removeAttribute('style');
      } else {
        this.mountChild.classList.remove('row', ...this.state.class.split(' '));
      }

      this.state.isOpen = false;


    }

    // localStorage.setItem('newletter_modal', '1');
    // this.modal.classList.add('d-none');
    // this.modal.removeEventListener('click', this.hide);

  };


  /* -------------------------------------------- */
  /* TYPES                                        */
  /* -------------------------------------------- */

  clonedNode: ChildNode;

}
