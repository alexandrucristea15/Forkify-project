import icons from 'url:../../img/icons.svg';

class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const data = this._parentEl.querySelector('.search__field').value;
    this.#clearInput();
    return data;
  }

  #clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
