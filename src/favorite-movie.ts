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

export const toggleFavoriteMovie = (movieId: string): string => {
    let favoriteMovies = getDataFromLocalStorage(LocalStorage.favoriteMovies);
    favoriteMovies = isMovieFavorite(movieId)
        ? favoriteMovies.filter((id) => id !== movieId)
        : favoriteMovies.concat(movieId);
    setDataToLocalStorage(LocalStorage.favoriteMovies, favoriteMovies);

    return fillingColor(movieId);
};
