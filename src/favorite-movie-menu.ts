import { getMovie } from './api';
import { IMG_URL, LocalStorage, MovieCardSelectors, Tags } from './config';
import { getHTMLElement, MovieInfo, localStorageActions } from './helpers';

const favoriteMoviesContainer = getHTMLElement(document, '#favorite-movies > :first-child') as HTMLDivElement;
const favoriteMovieCard = getHTMLElement(favoriteMoviesContainer, '.card') as HTMLDivElement;
const favoriteMovieCardElements = {
    cardText: getHTMLElement(favoriteMovieCard, MovieCardSelectors.cardText) as HTMLParagraphElement,
    releaseDate: getHTMLElement(favoriteMovieCard, MovieCardSelectors.releaseDate) as HTMLElement,
    movieImage: getHTMLElement(favoriteMovieCard, Tags.img) as HTMLImageElement,
};

const fillFavoriteMovie = (item: MovieInfo) => {
    const { movieImage, cardText, releaseDate } = favoriteMovieCardElements;
    movieImage.src = IMG_URL + item.poster_path;
    cardText.innerHTML = item.overview;
    releaseDate.innerHTML = item.release_date;

    return favoriteMovieCard.cloneNode(true);
};

export const renderFavoriteMovies = () => {
    const favoriteMoviesIds = localStorageActions.getDataFromLocalStorage(LocalStorage.favoriteMovies);
    favoriteMoviesContainer.innerHTML = '';

    favoriteMoviesIds.forEach(async (id) => {
        const favoriteMovie = await getMovie(+id);
        favoriteMoviesContainer.appendChild(fillFavoriteMovie(favoriteMovie));
    });
};
