import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaAnimes } from './lista-animes/lista-animes';
import { DatosListaAnime } from './datos-lista-anime/datos-lista-anime';
import { ListaGuardados, AnimeLista } from '../../service/lista-guardados';

type FiltroTipo = 'todos' | 'viendo' | 'completado' | 'planeado' | 'niConTuTiempo' | 'favoritos';

interface FiltroCategoria {
  id: FiltroTipo;
  name: string;
}

@Component({
  selector: 'app-mi-lista',
  standalone: true,
  imports: [CommonModule, ListaAnimes, DatosListaAnime],
  templateUrl: './milista.html',
  styleUrl: './milista.css',
})
export class Milista implements OnInit {
  listaUsuario: AnimeLista[] = [];

  filtroActivo: FiltroTipo = 'todos';

  opcionesFiltro: FiltroCategoria[] = [
    { id: 'todos', name: 'Todos' },
    { id: 'viendo', name: 'Viendo' },
    { id: 'completado', name: 'Completados' },
    { id: 'planeado', name: 'Planeados' },
    { id: 'niConTuTiempo', name: 'Ni con tu tiempo' },
    { id: 'favoritos', name: 'Favoritos' },
  ];

  constructor(private ListaGuardados: ListaGuardados) {}

  get listaFiltrada(): any[] {
    const filtro = this.filtroActivo;

    if (filtro === 'todos') {
      return this.listaUsuario;
    }
    if (filtro === 'favoritos') {
      return this.listaUsuario.filter((anime) => anime.isFavorite);
    }
    if (filtro === 'viendo') {
      return this.listaUsuario.filter((anime) => anime.status === 'watching');
    }
    if (filtro === 'completado') {
      return this.listaUsuario.filter((anime) => anime.status === 'completed');
    }
    if (filtro === 'planeado') {
      return this.listaUsuario.filter((anime) => anime.status === 'planned');
    }
    if (filtro === 'niConTuTiempo') {
      return this.listaUsuario.filter((anime) => anime.status === 'dropped');
    }
    return [];
  }

  get contadoresEstado(): { id: FiltroTipo, name: string, count: number }[] {
    const contadores = {
      todos: this.listaUsuario.length,
      viendo: this.listaUsuario.filter(a => a.status === 'watching').length,
      completado: this.listaUsuario.filter(a => a.status === 'completed').length,
      planeado: this.listaUsuario.filter(a => a.status === 'planned').length,
      niConTuTiempo: this.listaUsuario.filter(a => a.status === 'dropped').length,
      favoritos: this.listaUsuario.filter(a => a.isFavorite).length,
    };

    return [
      { id: 'todos', name: 'Todos los Animes', count: contadores.todos },
      { id: 'favoritos', name: 'Favoritos', count: contadores.favoritos },
      { id: 'viendo', name: 'Viendo', count: contadores.viendo },
      { id: 'completado', name: 'Completados', count: contadores.completado },
      { id: 'planeado', name: 'Pendientes', count: contadores.planeado },
      { id: 'niConTuTiempo', name: 'Ni con tu tiempo', count: contadores.niConTuTiempo },
    ];
  }

  seleccionarFiltro(filtroTipo: FiltroTipo): void {
    this.filtroActivo = filtroTipo;
  }

  ngOnInit(): void {
    this.cargarLista();
  }

  cargarLista(): void {
    this.listaUsuario = this.ListaGuardados.obtenerLista();
  }
}
