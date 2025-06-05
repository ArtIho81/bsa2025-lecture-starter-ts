import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/styles.css';
import { getHTMLElement } from './helpers';
import { Actions, START_PAGE } from './config';
import { renderMoviesPage } from './movies-page';
import { SortParams } from './api';
import { renderFavoriteMovies } from './favorite-movie';

// TODO render your app here

enum InputSelectors {
    sortSelector = '.btn-check',
    sortSelectorChecked = '.btn-check[checked]',
    search = '#search',
}
enum ButtonSelectors {
    loadMore = '#load-more',
    search = '#search-submit',
}

let currentPage = START_PAGE;
const moviesSortSelector: NodeListOf<HTMLInputElement> = document.querySelectorAll(InputSelectors.sortSelector);
let moviesSortSelectorActive = getHTMLElement(document, InputSelectors.sortSelectorChecked) as HTMLInputElement;
const searchInput = getHTMLElement(document, InputSelectors.search) as HTMLInputElement;
const searchButton = getHTMLElement(document, ButtonSelectors.search) as HTMLButtonElement;
const loadMoreButton = getHTMLElement(document, ButtonSelectors.loadMore) as HTMLButtonElement;

renderMoviesPage(moviesSortSelectorActive.id as SortParams);

moviesSortSelector.forEach((button) => {
    button.addEventListener(Actions.change, async () => {
        if (button.checked) {
            const sort = button.id as SortParams;
            await renderMoviesPage(sort);
            moviesSortSelectorActive = button;
            searchInput.value = '';
        }
    });
});

searchButton.addEventListener(Actions.click, async () => {
    const searchValue = searchInput.value;
    if (searchValue) {
        await renderMoviesPage('search', {
            query: searchValue,
        });
    }
});

loadMoreButton.addEventListener(Actions.click, async () => {
    const sort = moviesSortSelectorActive.id as SortParams;
    const searchValue = searchInput.value;
    currentPage += 1;
    await renderMoviesPage(searchValue ? 'search' : sort, { page: currentPage, query: searchValue });
});

renderFavoriteMovies();
