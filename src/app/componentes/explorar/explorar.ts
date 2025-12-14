import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Anime, AnimeDetalles } from '../../service/anime';
import { ListaGuardados, AnimeLista } from '../../service/lista-guardados';

@Component({
  selector: 'app-explorar',
  imports: [CommonModule, RouterLink],
  templateUrl: './explorar.html',
  styleUrl: './explorar.css',
})
export class Explorar{

 animeAleatorio: AnimeDetalles | null = null; // Para almacenar el anime aleatorio
  cargando: boolean = false;
  error: string | null = null;

  constructor(private animeService: Anime,private listaGuardados: ListaGuardados) {}

  sorprendeme(): void {
    this.cargando = true;
    this.error = null;
    this.animeAleatorio = null; // Limpiar el anime anterior
    this.animeService.obtenerAnimeAleatorio().subscribe({
      next: (response) => {
        if (response && response.data) {
          this.animeAleatorio = response.data;
        } else {
          this.error = 'No se pudo obtener un anime aleatorio.';
        }
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al obtener anime aleatorio. Inténtalo de nuevo.';
        this.cargando = false;
        console.error('Error:', err);
      }
    });
  }

  anadirALista(): void {
    if (this.animeAleatorio) {
      this.listaGuardados.añadirAnime(this.animeAleatorio);
      alert(`${this.animeAleatorio.title} añadido correctamente :D.`); //alert para que el usuario almenos sepa que se ha añladido a la lista
    } else {
      alert('No hay anime para añadir a la lista.');
    }
  }

  probarOtro(): void {
    this.sorprendeme();
  }

  obtenerUrlImagen(anime: any): string {
    return anime.images?.webp?.image_url || anime.images?.jpg?.image_url || '';
  }
}
