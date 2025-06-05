import { LocalStorage } from './config';
import { renderFavoriteMovies } from './favorite-movie-menu';
import { localStorageActions } from './helpers';

enum FavoriteIconColor {
    favorite = 'red',
    notFavorite = '#ff000078',
}

export const isMovieFavorite = (movieId: string): boolean =>
    localStorageActions.getDataFromLocalStorage(LocalStorage.favoriteMovies).includes(movieId);

export const fillingColor = (movieId: string): string =>
    isMovieFavorite(movieId) ? FavoriteIconColor.favorite : FavoriteIconColor.notFavorite;

export const toggleFavoriteMovie = (movieId: string): string => {
    let favoriteMovies = localStorageActions.getDataFromLocalStorage(LocalStorage.favoriteMovies);
    favoriteMovies = isMovieFavorite(movieId)
        ? favoriteMovies.filter((id) => id !== movieId)
        : favoriteMovies.concat(movieId);
    localStorageActions.setDataToLocalStorage(LocalStorage.favoriteMovies, favoriteMovies);
    renderFavoriteMovies();

    return fillingColor(movieId);
};
