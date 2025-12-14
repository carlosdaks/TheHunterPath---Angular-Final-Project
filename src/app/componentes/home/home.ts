import { Component, OnInit } from '@angular/core';
import { AnimeDestacado } from './anime-destacado/anime-destacado';
import { AnimesRecientes } from './animes-recientes/animes-recientes';
import { RankingSemanal } from './ranking-semanal/ranking-semanal';
import { Anime } from '../../service/anime';

@Component({
  selector: 'app-home',
  imports: [AnimeDestacado,AnimesRecientes,RankingSemanal],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  

}
