import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Anime } from '../../../service/anime';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ranking-semanal',
  imports: [CommonModule, RouterLink],
  templateUrl: './ranking-semanal.html',
  styleUrl: './ranking-semanal.css',
})
export class RankingSemanal implements OnInit {

  animesRankingSemanal: any[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private animeService: Anime) { }

  ngOnInit(): void {
    this.animeService.obtenerRanking().subscribe({
      next: (response) => {
        this.animesRankingSemanal = response.data;
        this.isLoading = false;
        console.log('Animes cargados:', this.animesRankingSemanal.slice(0, 5));
      },
      error: (err: any) => {
        this.error = 'No se pudo cargar el ranking. Inténtalo de nuevo más tarde.';
        this.isLoading = false;
        console.error('Error al obtener el ranking:', err);
      }
    });
  }
}