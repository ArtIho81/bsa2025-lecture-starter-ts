import { ResponseResults } from './api';

export const getHTMLElement = (parent: Document | HTMLElement, selector: string) => parent.querySelector(selector);

export class MovieInfo {
    id: number;

    overview: string;

    poster_path: string;

    release_date: string;

    title: string;

    constructor(response: ResponseResults) {
        this.id = response.id;
        this.overview = response.overview;
        this.poster_path = response.poster_path;
        this.release_date = response.release_date;
        this.title = response.title;
    }
}

export const responseMapper = (data: ResponseResults[]): MovieInfo[] => data.map((item) => new MovieInfo(item));
