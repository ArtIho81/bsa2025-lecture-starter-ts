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

const moviesSortSelectorActive = getHTMLElement(document, InputSelectors.sortSelectorChecked) as HTMLInputElement;

renderMoviesPage(moviesSortSelectorActive.id as SortParams, { page: START_PAGE });
