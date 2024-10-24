import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import searchResultsView from './views/searchResultsView.js';

if (module.hot) {
  module.hot.accept();
}

// const recipeContainer = document.querySelector('.recipe');
// const resultsContainer = document.querySelector('.results');

// https://forkify-api.herokuapp.com/v2
//664c8f193e7aa067e94e863d

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // 1 loading recipe
    await model.loadRecipe(id);
    //2 render
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    searchResultsView.renderSpinner();

    await model.loadSearchResults(query);

    searchResultsView.render(model.state.search.results);
  } catch (err) {
    searchResultsView.renderError();
  }
};
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();

// controlRecipes();
///////////////////////////////////////
