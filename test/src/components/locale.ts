import type { Gdrp } from './gdrp';
import spx, { SPX } from 'spx';
import m from 'mithril';
import cookie from 'js-cookie';
import { api, locale } from '../locale';

export class Locale extends spx.Component<typeof Locale.define> {


  static define = {
    state: {
      prompt: Boolean,
      active: Number,
      search: String,
      country: String,
      type: String<'redirect' | 'markets' | 'rates'>,
    },
    nodes: <const>[
      'country',
      'redirect',
      'endonym',
      'countries',
      'mount'
    ]
  };


  get gdrp (): Gdrp {
    return spx.component('gdrp');
  }

  get endonym () {
    return $.market.languageSupport.find(({ isoCode }) => isoCode !== 'EN').name;
  }


  connect (): void {

    if (this.state.type === 'markets') {
      this.mount();
    } else if (this.state.type === 'redirect') {
      this.showRedirect();
    }

  }

  redirect (event: SPX.Event<Event>) {

    event.preventDefault();

    const domain = 'https://' + $.market.domain;

    this.dom.redirectNode.innerText = $.i18n.cart.redirecting;

    localStorage.setItem('redirect', domain);

    const discount = cookie.get('discount_code');

    if (typeof discount === 'string') {
      location.replace(domain + location.pathname + `?discount=${discount}`);
    } else {
      location.replace(domain + location.pathname);
    }

  }

  showRedirect () {

    if ($.session.shouldRedirect === true && $.session.deniedRedirect === false) {

      this.dom.countryNode.innerText = $.market.countryName;
      this.dom.redirectNode.ariaLabel = $.market.domain;
      this.dom.redirectNode.innerHTML = this.dom.redirectNode.innerHTML.replace(/{{\s*endonym\s*}}/, this.endonym);
      this.root.classList.remove('d-none');
      this.root.classList.add('is-open');

    }
  }

  closeRedirect () {

    $.session.shouldRedirect = false;
    $.session.deniedRedirect = true;

    this.root.classList.remove('is-open');
    this.root.classList.add('d-none');
    this.gdrp.loadConsent(false);

  }

  /**
   * Obtains the markets and applies sorting, assignment is stored
   * on the static `Locale.countries` array and available with getters.
   */
  async mount () {

    await api.get();

    m.mount(this.dom.mountNode, locale);

  }

}
