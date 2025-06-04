import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/styles.css';
import { getHTMLElement } from './helpers';
import { START_PAGE } from './config';
import { renderMoviesPage } from './movie-page';
import { SortParams } from './api';

// TODO render your app here

enum InputSelectors {
    sortSelector = '.btn-check',
    sortSelectorChecked = '.btn-check[checked]',
    search = '#search',
}
enum ButtonSelectors {
    nextPage = '#load-more',
    search = '#search-submit',
}
enum Actions {
    click = 'click',
    change = 'change',
}

let currentPage = START_PAGE;
const moviesSortSelector: NodeListOf<HTMLInputElement> = document.querySelectorAll(InputSelectors.sortSelector);
let moviesSortSelectorActive = getHTMLElement(document, InputSelectors.sortSelectorChecked) as HTMLInputElement;
const searchInput = getHTMLElement(document, InputSelectors.search) as HTMLInputElement;
const searchButton = getHTMLElement(document, ButtonSelectors.search) as HTMLButtonElement;
const loadMoreButton = getHTMLElement(document, ButtonSelectors.nextPage) as HTMLButtonElement;

renderMoviesPage(moviesSortSelectorActive.id as SortParams, { page: START_PAGE });

moviesSortSelector.forEach((button) => {
    button.addEventListener(Actions.change, async () => {
        if (button.checked) {
            const sort = button.id as SortParams;
            await renderMoviesPage(sort, { page: START_PAGE });
            moviesSortSelectorActive = button;
            searchInput.value = '';
        }
    });
});

searchButton.addEventListener(Actions.click, async () => {
    const searchValue = searchInput.value;
    if (searchValue) {
        await renderMoviesPage('search', {
            page: START_PAGE,
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
