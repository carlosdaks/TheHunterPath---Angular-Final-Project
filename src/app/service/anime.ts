import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';

export interface RankingSemanal {
  data: any[];
}

export interface AnimeReciente{
  data: any[];
}

export interface AnimeDestacado{
  data: any[];
}

export interface AnimeDetalles {
    mal_id: number;
    title: string;
    title_japanese: string | null;
    synopsis: string | null;
    score: number | null;
    rank: number | null;
    episodes: number | null;
    status: string | null;
    source: string | null;
    year: number | null;
    images: ImagenesAnime;
    genres: NombreObjeto[];
    studios: NombreObjeto[];
}
interface NombreObjeto { 
    name: string; 
}

interface ImagenAnime { 
    image_url: string; 
    large_image_url: string; 
}

interface ImagenesAnime { 
    webp: ImagenAnime; 
}

//Busqueda avanzada------------------------------------------------------------------------------------
interface BusquedaAvanzada {
  data: any[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
  };
}

//Detalles especificos del anime---------------------------------------------------------------------------

export interface RespuestaEpisodiosAnime {
  data: Episodio[];
}
export interface RespuestaResenasAnime {
  data: Resena[];
}

export interface Episodio {
  mal_id: number;
  title: string;
  aired: string;
  filler: boolean;
  recap: boolean;
}
export interface Resena {
  user: {
    username: string;
    images: {
      webp: {
        image_url: string;
      };
    };
  };
  review: string;
  score: number;
  date: string;
}

//explorar ------------------------------------------------
export interface AnimeRandomExplorar {
  data: AnimeDetalles;
}

@Injectable({
  providedIn: 'root',
})
export class Anime {
  private linkApiJikan = `https://api.jikan.moe/v4`;

  constructor(private http: HttpClient) {}

  //llamadas del home
  obtenerRanking(): Observable<RankingSemanal> {
    const urlApi = `${this.linkApiJikan}/top/anime?filter=airing`; //hacemos la llamada a https://api.jikan.moe/v4/top/anime?filter=airing
    return this.http.get<RankingSemanal>(urlApi); // lo que devuelve este metodo es el metodo get de la clase httpClient en tipo RankingSemanal es decir un array[] de la url de arriba
  }
  obtenerAnimesRecientes(): Observable<AnimeReciente> {
    const urlApi = `${this.linkApiJikan}/seasons/now`;
    return this.http.get<AnimeReciente>(urlApi); 
  }
  obtenerAnimesPeliculas(): Observable<AnimeReciente> {
    const url = `${this.linkApiJikan}/top/anime?type=movie`; 
    return this.http.get<RankingSemanal>(url);
 }
 obtenerAnimesFavoritos(): Observable<AnimeReciente> {
   const url = `${this.linkApiJikan}/top/anime?filter=favorite`; 
   return this.http.get<RankingSemanal>(url);
}
  obtenerAnimeDestacado(): Observable<AnimeDestacado> {
    const urlApi = `${this.linkApiJikan}/top/anime?filter=bypopularity`;
    return this.http.get<AnimeDestacado>(urlApi);
  }
  obtenerProximosLanzamientos(): Observable<AnimeReciente> {
   const url = `${this.linkApiJikan}/seasons/upcoming`; 
   return this.http.get<RankingSemanal>(url);
}
  //Busqueda avanzadaa--------------------------------------------------------------------------------
  // se pone el ? porque quiza no se envia nada porque esta vacio el hueco
  busquedaAvanzadaAnime(params: 
    {q?: string; type?: string; status?: string; 
      rating?: string;  order_by?: string;  
      sort?: string;  limit?: number;}): Observable<BusquedaAvanzada> {
        let urlApi = `${this.linkApiJikan}/anime?`;
        const parametros: string[] = [];
        if(params.q){
          parametros.push(`q=${encodeURIComponent(params.q)}`);
        }
        if(params.type){
          parametros.push(`type=${params.type}`);
        }
        if(params.status){
          parametros.push(`status=${params.status}`);
        }
        if(params.rating){
          parametros.push(`rating=${params.rating}`);
        }
        if(params.order_by){
          parametros.push(`order_by=${params.order_by}`);
        }
        if(params.sort){
          parametros.push(`sort=${params.sort}`);
        }
        if(params.limit){
          parametros.push(`limit=${params.limit}`);
        }
        urlApi += parametros.join('&');
        return this.http.get<BusquedaAvanzada>(urlApi);
      }

  //Detalles especificos del anime ----------------------------------------------------------------------
  obtenerDetallesAnime(id: number): Observable<any> {
    const urlApi = `${this.linkApiJikan}/anime/${id}/full`;
    return this.http.get<any>(urlApi);
  }

  obtenerEpisodios(id: number): Observable<any> {
    const urlApi = `${this.linkApiJikan}/anime/${id}/episodes`;
    return this.http.get<RespuestaEpisodiosAnime>(urlApi);
  }

  obtenerResenas(id: number): Observable<RespuestaResenasAnime> {
    const urlApi = `${this.linkApiJikan}/anime/${id}/reviews`;
    return this.http.get<RespuestaResenasAnime>(urlApi);
  }
  //----------------------------------------------------------------------------------------------------------------------
  //para la pestañla de explorar anime random
   obtenerAnimeAleatorio(): Observable<AnimeRandomExplorar> {
    const urlApi = `${this.linkApiJikan}/random/anime`;
    return this.http.get<AnimeRandomExplorar>(urlApi);
  }

}
