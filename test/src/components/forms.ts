/* eslint-disable no-unused-vars */

import { FormState, FormTypes } from 'types/forms';
import spx, { SPX } from 'spx';
import { Modal } from './modal';
import { uuid } from 'utils/common';
import { Carousel } from './carousel';
import { Purchase } from './purchase';

export class Form extends spx.Component<typeof Form.define>{


  /**
   * Stimulus Values
   */
  static define = {
    id: 'form',
    state: {
      type: String<FormTypes>,
      errors: Array,
      submit: String,
      focus: String,
      klaviyo: String,
      success: String,
      verify: String,
      link: String,
      redirect: Boolean,
      valid: Boolean,
      form: Object<FormState>,
      id: {
        default: uuid(),
        typeof: String,
      },
      response: {
        typeof: String,
        default: 'append'
      },
      session: {
        typeof: Boolean,
        default: true
      }
    },
    nodes: <const>[
      'form',
      'inputField',
      'dropdown',
      'response',
      'next',
      'carousel',
      'loading',
      'submit'
    ]
  };

  /* -------------------------------------------- */
  /* STIMULUS METHODS                             */
  /* -------------------------------------------- */


  /**
   * Stimulus Initialize
   */
  connect () {


    if (this.state.response !== 'toggle' && !this.dom.responseNode) {
      console.error('Missing "spx-node="form.response" element');
    }

    if (!this.state.hasType) {
      console.error('Missing "spx-form:type" value');
    }

    if (
      this.state.type === 'newsletter:modal' ||
      this.state.type === 'newsletter:cart' ||
      this.state.type === 'newsletter:incentive' ||
      this.state.type === 'newsletter:footer' ||
      this.state.type === 'newsletter:access' ||
      this.state.type === 'notification:instock' ||
      this.state.type === 'notification:restock'
    ) {

      if (!this.state.hasKlaviyo) {
        console.error('Missing "data-form-klaviyo-value" attribute');
      }

    } else if (
      this.state.type === 'shopify:contact' ||
      this.state.type === 'api:discount'
    ) {

      if (this.state.hasKlaviyo) {
        console.error('Invalid "data-form-klaviyo-value" attribute provided');
      }

    }

  }

  /**
   * Stimulus Connect
   */
  onmount (): void {

    this.state.submit = this.dom.submitNode.innerText;
    this.dom.submitNode.addEventListener('click', this.onClickSubmit.bind(this));

    this.setFormState();
    this.setSubscribed();

  }

  /**
   * Stimulus Disconnect
   */
  unmount () {

    //

  }

  /* -------------------------------------------- */
  /* GETTERS / SETTERS                            */
  /* -------------------------------------------- */

  /**
   * Input Element - Returns the currenct active `<input>` element
   */
  get field () { return this.dom.inputFieldNodes[this.input.index] as HTMLInputElement }

  /**
   * Form Element - Returns the currenct active `<form>` element
   */
  get input () { return this.state.form[this.state.focus] }

  /**
   * State Reference - Returns the state of the form
   */
  get dropdown () { return this.dom.dropdownNodes[this.input.dropdown]; }

  /**
   * Controller Reference - Purchase
   */
  get purchase (): Purchase { return spx.component('purchase'); }

  /**
   * Controller Reference - Carousel
   */
  get carousel (): Carousel { return spx.component(this.dom.carouselNode.id); }

  /**
   * Controller Reference - The Modal popup
   */
  get modal (): Modal { return spx.component('modal'); }

  /* -------------------------------------------- */
  /* UTILITY SETTERS                              */
  /* -------------------------------------------- */

  /**
   * Accepts a portion of a url to construct
   */
  private setLinkValue (key?: string, value?: string) {

    if (key && value) {
      const regex = new RegExp(`\\$\\{${key}\\}`);
      if (regex.test(this.state.link)) {

        const url = $.root();
        const path = this.state.link.replace(regex, value);

        if (url.root === '/') {
          this.state.link = 'https://' + $.market.domain + '/' + path;
        } else {
          this.state.link = 'https://' + $.market.domain + url.root + '/' + path;
        }
      }
    }

  }

  /**
   * Set Subscribed state - used when we have known reference of a customer
   * session.
   */
  private setSubscribed () {
    if (this.state.type === 'newsletter:footer') {
      if (this.isFormValid()) {
        this.dom.submitNode.textContent = $.i18n.newsletter.subscribed;
        this.dom.submitNode.setAttribute('disabled', 'true');
      }
    }
  }

  /**
   * Creates a workable store of the form which will maintain
   * a persisted state model which will be used to validate and
   * determine which actions should take place on each entry.
   *
   * _Each form stored in the static `store` Map._
   */
  private setFormState () {

    /** The dropdown target index */
    let dindex: number = -1;


    for (let index = 0; index < this.dom.inputFieldNodes.length; index++) {

      const field = this.dom.inputFieldNodes[index];
      const { name, type } = field;

      if (!name) {
        console.error('Missing "name" attribute on form field element:', field);
        return
      }

      if (!type) {
        console.error('Missing "type" attribute on form field element:', field);
        return
      }

      let dropdown: number = -1;
      let feedback: HTMLDivElement;

      const hidden = type === 'hidden';

      if (!hidden) {

        // if (!field.hasAttribute('data-action')) {
        //   console.error(`Missing "data-action" on form field ${name}`, field);
        //   return form;
        // }

        if (field.autofocus === true) this.state.focus = field.name;

        const action = field.getAttribute('spx@input')

        if (action && action.indexOf('dropdown.select') > -1) {

          if (name in this.state.form) continue;
          dropdown = dindex = dindex + 1;
          feedback = this.setValidators(this.dom.dropdownNodes[dindex]);

        } else {

          if (name in this.state.form) {
            console.error(`The ${name} is not unique on form element:`, field);
            continue
          } else {
            feedback = this.setValidators(field.parentElement);
          }
        }

      }

      const required = field.required;

      if (type === 'radio' || type === 'checkbox') {
        if (!field.hasAttribute('aria-checked')) {
          field.setAttribute('aria-checked', `${field.checked}`);
        }
      }

      Object.assign(this.state.form, {
        [name]: {
          name,
          index,
          required,
          feedback,
          dropdown,
          type,
          status: 1,
          interacted: false,
          valid: required === false,
          message: '',
          value: hidden ? field.value : undefined
        }
      })

      if (field.hasAttribute('spx-form:session')) {

        const value = field.getAttribute('spx-form:session');

        if (value in $.session && typeof $.session[value] === 'string') {
          field.value = $.session[value];
          this.state.form[name].value = field.value;
          this.state.form[name].valid = true;
        }

      }

    }

  }

  /**
   * Generates feedback nodes in each field wrapped element. This will _typically_
   * be the parent grid column. The feedback nodes are appended and can be queried using
   * `lastElementChild` or alternatively via the `feedback` property maintained in
   * the form model.
   *
   * This can likely be re-thought for input elements which have
   * no validation.
   */
  private setValidators (field: HTMLElement) {

    const feedback = document.createElement('div');

    // append validation feedback message to the `<label>` node

    if (field.classList.contains('fm-float')) {
      if (!field.parentElement.contains(feedback)) {
        feedback.classList.add('feedback');
        field.parentElement.appendChild(feedback);
      }
    } else {
      if (!field.contains(feedback)) {
        feedback.classList.add('feedback');
        field.appendChild(feedback);
      }
    }

    return feedback;

  }

  /**
   * Replaces the response with form values which reference
   * fields using template literals via the Section theme editor.
   */
  private setResponse (value?: string) {

    if (this.state.hasSuccess && typeof value === 'undefined') {
      const regex = new RegExp('\\$\\{\\b(' + Object.keys(this.state.form).join('|') + ')\\b\\}', 'g');
      this.state.success = this.state.success.replace(regex, (value) => {
        return this.state.form[value.slice(2, -1)].value as string;
      });
    } else {
      this.state.success = value;
    }

  }

  /* -------------------------------------------- */
  /* SETUP                                        */
  /* -------------------------------------------- */

  /**
   * This logic will validate the form upon the submit button
   * being clicked. If `validValue` is `true` then validation
   * will be skipped and form is passed to `onSubmit`.
   */
  onClickSubmit (event: SubmitEvent) {

    if (this.state.type === 'shopify:contact') {
      if (this.input.valid) return;
    } else {
      event.preventDefault();
      if (this.input.valid) return this.onSubmit();
    }

    this.dom.submitNode.setAttribute('disabled', 'true');

    if (this.input.valid === false) {
      for (const field of Object.values(this.state.form)) {
        if (field.valid === false && field.required) {
          if (field.dropdown > -1) {
            if (!this.dom.dropdownNodes[field.dropdown].classList.contains('is-invalid')) {
              this.dom.dropdownNodes[field.dropdown].classList.add('is-invalid');
            }
          } else {
            if (!this.dom.inputFieldNodes[field.index].classList.contains('is-invalid')) {
              this.dom.inputFieldNodes[field.index].classList.add('is-invalid');
            }
          }
        }
      }
    }
  }

  /**
   * Fires upon an input change event. `onChange()` is used on the following input fields:
   *
   * - checkbox
   * - radio
   * - select
   */
  public onSubmit () {

    switch (this.state.type) {
      case 'newsletter:modal':
      case 'newsletter:cart':
      case 'newsletter:incentive':
      case 'newsletter:footer':
      case 'newsletter:access':
      case 'notification:instock':
        return this.klaviyo();
      case 'notification:restock':
        return this.klaviyoRestock();
      case 'shopify:contact':
        return this.contact();
      case 'api:discount':
        return this.discount();
    }

  };

  private responseType (value?: string) {

    this.setResponse(value);

    this.dom.submitNode.classList.remove('is-loading');
    this.dom.responseNode.innerHTML = this.state.success;

    if (this.state.response === 'toggle') {
      this.dom.submitNode.classList.add('d-none');
      this.root.classList.add('d-none');
      this.dom.responseNode.parentElement.classList.remove('d-none');

      if (this.dom.responseNode.classList.contains('d-none')) {
        this.dom.responseNode.classList.remove('d-none');
      }
    }
  }

  /**
   * Checks all form fields are valid. Enables / Disables
   * the submit button state.
   */
  private isFormValid () {

    this.state.valid = Object.values(this.state.form).every(({ valid }) => valid === true);

    if (this.state.valid) {
      this.dom.submitNode.removeAttribute('disabled');
    } else {
      if (!this.dom.submitNode.hasAttribute('disabled')) {
        this.dom.submitNode.setAttribute('disabled', 'true');
      }
    }

    return this.state.valid

  }

  /**
   * Valid class - Toggles the input valid and invalid class
   * name on the the field element. Also sets the `this.state.valid`
   * and the hides the feedback node. Passes to `this.isFormValid()`
   * as the final callback.
   */
  private isFieldValid () {

    if (!this.input.valid)  this.input.valid = true

    const field = this.input.dropdown > -1 ? this.dropdown : this.field;

    if (field.classList.contains('is-invalid')) {
      field.classList.remove('is-invalid');
    }

    if (!field.classList.contains('is-valid')) {
      field.classList.add('is-valid');
    }

    if (this.input.feedback.classList.contains('is-invalid')) {
      this.input.feedback.classList.remove('is-invalid');
    }

    if (!this.input.feedback.classList.contains('is-valid')) {
      this.input.feedback.classList.add('is-valid');
    }



    return this.isFormValid();

  }

  /**
   * Invalid class - Toggles the input invalid and valid class
   * name on the the field element. Also sets the `this.state.valid`
   * and the hides the feedback node. Passes to `this.isFormValid()`
   * as the final callback.
   */
  private isFieldInvalid () {

    if (this.input.valid === true) this.input.valid = false;

    const field = this.input.dropdown > -1 ? this.dropdown : this.field;

    if (field.classList.contains('is-valid')) {
      field.classList.remove('is-valid');
    }

    if (!field.classList.contains('is-invalid')) {
      field.classList.add('is-invalid');
    }

    if (this.input.feedback.classList.contains('is-valid')) {
      this.input.feedback.classList.remove('is-valid');
    }

    if (!this.input.feedback.classList.contains('is-invalid')) {
      this.input.feedback.classList.add('is-invalid');
    }

    return this.isFormValid();

  }

  /**
   * Checks all form field inputs are valid. Enables / Disables
   * the submit button state.
   *
   * @this {IForm}
   * @param {HTMLInputElement} target
   */
  private isInputValid (target: HTMLInputElement) {

    if (target.checkValidity()) {
      this.isFieldValid();
    } else {
      this.isFieldInvalid();
    }

    return this.isFormValid();

  }

  /* -------------------------------------------- */
  /* ACTIONS                                      */
  /* -------------------------------------------- */

  /**
   * Fires upon input entry of text form elements and
   * will dispatch to appropriate function in this class.
   * for handling and validation.
   */
  onInput ({ target }: SPX.InputEvent) {

    if (target instanceof HTMLLabelElement) {

      this.state.focus = target.getAttribute('for');

      this.input.interacted = !!this.input.interacted;
      this.input.valid = true;
      this.input.value = target.innerText;
      this.field.value = this.input.value;

      return this.isFormValid();

    }

    if (target instanceof HTMLInputElement) {

      const type = target.getAttribute('type');

      // show the validation response
      this.state.focus = target.name;
      this.input.value = type === 'checkbox' ? target.checked : target.value;

      if (this.state.type === 'newsletter:footer') {
        if (this.dom.submitNode.innerText !== this.state.submit) {
          this.dom.submitNode.innerText = this.state.submit;
        }
      }

      if (this.input.status !== 1) this.dom.responseNode.innerText = '';
      if (!this.input.interacted) this.input.interacted = true;
      if (type in this) return this[type](target);

    }

    if (target instanceof HTMLTextAreaElement) {
      this.state.focus = target.name;
      this.input.value = target.value;
      if (!this.input.interacted) this.input.interacted = true;
      this.textarea(target);
    }

    return this.isFormValid();

  }

  /* -------------------------------------------- */
  /* FORM ELEMENTS                                */
  /* -------------------------------------------- */

  /**
   * TEXT INPUT
   *
   * Validate text input type
   */
  text (target: HTMLInputElement) {

    if (this.input.interacted && target.minLength >= 0) {
      if (target.minLength > target.value.length) {
        return this.isFieldInvalid();
      } else if (target.value.length > target.maxLength) {
        return this.isFieldInvalid();
      }
    }

    this.input.feedback.innerText = target.validationMessage;

    return target.checkValidity() ? this.isFieldValid() : this.isFieldInvalid();

  }

  /**
   * CHECKBOX INPUT
   *
   * Validates checkbox input fields. When a checkbox
   * field contains a `required` attribute the field
   * must be checked or form submission will be disabled.
   */
  checkbox (target: HTMLInputElement) {

    if (!this.input.required) {
      if (target.required) this.input.valid = target.checked;
    } else {
      if (target.hasAttribute('checked')) {
        target.removeAttribute('checked');
        target.checked = false;
        this.input.valid = false;
      } else {
        target.setAttribute('checked', '');
        target.checked = true;
        this.input.valid = true;
      }
    }

    if (this.field.classList.contains('is-invalid')) {
      this.field.classList.remove('is-invalid');
    }

    return this.isFormValid();

  }

  /**
   * TEXTAREA INPUT
   *
   * Validate textarea
   */
  textarea (target: HTMLTextAreaElement) {

    const value = target.value.trim();

    if (this.input.interacted && target.minLength >= 0) {
      if (target.minLength > value.length) {
        return this.isFieldInvalid();
      } else if (target.value.length > target.maxLength) {
        return this.isFieldInvalid();
      }
    }

    this.input.feedback.innerText = target.validationMessage;

    return target.checkValidity()
      ? this.isFieldValid()
      : this.isFieldInvalid();

  }

  /**
   * EMAIL INPUT
   *
   * Validate email type text input form field. Applies an
   * extra layer of validation and/or helpers upon user input.
   */
  email (target: HTMLInputElement) {

    if (this.input.interacted && target.value.length === 0) return this.isFieldInvalid();

    if (target.value.endsWith('@brixtoltextiles.com') || target.value.endsWith('@sunday-seven.com')) {
      this.input.feedback.innerText = $.i18n.newsletter.error_team;
      return this.isFieldInvalid();
    }

    if (target.validationMessage.length === 0) {
      if (!/\w+@[0-9a-zA-Z_]+?\.[a-zA-Z]{2,}(?:\.[a-zA-Z]+)?$/.test(target.value)) {
        this.input.feedback.innerText = 'Invalid email, please ensure correct email is provided';
        return this.isFieldInvalid();
      } else {
        this.input.feedback.innerText = '';
        return target.checkValidity() ? this.isFieldValid() : this.isFieldInvalid();
      }
    } else {

      this.input.feedback.innerText = target.validationMessage;
      return target.checkValidity() ? this.isFieldValid() : this.isFieldInvalid();

    }

  }

  /**
   * RADIO INPUT
   *
   * Validates checkbox input fields. When a checkbox
   * field contains a `required` attribute the field
   * must be checked or form submission will be disabled.
   */
  radio (target: HTMLInputElement) {

    for (const input of this.dom.inputFieldNodes) {
      if (input.type === 'radio' && input.name === target.name) {
        if (target.id === input.id) {
          input.ariaChecked = 'true';
          input.checked = true;
        } else {
          input.ariaChecked = 'false';
          input.checked = false;
        }

      }
    }

    const field = this.input.dropdown > -1 ? this.dropdown : this.field;

    if (target.checked) {
      this.input.value = target.value;
      this.input.valid = true;
    } else {
      this.input.valid = false;
    }

    if (field.classList.contains('is-invalid')) {
      field.classList.remove('is-invalid');
    }

    if (!field.classList.contains('is-valid')) {
      field.classList.add('is-valid');
    }

    return this.isFormValid();

  }

  /**
   * TELEPHONE INPUT
   *
   * Validates Phone Number
   */
  tel (target: HTMLInputElement) {

    if (!target.required) this.input.valid = true;

    return this.isInputValid(target);

  }

  password () {

    // TODO

  }

  file () {

    // TODO

  }

  /* -------------------------------------------- */
  /* FORM SUMBMISSION                             */
  /* -------------------------------------------- */

  async discount () {}

  async contact () {}

  hasSubscribed = () => {

    this.input.feedback.innerText = '';
    this.dom.inputFieldNodes[this.input.index].classList.remove('is-valid');
    this.dom.submitNode.textContent = $.i18n.newsletter.subscribed;
    this.dom.submitNode.setAttribute('disabled', 'true');

  };

  /**
   * Submits the form inputs to Klaviyo.
   */
  async klaviyoRestock () {

    const variant = document
      .querySelector('[data-purchase-selected-value]')
      .getAttribute('data-purchase-selected-value');

    this.dom.submitNode.classList.add('is-loading');

    const body = new URLSearchParams();

    body.append('variant', variant);
    body.append('email', this.state.form.email.value as string);
    body.append('a', 'LjKULT');
    body.append('platform', 'shopify');

    try {

      const { restockNotifications } = $.session;
      const response = await fetch($.api.klaviyo.restock, {
        body,
        method: 'POST'
      });

      console.log(response)

      if (!restockNotifications.includes(variant)) {

        $.session.restockNotifications.push(variant);

      }

      this.dom.submitNode.classList.remove('is-loading');
      this.modal.close();

    } catch (e) {
      console.error(e);
      this.responseType($.i18n.newsletter.error_404);
      this.input.status = 4;
    }

  }

  /**
   * Submits the form inputs to Klaviyo.
   */
  async klaviyo () {

    this.dom.submitNode.classList.add('is-loading');

    if (this.state.type === 'newsletter:footer') {
      this.field.classList.remove('is-valid');
    }

    const fields = [];
    const body = new URLSearchParams();

    for (const field in this.state.form) {

      if (
        field === 'first_name' ||
        field === 'last_name' ||
        field === 'phone_number') {

        body.append(`$${field}`, `${this.state.form[field].value}`);

      } else {

        fields.push(field);
        body.append(field, `${this.state.form[field].value}`);

      }
    }

    body.append('g', this.state.klaviyo);
    body.append('$fields', fields.join(','));

    try {

      const response = await fetch($.api.klaviyo.subscribe, {
        body,
        method: 'POST',
        headers: {
          'Access-Control-Allow-Headers': '*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        }
      });

      const { data, errors } = await response.json();

      if (data.is_subscribed === false && typeof data.email === 'string') {

        $.patch({
          gender: 'gender' in this.state.form ? this.state.form.gender.value as any : 'NA',
          emailAddress: this.state.form.email.value as string
        });

        this.responseType();
        this.input.status = 2;

        if (this.state.type === 'newsletter:footer') {
          setTimeout(this.hasSubscribed, 60000);
        }

      } else if (data.is_subscribed === true) { // Exists

        $.patch({
          gender: 'gender' in this.state.form ? this.state.form.gender.value as any : 'NA',
          emailAddress: this.state.form.email.value as string
        });

        this.input.status = 3;

        if (this.state.type === 'newsletter:access') {

          this.setLinkValue('gender', $.session.gender === 'M' ? 'men' : 'women');
          location.assign(this.state.link + '?discount=PRIVSALE30');

        } else {

          this.responseType($.i18n.newsletter.error_exists);

          if (this.state.type === 'newsletter:footer') {
            this.hasSubscribed();
          }

        }

      } else if (errors.length > 0) {

        this.responseType(errors.join('<br>'));
        this.input.status = 4;

      }

    } catch (e) {

      console.error(e);

      this.responseType($.i18n.newsletter.error_404);
      this.input.status = 4;

    }

  }


}
