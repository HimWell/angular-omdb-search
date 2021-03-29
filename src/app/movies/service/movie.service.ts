import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MovieDetails } from '../model/MovieDetails';
import { Movies } from '../model/Movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiKey = '157f9eb7';
  private url = 'https://omdbapi.com/';

  constructor(private httpClient: HttpClient) { }

  searchMovieWithPagination(searchQuery: string, page: number): Observable<Movies> {
    return this.httpClient.get<Movies>(`${this.url}?apikey=${this.apiKey}&s=${searchQuery}&page=${page}`).pipe(
      catchError(err => throwError(err))
      );
  }

  getMovieDetails(imdbId: string): Observable<MovieDetails> {
    return this.httpClient.get<MovieDetails>(`${this.url}?apikey=${this.apiKey}&i=${imdbId}&plot=full`).pipe(
      catchError(err => throwError(err))
    );
  }
}
