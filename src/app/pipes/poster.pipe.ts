import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster'
})
export class PosterPipe implements PipeTransform {
//http://image.tmdb.org/t/p/w500https://image.tmdb.org/t/p/w500{{ movie.poster_path }}
baseUrl:string = 'http://image.tmdb.org/t/p/w500';

  transform(poster: string): string {
    if(poster === null){
      return './assets/no-image.jpg';
    }
    return this.baseUrl + poster;
  }

}
