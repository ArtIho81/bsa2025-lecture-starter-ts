import { API_KEY, API_URL } from './config';

export type Search = 'search';
export type SortParams = 'popular' | 'top_rated' | 'upcoming';
export type QueryParams = { page?: number; query?: string };
export interface ResponseResults {
    id: number;
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface ResponseMovies {
    page: number;
    total_pages: number;
    results: ResponseResults[];
    total_results: number;
}

const createQuery = (queryParams: QueryParams): string =>
    `?${Object.entries(queryParams)
        .map((param) => `${param[0]}=${param[1]}&`)
        .join('')}${API_KEY}`;

const createSortUrl = (sort: SortParams, queryParams: QueryParams): string => {
    const query = createQuery(queryParams);
    return `${API_URL}movie/${sort}${query}`;
};

const createSearchUrl = (search: Search, queryParams: QueryParams): string => {
    const query = createQuery(queryParams);
    return `${API_URL}${search}/movie${query}`;
};

export const getMovies = async (list: SortParams | Search, queryParams: QueryParams): Promise<ResponseMovies> => {
    const url = list === 'search' ? createSearchUrl(list, queryParams) : createSortUrl(list, queryParams);
    const res = await fetch(url);
    const data: ResponseMovies = await res.json();
    return data;
};
