import * as discount from 'application/discount';
import { Drawer } from './drawer';
import spx, { SPX } from 'spx';
import { Modal } from './modal';

/* -------------------------------------------- */
/* CLASS                                        */
/* -------------------------------------------- */

export class Purchase extends spx.Component<typeof Purchase.define> {

  static token: string;

  static define = {
    state: {
      action: String,
      selected: Number,
      privateSale: Number,
      productPrice: Number,
      cartPrice: Number,
      onSale: Boolean,
      stockNotification: String,
      offer: String,
      shippingPrice: String,
      returnPrice: String,
      addToBagButton: String,
      restockButton: String,
      instockButton: String,
      enableClass: {
        typeof: String,
        default: 'enabled'
      }
    },
    nodes: <const>[
      'addToCart',
      'selectVariant',
      'stockAlert',
      'modal',
      'selectSize',
      'offer',
      'restockVariant'
    ]
  };

  /**
   * Exposed actions
   */
  static public = {
    button: {
      action: 'purchase#addToCart',
      target: 'addToCart'
    }
  };

  get modal () {

    return spx.component<Modal>('modal').state.isOpen;

  }

  set modal (value: boolean) {
    this.dom.modalNode.setAttribute('data-modal-enable-value', `${value}`);
  }

  /**
   * Stimulus Initialize
   */
  connect (): void {

    spx.on('hydrate', this.hydrate);

  }

  /**
   * Stimulus Connect
   */
  onmount (): void {

    if (this.state.cartPrice === 0) {
      this.state.cartPrice = this.state.productPrice;
    }

    if (!isNaN($.session.expires)) {
      this.offerShipping();
      this.offerReturn();
      this.dom.restockVariantNodes && this.restockChecks();
    }

  }

  restockChecks () {

    for (const variant of this.dom.restockVariantNodes) {
      if (variant.ariaLabel === 'subscribed') continue;

      const id = variant.getAttribute('for');

      if ($.session.restockNotifications.includes(id)) {
        variant.ariaLabel = 'subscribed';
        variant.classList.add('disabled');
      }
    }

  }

  /**
   * Stimulus Disconnect
   */
  unmount (): void {

    // document.removeEventListener('customer:localized', this.isReady);

  }

  /**
   * Hydration logic
   *
   * This handles attribute replacement on the stimulus
   * controller element. It is capturing the spx hydrate.
   * We prevent the hydration replacement from occuring by
   * returning boolean `false`.
   */
  hydrate = (target: HTMLElement, newTarget: Element): false | void => {

    if (target.id !== 'purchase') return;

    for (const { nodeName, nodeValue} of newTarget.attributes) {
      this.root.setAttribute(nodeName, nodeValue);
    }

    return false;

  };

  async offerShipping () {

    if ($.market.shippingFree) {
      if (this.state.cartPrice > $.market.shippingThreshold) {
        this.state.shippingPrice = 'FREE';
        this.offer($.i18n.offer.free_shipping);
      } else {
        this.state.shippingPrice = $.market.shippingPricePresent;
      }
    } else {
      this.state.shippingPrice = $.market.shippingPricePresent;
      this.offerTooltip($.i18n.offer.paid_shipping);
    }

    return this;

  }

  offerReturn () {

    if ($.market.returnFree) {
      if (this.state.productPrice > $.market.returnThreshold) {
        this.state.returnPrice = 'FREE';
        this.offer($.i18n.offer.free_return);
      } else {
        this.state.returnPrice = $.market.returnPricePresent;
      }
    } else {
      this.state.returnPrice = $.market.returnPricePresent;
      this.offerTooltip($.i18n.offer.paid_return);
    }

    return this;

  }

  offer (text: string) {

    if (this.dom.offerNode.classList.contains('hidden')) {
      this.dom.offerNode.classList.remove('hidden');
    }

    if (this.state.hasOffer) {
      if (this.state.shippingPrice === 'FREE' && this.state.returnPrice === 'FREE') {
        this.dom.offerNode.innerHTML = $.i18n.offer.free_shipping_and_returns;
        return null;
      }
    } else {
      this.state.offer = text;
    }

    this.dom.offerNode.innerHTML = this.state.offer;

  }

  /**
   * Product offer tooltip
   */
  offerTooltip (text: string) {

    const asterisk = document.createElement('strong');

    asterisk.className = 'icon-alert';

    this.dom.offerNode.setAttribute('data-tooltip', 'left');
    this.dom.offerNode.setAttribute('role', 'tooltip');
    this.dom.offerNode.setAttribute('aria-label', text);
    this.dom.offerNode.appendChild(asterisk);

  }

  /**
   * Add product to cart
   */
  async addToCart (event: SPX.Event) {

    event.preventDefault();

    if (this.modal) return;

    if (typeof fbq === 'function') {
      fbq('track', 'AddToCart', {
        content_ids: this.state.selected,
        content_type: 'product'
      });
    }

    const { status } = await $.cart.add({
      quantity: 1,
      id: this.state.selected,
      properties: {
        return: this.state.returnPrice
      }
    });

    if (status === 'ok')  {

      $.cart.toggle()

      if (this.state.hasPrivateSale) {

        await discount.checkout('line_item', this.state.selected, this.state.privateSale);

      }

    }

  }

  /**
   * Variant
   *
   * Invoked when a size with a restock notification has been selected
   */
  restock ({ target }: SPX.InputEvent) {

    this.state.selected = Number(target.value);

    if (this.dom.addToCartNode) {

      this.dom.addToCartNode.removeAttribute('disabled');
      this.dom.addToCartNode.innerText = this.state.restockButton;
      this.modal = true;

    }

  }

  /**
   * Variant
   *
   * Invoked when a product size has been selected
   */
  variant ({ target }: { target: HTMLInputElement }) {

    this.state.selected = Number(target.value);

    if (this.modal) {
      this.modal = false;
      this.dom.addToCartNode.innerText = this.state.addToBagButton;
    }

    if (this.dom.addToCartNode) {
      this.dom.addToCartNode.removeAttribute('disabled');
    }

    if (this.dom.stockAlertNode) {
      // this.selectSizeTarget.classList.add('d-none');
      this.dom.stockAlertNode.classList.remove('d-none');
    }
  }

}
