import { Controller } from '../application/controller';
import * as api from 'source/scripts/cart/api';

export class Rewaxing extends Controller {

  static values = {
    variant: Number
  };

  static targets = [
    'button'
  ];

  async checkout (event: MouseEvent) {

    event.preventDefault();

    // @ts-ignore
    event.currentTarget.classList.add('loading');

    this.buttonTarget.innerText = 'Loading';

    try {

      await api.post('add', { quantity: 1, id: this.variantValue });

      this.buttonTarget.innerText = 'Securing';

      // @ts-ignore
      window.location = '/checkout';

    } catch (error) {

      this.buttonTarget.innerText = 'Request Failed';
      console.error(error);

    }

  }

  /**
   * Stimulus: Variant id for rewax service
   */
  variantValue: number;
  /**
   * Stimulus: Inner button text
   */
  buttonTarget: HTMLButtonElement;

}
