import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera_response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  movies:Movie[] = [];
  query: string = '';
  @HostListener('window:scroll', ['$event'])
  onScroll(){
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if(pos > max){
      if(this.peliculasService.cargando){
        return;
      }
      this.peliculasService.buscarPeliculas(this.query).subscribe(movies => {
        console.log(movies);
        this.movies.push(...movies);
      });
    }
 }

  constructor( private activatedRoute:ActivatedRoute, private peliculasService:PeliculasService ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.query = params['texto'];
      this.peliculasService.buscarPeliculas(this.query).subscribe(movies => {
        this.movies = movies;
      })
    })
  }

}
