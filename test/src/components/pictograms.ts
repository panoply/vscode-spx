import { Controller } from '../application/controller';
import { IPictograms } from '../types/export';
import * as api from '../cart/api';

/* -------------------------------------------- */
/* INTERFACE                                    */
/* -------------------------------------------- */

export interface Pictograms extends IPictograms {
  disabled: boolean,
  pendingValue: boolean,
  outputTarget: HTMLElement,
  buttonTarget: HTMLButtonElement,
  selectSizeTarget: HTMLElement,
  addToCartTarget: HTMLButtonElement,
}

/* -------------------------------------------- */
/* CLASS                                        */
/* -------------------------------------------- */

export class Pictograms extends Controller {

  static targets = [
    'addToCart',
    'selectVariant',
    'stockAlert',
    'selectSize'
  ];

  static values = {
    selected: String
  };

  static classes = [
    'enabled'
  ];

  static public = {
    action: {
      'data-action': 'click->purchase#selectVariant'
    }
  };

  get cart () {

    return this.controller('drawer', 'ajax-cart');

  }

  get accordion () {

    return this.controller('accordion', 'notification');

  }

  initialize () {

    this.disabled = true;

  }

  connect () {

  }

  async addToCart (event: Event) {

    event.preventDefault();

    try {

      await api.post('add', { quantity: 1, id: this.selectedValue });

      // console.log(pp)
      this.cart.toggle(event);

    } catch (error) {

      console.error(error);

    }

  }

  /* async stockAlert (params) {

    try {

      const response: any = await m.request({
        background: false, // prevent global redraw
        url: 'https://api.brixtol.com/mail/notification?type=restock',
        params: {
          type: 'restock',
          email: 'n@s7.agency',
          product: 'Db –Ruk',
          id: '35433346654455445'
        }
      });

      if (response.ref === 'opt_in') {
        this.pendingValue = true;
        this.outputTarget.innerHTML = this.info.confirmation.replace(/\{e\}/, this.emailValue);
      } else if (response.ref === 'exists') {
        this.outputTarget.innerHTML = `${this.info.error_exists}`;
      } else {
        this.outputTarget.innerHTML = this.info.error_exists;
      }

      setTimeout(() => {
        this.buttonTarget.setAttribute('data-loading', 'false');
      }, 500);

    } catch (error) {

      this.outputTarget.innerHTML = error.message;

    }
  } */

  select (event: Event) {

    // @ts-ignore
    if (this.hasAddToCartTarget) {
      this.addToCartTarget.removeAttribute('disabled');
    }

    // @ts-ignore
    if (this.hasStockAlertTarget) {
      this.selectSizeTarget.classList.add('d-none');

      // @ts-ignore
      this.stockAlertTarget.classList.remove('d-none');
    }

    this.selectedValue = (event.target as HTMLElement).id;

  }

}
