import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Anime } from '../../service/anime';
import { ListaGuardados, AnimeLista } from '../../service/lista-guardados';

@Component({
  selector: 'app-detalles-animes',
  imports: [CommonModule, FormsModule],
  templateUrl: './detalles-animes.html',
  styleUrl: './detalles-animes.css',
})
export class DetallesAnimes implements OnInit {

  anime: any = null;
  episodios: any[] = [];
  resenas: any[] = [];
  cargando: boolean = true;
  error: string | null = null;
  mostrarEpisodios: boolean = false;
  mostrarResenas: boolean = false;

  animeEnLista: AnimeLista | undefined;

  constructor(private route: ActivatedRoute,
    private animeService: Anime,
    public router: Router,
    private listaService: ListaGuardados,

  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(datosUrl => {
      const id = parseInt(datosUrl['id']); //hacemos esto para pasar el string del id a int
      if (id) { //si exsiste el id pues llamamos a los metodos y lo pasamos como parametro
        this.cargarDetalles(id);
        // this.verificarEnLista(id); esto necesito la laista
      }
    });
  }

  //------------------------------------------------------------------------------------------------------------------
  cargarDetalles(id: number): void {
    this.cargando = true;
    this.error = null;
    this.animeService.obtenerDetallesAnime(id).subscribe({ //llamada a la api pidiendo todos los datos de unanime
      next: (response: any) => {
        this.anime = response.data;
        this.cargando = false;
        this.cargarEpisodios(id);
        this.cargarResenas(id);
      },
      error: (err) => {
        this.error = 'No se pudo cargar la información del anime.';
        this.cargando = false;
        console.error('Error:', err);
      }
    });
  }

  cargarEpisodios(id: number): void {
    this.animeService.obtenerEpisodios(id).subscribe({
      next: (response) => {
        this.episodios = response.data || []; //salva en el caso que la api de error o no tenga info de episodios devuelve la lista vaicia
      },
      error: (error) => {
        console.error('Error al cargar episodios:', error);
      }
    });
  }

  cargarResenas(id: number): void {
    this.animeService.obtenerResenas(id).subscribe({
      next: (response) => {
        this.resenas = response.data || [];
      },
      error: (err) => {
        console.error('Error al cargar reseñas:', err);
      }
    });
  }

  obtenerUrlImagen(): string {
    return this.anime?.images?.webp?.large_image_url || 
           this.anime?.images?.jpg?.large_image_url || '';
  }
   obtenerGeneros(): string {
    return this.anime?.genres?.map((g: any) => g.name).join(', ') || '';
  }
//-----------------------------------------------------------------------------------------------------------------

//Metodos apra comprobar si estan en la lista o no,meterlos, eliminarlos etc

anadirALista(): void {
  if (this.anime) {
    this.listaService.añadirAnime(this.anime);
    this.verificarEnLista(this.anime.mal_id);
  }
}

verificarEnLista(id: number): void {
  this.animeEnLista = this.listaService.obtenerAnime(id);
}

  actualizarEstado(nuevoEstado: 'planned' | 'watching' | 'completed' | 'dropped'): void {
    if (this.animeEnLista && this.anime) {
      this.listaService.actualizarAnime(this.anime.mal_id, { status: nuevoEstado });
      this.verificarEnLista(this.anime.mal_id);
    }
  }

  alternarFavorito(): void {
    if (this.animeEnLista && this.anime) {
      this.listaService.actualizarAnime(this.anime.mal_id, { 
        isFavorite: !this.animeEnLista.isFavorite 
      });
      this.verificarEnLista(this.anime.mal_id);
    }
  }

  eliminarDeLista(): void {
    if (this.animeEnLista && this.anime) {
      this.listaService.eliminarAnime(this.anime.mal_id);
      this.animeEnLista = undefined;
    }
  }

  //-----------------------------------------------------------------------------------------------------------------






}

