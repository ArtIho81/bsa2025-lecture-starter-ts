import { getMovie } from './api';
import { IMG_URL, Tags, MovieCardSelectors } from './config';
import { getHTMLElement, MovieInfo } from './helpers';

enum FavoriteIconColor {
    favorite = 'red',
    notFavorite = '#ff000078',
}
enum LocalStorage {
    favoriteMovies = 'favorite-movies',
}

const getDataFromLocalStorage = (item: string): string[] => {
    const data = localStorage.getItem(item);
    return data ? JSON.parse(data) : [];
};

const setDataToLocalStorage = (item: string, data: string[]): void => {
    localStorage.setItem(item, JSON.stringify(data));
};

export const isMovieFavorite = (movieId: string): boolean =>
    getDataFromLocalStorage(LocalStorage.favoriteMovies).includes(movieId);

export const fillingColor = (movieId: string): string =>
    isMovieFavorite(movieId) ? FavoriteIconColor.favorite : FavoriteIconColor.notFavorite;

export const renderFavoriteMovies = () => {
    const favoriteMoviesIds = getDataFromLocalStorage(LocalStorage.favoriteMovies);
    const favoriteMoviesContainer = getHTMLElement(document, '#favorite-movies > :first-child') as HTMLDivElement;
    const favoriteMovieCard = getHTMLElement(favoriteMoviesContainer, '.card') as HTMLDivElement;
    const favoriteMovieCardElements = {
        cardText: getHTMLElement(favoriteMovieCard, MovieCardSelectors.cardText) as HTMLParagraphElement,
        releaseDate: getHTMLElement(favoriteMovieCard, MovieCardSelectors.releaseDate) as HTMLElement,
        movieImage: getHTMLElement(favoriteMovieCard, Tags.img) as HTMLImageElement,
    };

    favoriteMoviesContainer.innerHTML = '';

    const fillFavoriteMovie = (item: MovieInfo) => {
        const { movieImage, cardText, releaseDate } = favoriteMovieCardElements;
        movieImage.src = IMG_URL + item.poster_path;
        cardText.innerHTML = item.overview;
        releaseDate.innerHTML = item.release_date;

        return favoriteMovieCard.cloneNode(true);
    };

    favoriteMoviesIds.forEach(async (id) => {
        const favoriteMovie = await getMovie(+id);
        favoriteMoviesContainer.appendChild(fillFavoriteMovie(favoriteMovie));
    });
};

export const toggleFavoriteMovie = (movieId: string): string => {
    let favoriteMovies = getDataFromLocalStorage(LocalStorage.favoriteMovies);
    favoriteMovies = isMovieFavorite(movieId)
        ? favoriteMovies.filter((id) => id !== movieId)
        : favoriteMovies.concat(movieId);
    setDataToLocalStorage(LocalStorage.favoriteMovies, favoriteMovies);
    renderFavoriteMovies();

    return fillingColor(movieId);
};
