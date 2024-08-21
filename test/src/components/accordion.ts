import relapse, { Relapse } from 'relapse';
import spx from 'spx';
import qvp from 'qvp';
import { Page } from 'spx/types/page';


export class Example extends spx.Component<typeof Example.define> {


  static define = {
    state: {
      foo: Object<object>,
      item: String<'$3'>
    },
    nodes: <const>[

    ]
  }





}
/* -------------------------------------------- */
/* CLASS                                        */
/* -------------------------------------------- */

export class Accordion extends spx.Component<typeof Accordion.define> {

  /**
   * Stimulus: Values
   */
  static define = {
    state: {
      multiple: {
        type: Boolean,
        default: true
      },
      persist: {
        type: Boolean,
        default: false
      },
      mobileExpand: {
        type: Boolean,
        default: false
      }
    },
    nodes: <const>[
      'viewport',
      'bar',
      'ddd',
      'ffff'
    ]
  };

  onmount(): void {

    if (qvp.test(['xs', 'sm'])) {

      this.enterMobile();

    } else {

      this.accordion = relapse(this.root, {
        multiple: this.state.multiple,
        persist: this.state.persist
      });

      this.state.mobileExpand && qvp.on('sm:onenter', this.enterMobile, this);

    }
  }

  unmount(session: { page: Page; }) {

    this.accordion.destroy();

  }

  private enterMobile() {

    if (this.accordion) this.accordion.destroy();

    this.accordion = relapse(this.root, {
      multiple: true,
      persist: false
    });

  }

  /* -------------------------------------------- */
  /* TYPES                                        */
  /* -------------------------------------------- */

  /**
   * Relapse: Instance scope
   */
  accordion: Relapse;

}
