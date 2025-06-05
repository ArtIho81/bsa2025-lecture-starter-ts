import { ResponseResults } from './api';
import { getHTMLElement } from './helpers';

enum RandomMovieBannerSelectors {
    banner = '#random-movie',
    movieName = '#random-movie-name',
    movieDescription = '#random-movie-description',
}

const getRandomNumber = (num: number): number => Math.floor(Math.random() * num);

export const createRandomMovieBanner = (movies: ResponseResults[]) => {
    const randomMovieBanner = getHTMLElement(document, RandomMovieBannerSelectors.banner) as HTMLElement;
    const movieName = getHTMLElement(randomMovieBanner, RandomMovieBannerSelectors.movieName) as HTMLHeadingElement;
    const movieDescription = getHTMLElement(
        randomMovieBanner,
        RandomMovieBannerSelectors.movieDescription
    ) as HTMLParagraphElement;
    const randomMovieNumber = getRandomNumber(movies.length);
    const randomMovie = movies[randomMovieNumber];
    movieName.innerHTML = randomMovie.title;
    movieDescription.innerHTML = randomMovie.overview;
};
