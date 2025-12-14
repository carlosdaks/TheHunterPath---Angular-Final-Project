
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Observable } from 'rxjs';
import { Anime, RankingSemanal } from '../../../service/anime'; 
import { RouterLink } from '@angular/router';

interface barraCategorias {
  name: string;
  id: string;
  fetcher: () => Observable<RankingSemanal>;
}

@Component({
  selector: 'app-animes-recientes',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './animes-recientes.html',
  styleUrl: './animes-recientes.css',
})
export class AnimesRecientes implements OnInit {
  
  categoriaEnfocada: string = 'recent'; 
  animesRecientes: any[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  
  constructor(private animeService: Anime) { } 


  //las 4 categorias que van guardando un array de animes cada una
  categorias: barraCategorias[] = [
    { name: 'Animes recientes', id: 'recent', fetcher: () => this.animeService.obtenerAnimesRecientes() },
    { name: 'Favoritos del mundo', id: 'favoritos', fetcher: () => this.animeService.obtenerAnimesFavoritos() },
    { name: 'Proximos lanzamientos', id: 'proximos', fetcher: () => this.animeService.obtenerProximosLanzamientos() },
    { name: 'Peliculas', id: 'movies', fetcher: () => this.animeService.obtenerAnimesPeliculas() },
  ];

  ngOnInit(): void {
    const defaultFetcher = this.categorias.find(cat => cat.id === this.categoriaEnfocada)?.fetcher;
    if (defaultFetcher) {
        this.fetchAnimes(defaultFetcher);
    }
  }

  seleccionarCategoria(id: string, fetcher: () => Observable<RankingSemanal>): void {
    if (this.categoriaEnfocada === id) {
        return; 
    }
    this.categoriaEnfocada = id;
    this.fetchAnimes(fetcher);
  }

  fetchAnimes(apiCallFunction: () => Observable<RankingSemanal>): void {
    this.isLoading = true;
    this.error = null;
    
    apiCallFunction().subscribe({
      next: (response: RankingSemanal) => { 
        this.animesRecientes = response.data.slice(0, 5); //limitamos para que solo me de 5 resultados
        this.isLoading = false;
        console.log(`Animes cargados para ${this.categoriaEnfocada}`);
      },
      error: (err: any) => {
        this.error = `No se pudo cargar la categoría ${this.categoriaEnfocada}.`;
        this.isLoading = false;
        console.error('Error al obtener datos:', err);
      }
    });
  }
}