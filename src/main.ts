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

const moviesSortSelector: NodeListOf<HTMLInputElement> = document.querySelectorAll(InputSelectors.sortSelector);
let moviesSortSelectorActive = getHTMLElement(document, InputSelectors.sortSelectorChecked) as HTMLInputElement;
const searchInput = getHTMLElement(document, InputSelectors.search) as HTMLInputElement;

renderMoviesPage(moviesSortSelectorActive.id as SortParams, { page: START_PAGE });

moviesSortSelector.forEach((button) => {
    button.addEventListener('change', async () => {
        if (button.checked) {
            const sort = button.id as SortParams;
            await renderMoviesPage(sort, { page: START_PAGE });
            moviesSortSelectorActive = button;
            searchInput.value = '';
        }
    });
});
