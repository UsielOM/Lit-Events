import { LitElement, html } from 'lit-element';

export class MyListener extends LitElement {


    static get properties() {
        return {
            canCheck: {}
        };
    }
    constructor() {
        super();
        this.canCheck = false;
    }

    render() {
        return html `
        
        <p @checked=${this._checkedHandler}><slot></slot></p>
      <hr>
      <p>${this.canCheck ? 'Allowing' : 'Preventing'} check</p>
      <p><button @click=${this._clickHandler}>Toggle</button></p>

        `;
    }

    _checkedHandler(e) {
        if (!this.canCheck) {
            e.preventDefault();
            e.detail.message = '✅ Prevented!!';
        }
    }
    _clickHandler() {
        this.canCheck = !this.canCheck;
    }
}
customElements.define('my-listener', MyListener);