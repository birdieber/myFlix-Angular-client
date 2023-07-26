// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MovieInfoComponent } from '../movie-info/movie-info.component';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovies();
  }

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  /**
 * 
 * @param name 
 * @param description
 * @param image
 * @returns void
 * @memberof MovieCardComponent
 * @see MovieInfoComponent
 * @example openGenre()
 * @example openDirector() 
 */
  // openGenre(name: string, description: string): void {
  //   this.dialog.open(MovieInfoComponent, {
  //     data: {
  //       title: name,
  //       content: description
  //     },
  //     //width: '280px'
  //   });
  // }

  openDirector(name: string, bio: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: name,
        content: bio
      },
      width: '1000px'
    });
  }

  openSynopsis(title: string, description: string, image: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: title,
        content: description,
        image: image
      },
      width: '500px'
    });
  }

  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {

      this.snackBar.open('Movie added to favorites.', 'OK', {
        duration: 2000
      });
    });
  }
/**
 * 
 * @param id 
 * @memberof MovieCardComponent
 * @see FetchApiDataService.isFavoriteMovie()
 * @example isFavorite()
 * @example removeFavorite()
 */
  isFavorite(id: string): boolean {
    return this.fetchApiData.isFavoriteMovie(id);
  }

  removeFavorite(id: string): void {
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites.', 'OK', {
        duration: 2000
      });
    });
  }
}