const template = document.createElement("template");
template.innerHTML = `
                      <style>
                        .progress-bar {
                          width: 100%;
                          height: 30px;
                          background-color: #EDF2F4;
                          border-radius: 5px;
                          color: #FFF;
                        }
                        .progress-bar-inner {
                          height: 100%;
                          line-height: 30px;
                          background: #2B2D42;
                          text-align: center;
                          border-radius: 5px;
                          transition: width 0.25s;
                        }
                      </style>
                      <div class="progress-bar">
                        <div class="progress-bar-inner"></div>
                      </div>
                    `;

export default class ProgressBar extends HTMLElement {
  get complete() {
    return this._complete;
  }

  get min() {
    return this.getAttribute("min") | 0;
  }

  get max() {
    return this.getAttribute("max") | 100;
  }

  set complete(val) {
    this.setAttribute("complete", val);
  }

  static get observedAttributes() {
    return ["complete", "min", "max"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  attributeChangedCallback(name, oldVal, newVal) {
    var innerBar = this.shadowRoot.querySelector(".progress-bar-inner");

    switch (name) {
      case "complete":
        this._complete = parseInt(newVal, 10) || this.min;

        innerBar.style.width = this.complete + "%";
        innerBar.innerHTML = this.complete + "%";

        if (this.max == this._complete) {
          innerBar.innerHTML = "Completed!";
        }
    }
  }

  connectedCallback() {
    this._complete = 0;
  }
}

window.customElements.define("progress-bar", ProgressBar);
