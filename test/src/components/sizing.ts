import spx, { SPX } from 'spx';

export class Sizing extends spx.Component<typeof Sizing.define> {

  /**
   * Stimulus Values
   */
  static define = {
    state: {
      metricTolerence: String,
      imperialTolerence: String,
      tolerence: String,
      unitSystem: String
    },
    nodes: <const>[
      'metric',
      'imperial',
      'weight',
      'measurement',
    ]
  };

  connect() {

   this.state.unitSystem = $.market.unitSystem

  }


  get sizeUnit () {

    if (this.state.unitSystem === 'METRIC') {
      this.dom.imperialNode.classList.remove('active');
      this.dom.metricNode.classList.add('active');
      this.state.tolerence = this.state.metricTolerence;
      return 'cm';
    } else if (this.state.unitSystem === 'IMPERIAL') {
      this.dom.metricNode.classList.remove('active');
      this.dom.imperialNode.classList.add('active');
      this.state.tolerence = this.state.imperialTolerence;
      return '″';
    }

    return 'cm';

  }

  toggle (event: SPX.Event<{ unit: string; value: string; }>) {

    event.preventDefault();

    if (event.target.classList.contains('active')) event.target.classList.remove('active');

    this.state.unitSystem = event.attrs.unit

    for (const node of this.dom.measurementNodes) {
      if (node.hasAttribute('data-unit')) {
        if (this.state.unitSystem === 'IMPERIAL') {
          node.innerHTML = `${event.attrs.value} <small>LBS</small>`;
        } else {
          node.innerHTML = `${event.attrs.value}kg`;
        }
      } else {
        node.innerHTML = `${event.attrs.value}${this.sizeUnit}`;
      }

    }


  }


}
