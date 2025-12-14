import { Injectable } from '@angular/core';

export interface AnimeLista {
  id: number;
  mal_id: number;
  title: string;
  image_url: string;
  status: 'planned' | 'watching' | 'completed' | 'dropped'; //ponemos solo esots 4 porque todos no es un estado real del anime
  isFavorite: boolean;
  userScore?: number;
  score?: number;
  synopsis?: string;
  episodes?: number;
  addedDate: string;
}

@Injectable({
  providedIn: 'root',
})

export class ListaGuardados {
  private readonly miListaGuardada = 'mi_lista_anime';

  obtenerLista(): AnimeLista[] {
    const lista = localStorage.getItem(this.miListaGuardada);
    return lista ? JSON.parse(lista) : [];
  }

  guardarLista(lista: AnimeLista[]): void {
    localStorage.setItem(this.miListaGuardada, JSON.stringify(lista));
  }

  añadirAnime(anime: any): void {
    const lista = this.obtenerLista();
    const existe = lista.find((a) => a.mal_id === anime.mal_id);

    if (!existe) {
      const nuevoAnime: AnimeLista = {
        id: Date.now(),
        mal_id: anime.mal_id,
        title: anime.title || anime.title_english || 'Sin título',
        image_url: anime.images?.webp?.image_url || anime.images?.jpg?.image_url || '',
        status: 'planned',
        isFavorite: false,
        score: anime.score,
        synopsis: anime.synopsis,
        episodes: anime.episodes,
        addedDate: new Date().toISOString(),
      };
      lista.push(nuevoAnime);
      this.guardarLista(lista);
    }
  }
  obtenerAnime(mal_id: number): AnimeLista | undefined {
    const lista = this.obtenerLista();
    return lista.find((a) => a.mal_id === mal_id);
  }

  //para no tener que volver a poner imagen nombre etc se usa el partial para solo cambiar un atributo
  actualizarAnime(mal_id: number, updates: Partial<AnimeLista>): void {
    const lista = this.obtenerLista();
    const index = lista.findIndex(a => a.mal_id === mal_id);
    
    if (index !== -1) {
      lista[index] = { ...lista[index], ...updates };
      this.guardarLista(lista);
    }
  }

  eliminarAnime(mal_id: number): void {
    const lista = this.obtenerLista();
    const nuevaLista = lista.filter(a => a.mal_id !== mal_id);
    this.guardarLista(nuevaLista);
  }

}
