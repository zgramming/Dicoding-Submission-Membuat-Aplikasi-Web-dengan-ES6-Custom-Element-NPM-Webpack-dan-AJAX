class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.render();
  }
  set keyupEvent(event) {
    this._keyupEvent = event;
    this.render();
  }
  get value() {
    return this.shadowDOM.querySelector('#search').value;
  }
  render() {
    this.shadowDOM.innerHTML = `
        <style>
            .search-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background-color: rgb(31 41 55);
                min-height: 4rem;
                margin-top: 5rem;
                padding: 0 5rem;
                border-radius: 1rem;
              }
          
              input#search {
                width:100%;
                padding: 0.5rem 1rem;
                border-radius: 1rem;
              }
        </style>
        <div class="search-container">
            <input id="search" type="text" placeholder="Cari hero berdasarkan namanya..." class="w-full px-5 py-1 rounded-lg" />
        </div>    
        `;
    this.shadowDOM.querySelector('#search').addEventListener('keyup', this._keyupEvent);
  }
}

customElements.define('search-bar', SearchBar);
