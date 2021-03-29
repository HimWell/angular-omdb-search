import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MovieDetails } from '../model/MovieDetails';
import { MovieService } from '../service/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  selectedMovie$ = new Observable<MovieDetails>();
  imdbID = '';
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(public movieService: MovieService, private snackBar: MatSnackBar, private route: ActivatedRoute, public router: Router) {

    // tslint:disable-next-line: deprecation
    this.route.queryParams.subscribe(params => {
      this.imdbID = params.imdbID;
      console.log('movie id: -->', this.imdbID);
  });

    this.isLoading$.next(true);
    this.selectedMovie$ = this.route.queryParams.pipe(
    map(queryParams => queryParams.imdbID),
    switchMap(imdbID => this.movieService.getMovieDetails(imdbID))
    );
    this.isLoading$.next(false);
    this.snackBar.open(`Retrived Movie Details`, '', {
      duration: 3000,
      horizontalPosition: 'end',
      panelClass: 'background-success'
    }),
    this.isLoading$.next(false);
    // tslint:disable-next-line:no-unused-expression
    () => {
         this.snackBar.open(`Failed to Retrive Movie Details`, 'Close',
 {
   horizontalPosition: 'end',
   panelClass: 'background-err'
 });
    };

  }

  ngOnInit(): void {
  }

  navigateToMovieSearch(): void {
    // this.isLoading$.next(true);
    this.router.navigate(['/movielist']);
    // this.isLoading$.next(false);
  }
}
