import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera_response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private baseUrl:string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando:boolean = false;

  constructor( private http:HttpClient) { }

  get params(){
    let language = localStorage.getItem('language');

    if(!language){
      language = 'es-ES' //Idioma por defecto
    }

    return{
      api_key: 'f8a5555888cbd428ae5c04d2b3bc0a60', //No la roben pls :C
      language,
      page: this.carteleraPage.toString()
    }
  }

  resetCarteleraPage(){
    this.carteleraPage = 1;
  }

  getCartelera():Observable<Movie[]>{      
    console.log(this.carteleraPage) ;
    if(this.cargando){
      //Cargando peliculas
      return of([]);
    }
    
    this.cargando = true;
      return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {
        params: this.params
      }).pipe(
        map((resp) => {
          return resp.results //Regresamos unicamente los resultados del arreglo
        }),
        //Ejecuta este codigo cada que el obsrevable ejecuta algo
        tap( () => {
          //Se incrementa el indice de la cartelera
          this.carteleraPage++;
          this.cargando = false;
        })
      );
  }

  buscarPeliculas(texto:string): Observable<Movie[]>{
    this.cargando = true;
    //Se le agrega QUERY al objeto para realizar la llamada a la API 
    const params = {...this.params, query: texto} //No se muta el arreglo
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {
      params 
    }).pipe(
      map(resp => resp.results), // Regresamos solo las peliculas
      tap(()=> {
        this.carteleraPage ++;
        this.cargando = false;
      })
    );
  }
}
