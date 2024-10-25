import icons from 'url:../../img/icons.svg';
import View from './view';
import previewView from './previewView';

class SearchResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes under that category, try another one!';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join();
  }
}

export default new SearchResultsView();
