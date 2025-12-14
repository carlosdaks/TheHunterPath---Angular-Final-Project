import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { RouterLink } from '@angular/router';

type FiltroTipo = 'todos' | 'viendo' | 'completado' | 'planeado' | 'niConTuTiempo' | 'favoritos';

interface FiltroCategoria {
  id: FiltroTipo;
  name: string;
}

@Component({
  selector: 'app-lista-animes',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf, RouterLink], 
  templateUrl: './lista-animes.html',
  styleUrl: './lista-animes.css',
})
export class ListaAnimes {
  
  etiquetasEstado: any = {
    'watching': 'Viendo',
    'completed': 'Completado',
    'planned': 'Pendiente',
    'dropped': 'Ni con tu tiempo',
  };

//inputs que recibimos del padre
  @Input() animes: any[] = []; 
  @Input() filtroActivo: FiltroTipo = 'todos'; 
  @Input() opcionesFiltro: FiltroCategoria[] = []; 

//outputs que devolvemos al padre
  @Output() filtroSeleccionado = new EventEmitter<FiltroTipo>();

  palabraBusqueda: string = '';

   get animesFiltrados(): any[] {
    if (!this.palabraBusqueda.trim()) {
      return this.animes;
    }
    return this.animes.filter(anime => 
      anime.title.toLowerCase().includes(this.palabraBusqueda.toLowerCase())
    );
  }

  filtroClick(idFiltro: FiltroTipo): void {
    this.filtroSeleccionado.emit(idFiltro);
  }
}