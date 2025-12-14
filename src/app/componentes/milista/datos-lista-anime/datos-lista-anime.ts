import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common'; 

type FiltroTipo = 'todos' | 'viendo' | 'completado' | 'planeado' | 'niConTuTiempo' | 'favoritos';


interface ContadoresRecibidos {
  id: FiltroTipo;
  name: string;
  count: number;
}

@Component({
  selector: 'app-datos-lista-anime',
  imports: [CommonModule],
  templateUrl: './datos-lista-anime.html',
  styleUrl: './datos-lista-anime.css',
})
export class DatosListaAnime {

//los inputs que recibimos del padre

  @Input() contadores: ContadoresRecibidos[] = []; 

  @Input() filtroActivo: FiltroTipo = 'todos'; 
  
//output que devolvemos al padre
  @Output() filtroSeleccionado = new EventEmitter<FiltroTipo>();

  filtroClick(filtroTipo: FiltroTipo): void {
    this.filtroSeleccionado.emit(filtroTipo);
  }
}
