import spx from 'spx';
import m from 'mithril';
import { cart } from 'source/scripts/cart/index';

export class Cart extends spx.Component<typeof Cart.define> {

  static define = {
    state: {
      charity: Boolean,
      bogo: Boolean,
      shipping: Boolean,
      newsletter: Boolean,
      cartCount: Number
    },
    nodes: <const>[
      'mount',
      'count'
    ]
  };

  connect () {
    this.mount();
  }

  count() {
    this.state.cartCount = $.cart().item_count
  }


  async mount () {


    const { status } = await $.cart.get();

    if (status === 'ok') {
      this.count()
      m.mount(this.dom.mountNode, { view: () => cart(this) });
    }
  };


}
