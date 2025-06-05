export const API_KEY = 'api_key=774a8b8ec5bdfb82ea4602f9b712a546';
export const API_URL = 'https://api.themoviedb.org/3/';
export const IMG_URL = 'https://image.tmdb.org/t/p/original/';

export enum Tags {
    div = 'div',
    img = 'img',
    svg = 'svg',
}

export enum Actions {
    click = 'click',
    change = 'change',
}

export enum MovieCardSelectors {
    container = '#film-container',
    cardText = '.card-text',
    releaseDate = '.text-muted',
}

export enum LocalStorage {
    favoriteMovies = 'favorite-movies',
}

export const START_PAGE = 1;
