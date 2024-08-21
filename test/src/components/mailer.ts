// @ts-nocheck
import { Controller } from '@hotwired/stimulus';
import { emailexp } from '../utils/regexp';
import m from 'mithril';
import * as customer from '../application/session';

export class Mailer extends Controller {

  /**
   * Stimulus: Values
   */
  static values = {
    url: String,
    email: String,
    subscribed: Boolean,
    confirm: String,
    pending: Boolean
  };

  /**
   * Stimulus: Targets
   */
  static targets = [
    'email',
    'button',
    'output'
  ];

  /**
   * i18n Translation
   */
  get info () {
    return window.i18n.newsletter;
  }

  /**
   * Stimulus: Connect
   */
  connect () {

    this.fieldset = this.element.firstElementChild;

    if (customer.session.email_address) {
      this.subscribedValue = true;
      this.buttonTarget.setAttribute('data-loading', 'false');
      this.buttonTarget.removeAttribute('disabled');
      this.emailTarget.value = customer.session.email_address.toUpperCase();
      this.emailTarget.setAttribute('disabled', 'true');
    } else {
      this.subscribedValue = false;
    }

  }

  validate () {

    if (this.emailValue.length === 0) {

      this.fieldset.classList.remove(this.validClass);
      this.fieldset.classList.remove(this.errorClass);
      this.buttonTarget.setAttribute('disabled', '');
      this.outputTarget.innerHTML = '';

      return false;

    } else {

      if (
        !this.emailTarget.checkValidity() ||
        !emailexp.test(this.emailValue) ||
        this.regex.test(this.emailValue)
      ) {

        this.fieldset.classList.remove(this.validClass);
        this.fieldset.classList.add(this.errorClass);
        this.buttonTarget.setAttribute('disabled', '');

        if (this.regex.test(this.emailValue)) {
          this.outputTarget.innerHTML = this.info.error_team;
        } else if (this.emailTarget.validationMessage) {
          this.outputTarget.innerHTML = this.emailTarget.validationMessage;
        } else {
          this.outputTarget.innerHTML = this.info.error_invalid;
        }

        return false;

      } else {

        this.fieldset.classList.remove(this.errorClass);
        this.fieldset.classList.add(this.validClass);
        this.outputTarget.innerHTML = '';
        this.buttonTarget.removeAttribute('disabled');

        return true;

      }
    }

  }

  onInput ({ target: { value } }) {

    this.emailValue = value;
    this.validate();

  }

  onSubmit (event) {

    event.preventDefault();

    if (this.subscribedValue) {
      this.buttonTarget.setAttribute('disabled', 'true');
      this.emailTarget.removeAttribute('disabled');
      this.emailTarget.value = '';
      this.subscribedValue = false;
      return null;
    }

    if (!this.validate()) {
      this.outputTarget.innerHTML = this.emailTarget.validationMessage;
    } else {
      this.buttonTarget.setAttribute('data-loading', 'true');
      this.subscribe(
        {
          email: this.emailValue,
          country: customer.session.country_name,
          countryCode: customer.session.country_code
        }
      );
    }
  }

  async subscribe (params) {

    try {

      const response = await m.request({
        background: false, // prevent global redraw
        url: this.urlValue,
        params
      });

      if (response.ref === 'opt_in') {
        this.pendingValue = true;
        this.outputTarget.innerHTML = this.info.confirmation.replace(/\{e\}/, this.emailValue);
      } else if (response.ref === 'exists') {
        this.outputTarget.innerHTML = `${this.info.error_exists}`;
      } else if (response === 'subscribed') {
        return null;
      } else {
        this.outputTarget.innerHTML = this.info.error_exists;
      }

      setTimeout(() => {
        this.buttonTarget.setAttribute('data-loading', 'false');
      }, 500);

    } catch (error) {

      this.outputTarget.innerHTML = error.message;

    }
  }

}
