import { QueryParams, Search, SortParams, getMovies } from './api';
import { IMG_URL, Tags } from './config';
import { getHTMLElement, MovieInfo, responseMapper } from './helpers';

enum MovieCardSelectors {
    container = '#film-container',
    cardText = '.card-text',
    releaseDate = '.text-muted',
}

const moviesContainer = getHTMLElement(document, MovieCardSelectors.container) as HTMLDivElement;
const movieCardTemplate = getHTMLElement(moviesContainer, Tags.div) as HTMLDivElement;
const movieCardTemplateElements = {
    cardText: getHTMLElement(movieCardTemplate, MovieCardSelectors.cardText) as HTMLParagraphElement,
    releaseDate: getHTMLElement(movieCardTemplate, MovieCardSelectors.releaseDate) as HTMLElement,
    movieImage: getHTMLElement(movieCardTemplate, Tags.img) as HTMLImageElement,
    favoriteIcon: getHTMLElement(movieCardTemplate, Tags.svg) as SVGElement,
};

const fillMovieCard = (item: MovieInfo) => {
    const { movieImage, cardText, releaseDate } = movieCardTemplateElements;
    movieImage.src = IMG_URL + item.poster_path;
    cardText.innerHTML = item.overview;
    releaseDate.innerHTML = item.release_date;

    return movieCardTemplate.cloneNode(true);
};

export const renderMoviesPage = async (list: SortParams | Search, queryParams: QueryParams): Promise<void> => {
    moviesContainer.innerHTML = '';
    const moviesOnPage = await getMovies(list, queryParams);
    const moviesInfo = responseMapper(moviesOnPage.results);
    const moviesCard: Node[] = moviesInfo.map(fillMovieCard);
    moviesCard.map((item) => moviesContainer.appendChild(item));
};
