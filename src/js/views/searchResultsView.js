import icons from 'url:../../img/icons.svg';
import View from './view';

class SearchResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes under that category, try another one!';
  _message = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join();
  }

  _generateMarkupPreview(item) {
    const id = window.location.hash.slice(1);
    return `<li class="preview">
            <a class="preview__link ${
              item.id === id ? 'preview__link--active' : ''
            }" href="#${item.id}">
              <figure class="preview__fig">
                <img src="${item.imageUrl}" alt="${item.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${item.title}</h4>
                <p class="preview__publisher">${item.publisher}</p>
              </div>
            </a>
          </li>`;
  }
}

export default new SearchResultsView();
