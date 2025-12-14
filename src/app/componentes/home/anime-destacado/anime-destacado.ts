import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Anime } from '../../../service/anime';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-anime-destacado',
  imports: [CommonModule, RouterLink],
  templateUrl: './anime-destacado.html',
  styleUrl: './anime-destacado.css',
})
export class AnimeDestacado {


  animesDestacados: any[] = [];
    isLoading: boolean = true;
    error: string | null = null;
    currentIndex: number = 0;
  
    constructor(private animeService: Anime) { }
  
    ngOnInit(): void {
      this.animeService.obtenerAnimeDestacado().subscribe({
        next: (response) => {
          // La información de los animes está en la propiedad 'data' de la respuesta
          this.animesDestacados = response.data;
          this.isLoading = false;
          console.log('Animes cargados:', this.animesDestacados);
        },
        error: (err: any) => {
          this.error = 'No se pudo cargar el ranking. Inténtalo de nuevo más tarde.';
          this.isLoading = false;
          console.error('Error al obtener el ranking:', err);
        }
      });
    }

    siguienteAnime(): void {
    this.currentIndex = (this.currentIndex + 1) % this.animesDestacados.length;
  }

  animeAnterior(): void {
    this.currentIndex = (this.currentIndex - 1 + this.animesDestacados.length) % this.animesDestacados.length;
  }

  animeDestacadoActual(): any {
    return this.animesDestacados[this.currentIndex];
  }
}