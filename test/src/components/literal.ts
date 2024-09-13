import spx from 'spx';
import x from 's';

class Literal {

  dom: any;
  foo: { bar: string; };

  connect () {

    this.foo.bar = '';

    this.dom`
      <button>
      <div
      id="foo">


      </div>

      </button>
    `;

    document.querySelector('a');

  }

}

spx.dom`

<div>

</div>

`;
