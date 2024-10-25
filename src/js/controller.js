import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import searchResultsView from './views/searchResultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

// if (module.hot) {
//   module.hot.accept();
// }

// const recipeContainer = document.querySelector('.recipe');
// const resultsContainer = document.querySelector('.results');

// https://forkify-api.herokuapp.com/v2
//664c8f193e7aa067e94e863d

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    //0 update result view to mark selected search result
    searchResultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
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

    searchResultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (err) {
    searchResultsView.renderError();
  }
};

const controlServings = function (newServings) {
  // Updated recipe servings
  model.updateServings(newServings);
  // model.updateServings(6);
  // Update recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlPagination = function (page) {
  searchResultsView.render(model.getSearchResultsPage(page));
  paginationView.render(model.state.search);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else if (model.state.recipe.bookmarked)
    model.removeBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  paginationView.addHandlerClick(controlPagination);
  searchView.addHandlerSearch(controlSearchResults);
};
init();

// controlRecipes();
///////////////////////////////////////
