import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera_response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public moviesSlideShow: Movie[] = [];
  public movies: Movie[] =[];  

  @HostListener('window:scroll', ['$event']) 
  onScroll(){
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if(pos > max){
      if(this.peliculasService.cargando){
        return;
      }
      this.peliculasService.getCartelera().subscribe(movies => {
        this.movies.push(...movies);
      });
    }
  }

  constructor(private peliculasService:PeliculasService, private router:Router) { }

  ngOnInit(): void {
    this.peliculasService.getCartelera().subscribe(movies => {
        this.movies = movies;  
        this.moviesSlideShow = movies.slice(0, 6);              
    })
  }

  ngOnDestroy(): void {
    this.peliculasService.resetCarteleraPage();
  }

  setLang(language:string){
    if(language === 'Español'){
      localStorage.setItem('language', 'es-ES');
    }

    if(language === 'English'){
      localStorage.setItem('language', 'en-US');
    }
    //Reload page to reflect changes, since the info comes from the MOVIEDB API
    window.location.reload();
  }

}
