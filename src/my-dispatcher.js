import { LitElement, html } from 'lit-element';

export class MyDispatcher extends LitElement {

    static get properties() {
        return {
            label: {},
            message: {},
        };
    }
    constructor() {
        super();
        this.label = 'Check me!';
        this.message = this.defaultMessage;
    }
    defaultMessage = '😀';
    _resetMessage;


    render() {
        return html `

      <label><input type="checkbox" @click=${this._tryChange}>${this.label}</label>
      <div>${this.message}</div>

        `;
    }

    _tryChange(e) {
        const detail = { message: this.message };
        const event = new CustomEvent('checked', {
            detail,
            bubbles: true,
            composed: true,
            cancelable: true,
        });
        this.dispatchEvent(event);
        if (event.defaultPrevented) {
            e.preventDefault();
        }
        this.message = detail.message;
    }

    updated() {
        clearTimeout(this._resetMessage);
        this._resetMessage = setTimeout(
            () => (this.message = this.defaultMessage),
            1000
        );
    }
}
customElements.define('my-dispatcher', MyDispatcher);