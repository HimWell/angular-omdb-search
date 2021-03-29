import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movies } from '../model/Movies';
import { MovieService } from '../service/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  movieList: Movies | null = null;
  searchQuery = '';
  isLoading$ = new BehaviorSubject<boolean>(false);
  totalResults = '';
  currentPage = 1;
  pageSize = 10;
  @ViewChild(MatPaginator, { static : false}) paginator: MatPaginator| null = null;

  constructor(public movieService: MovieService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  queryMovies(pageEvent?: PageEvent): void {
    this.isLoading$.next(true);
    if (!!pageEvent) {
      this.pageSize = +pageEvent.pageSize;
      this.currentPage = +pageEvent?.pageIndex + 1;
    }
    // tslint:disable-next-line: deprecation
    this.movieService.searchMovieWithPagination(this.searchQuery, this.currentPage).subscribe(data => {
      this.movieList = data;
      console.log('movie list with pagination: -->', data);
      this.isLoading$.next(false);
      this.snackBar.open(`Retrived Movies...`, '', {
        duration: 3000,
        horizontalPosition: 'end',
        panelClass: 'background-success'
      }),
      this.isLoading$.next(false);
      // tslint:disable-next-line:no-unused-expression
      () => {
        this.snackBar.open(`Failed to Retrive Movies`, 'Close', {
          horizontalPosition: 'end',
          panelClass: 'background-err'
        });
      };
    });
  }

  navigateToMovieDetails(imdbID: any): void {
    this.router.navigate(['/moviedetails'], { queryParams: { imdbID } });
  }
}
