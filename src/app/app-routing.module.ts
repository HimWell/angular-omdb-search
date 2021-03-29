import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'movielist', pathMatch: 'full' },
  { path: 'movielist', component: MovieListComponent },
  { path: 'moviedetails', component: MovieDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
