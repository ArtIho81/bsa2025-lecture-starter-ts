import { QueryParams, Search, SortParams, getMovies } from './api';
import { IMG_URL, START_PAGE, Tags , Actions } from './config';
import { getHTMLElement, MovieInfo, responseMapper } from './helpers';
import { fillingColor, toggleFavoriteMovie } from './favorite-movie';

enum MovieCardSelectors {
    container = '#film-container',
    cardText = '.card-text',
    releaseDate = '.text-muted',
}

const MOVIE_ID_ATTRIBUTE = 'movie-id';

const moviesContainer = getHTMLElement(document, MovieCardSelectors.container) as HTMLDivElement;
const movieCardTemplate = getHTMLElement(moviesContainer, Tags.div) as HTMLDivElement;
const movieCardTemplateElements = {
    cardText: getHTMLElement(movieCardTemplate, MovieCardSelectors.cardText) as HTMLParagraphElement,
    releaseDate: getHTMLElement(movieCardTemplate, MovieCardSelectors.releaseDate) as HTMLElement,
    movieImage: getHTMLElement(movieCardTemplate, Tags.img) as HTMLImageElement,
    favoriteIcon: getHTMLElement(movieCardTemplate, Tags.svg) as SVGElement,
};

const fillMovieCard = (item: MovieInfo) => {
    const { movieImage, cardText, releaseDate, favoriteIcon } = movieCardTemplateElements;
    movieImage.src = IMG_URL + item.poster_path;
    cardText.innerHTML = item.overview;
    releaseDate.innerHTML = item.release_date;
    favoriteIcon.setAttribute(MOVIE_ID_ATTRIBUTE, String(item.id));
    favoriteIcon.style.fill = fillingColor(String(item.id));

    return movieCardTemplate.cloneNode(true);
};

export const renderMoviesPage = async (list: SortParams | Search, queryParams: QueryParams = {}): Promise<void> => {
    const params = { ...queryParams };
    if (!params.page) {
        params.page = START_PAGE;
        moviesContainer.innerHTML = '';
    }
    const moviesOnPage = await getMovies(list, params);
    const moviesInfo = responseMapper(moviesOnPage.results);
    const moviesCard: Node[] = moviesInfo.map(fillMovieCard);
    moviesCard.map((item) => moviesContainer.appendChild(item));
    moviesContainer.querySelectorAll(Tags.svg).forEach((icon) => {
        icon.addEventListener(Actions.click, () => {
            const movieId = icon.getAttribute(MOVIE_ID_ATTRIBUTE);
            if (movieId) {
                const iconColor = icon.style;
                iconColor.fill = toggleFavoriteMovie(movieId);
            }
        });
    });
};
