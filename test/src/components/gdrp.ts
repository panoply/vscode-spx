import spx from 'spx'

export class Gdrp extends spx.Component<typeof Gdrp.define> {

  /**
   * Stimulus Values
   */
  static define = {
    id: 'gdrp',
    state: {
      consent: Boolean,
      tracking: String,
      noTracking: String,
      noInteraction: Boolean,
      overlayClass: {
        typeof: String,
        default: 'overlay'
      },
      showClass: {
        typeof: String,
        default: 'show'
      },
      showOverlay: {
        default: true,
        typeof: Boolean
      }
    },
    nodes: <const>[
      'consent'
    ]
  };

  /**
   * Stimulus Connect
   */
  connect (): void {

    if (!$.session.shouldRedirect) this.loadConsent();

  }

  /**
   * Load GDRP consent, we execute in a function so we can re-run
   * in cases where we need to hold off with consent until an action
   * has taken place, such as (for example) a domain redirection.
   */
  loadConsent (showOverlay?: boolean) {

    if (typeof showOverlay === 'boolean') this.state.showOverlay = showOverlay;

    Shopify.loadFeatures([
      {
        name: 'consent-tracking-api',
        version: '0.1'
      }
    ], this.getStatus);

  }

  /**
   * Hide the GDRP component banner.
   */
  hideBanner () {

    if (!this.root.parentElement.classList.contains(this.state.showClass)) {
      this.root.parentElement.classList.add(this.state.showClass);
      this.root.classList.remove(this.state.showClass);
    }

  }

  /**
   * Returns the consent status and applies the
   * correct options relative to the consent status.
   */
  getStatus = (error: any) => {

    if (error) {
      console.error('GDRP: Consent Error', error);
      return;
    }

    const consent = Shopify.customerPrivacy.getTrackingConsent();

    if (consent === 'yes') {

      this.state.noInteraction = false;
      this.state.consent = true;
      this.root.classList.add(this.state.showClass);

      if (this.state.showOverlay) this.html.classList.remove(this.state.overlayClass);

      $.patch({ trackingConsent: true });

    } else if (consent === 'no_interaction') {

      this.state.noInteraction = true;
      this.root.parentElement.classList.remove(this.state.showClass);
      this.root.classList.remove(this.state.showClass);

      if (this.state.showOverlay) this.html.classList.add(this.state.overlayClass);

    } else if (consent === 'no') {

      this.state.noInteraction = false;
      this.state.consent = false;
      this.root.classList.add(this.state.showClass);

      if (this.state.showOverlay) this.html.classList.remove(this.state.overlayClass);

      $.patch({ trackingConsent: false });

    }

  };

  /**
   * Toggle input checkbox form options when
   * visitor decides to click cookie settings.
   */
  onInput (event: { target: HTMLInputElement }) {

    if (event.target.hasAttribute('checked')) {
      event.target.removeAttribute('checked');
      this.state.consent = false;
      this.dom.consentNode.innerHTML = this.state.noTracking;
    } else {
      event.target.setAttribute('checked', '');
      this.state.consent = true;
      this.dom.consentNode.innerHTML = this.state.tracking;
    }

  }

  /**
   * Accepts tracking button, this is fired from
   * the HTML element. It infers that consent was accepts.
   */
  onAccept () {

    this.state.consent = true;

    Shopify.customerPrivacy.setTrackingConsent({
      sale_of_data: this.state.consent,
      analytics: this.state.consent,
      marketing: this.state.consent,
      preferences: this.state.consent
    }, this.getStatus);

  }

  /**
   * Customizes the tacking conditions and is fired
   * when the visitor clicks cookie settings.
   */
  onConfirm (event: SubmitEvent) {

    event.preventDefault();

    Shopify.customerPrivacy.setTrackingConsent({
      sale_of_data: this.state.consent,
      analytics: this.state.consent,
      marketing: this.state.consent,
      preferences: this.state.consent
    }, this.getStatus);

  }


}
