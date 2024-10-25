import icons from 'url:../../img/icons.svg';
import View from './view';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');
  _errorMessage = 'No recipes under that category, try another one!';
  _message = '';

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const nextButtonMarkup = `
          <button class="btn--inline pagination__btn--next" data-goto="${
            currentPage + 1
          }">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    const prevButtonMarkup = `
          <button class="btn--inline pagination__btn--prev" data-goto="${
            currentPage - 1
          }">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          `;
    //Page 1 other pages
    if (currentPage === 1 && numPages > 1) {
      return nextButtonMarkup;
    }

    //Page one no other pages
    if (currentPage === 1 && numPages === 1) {
      return ``;
    }
    //last page
    if (currentPage === numPages) {
      return prevButtonMarkup;
    }
    //other page
    return `${nextButtonMarkup}${prevButtonMarkup}`;
  }
}

export default new PaginationView();
