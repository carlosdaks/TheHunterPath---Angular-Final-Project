import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Anime } from '../../service/anime';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-buscador',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './buscador.html',
  styleUrl: './buscador.css',
})
export class Buscador{


  formularioBusqueda: FormGroup;
  resultados: any[] = [];
  cargando: boolean = false;
  error: string | null = null;
  sinResultados: boolean = false;


  constructor(private fb: FormBuilder,private animeService: Anime) {
    this.formularioBusqueda = this.fb.group({
      //valores dentro del formulario que queremos poner
      textoBusqueda: [''],
      tipoDeAnime: [''],
      estado: [''],
      rating: [''],
      orden: ['score'],
      sort: ['desc']
    });
  }

  buscarAnime(): void {
    const busquedaFormulario = this.formularioBusqueda.value; //para coger lo que escirbe el usuario
    const numeroResultados: any = {limit: 10 };
  
    //comprobamos que los huecos no estan vacio o son nulos
    if(busquedaFormulario.textoBusqueda){
      numeroResultados.q = busquedaFormulario.textoBusqueda;
    }
    if(busquedaFormulario.tipoDeAnime){
      numeroResultados.type = busquedaFormulario.tipoDeAnime;
    }
    if(busquedaFormulario.estado){
      numeroResultados.status = busquedaFormulario.estado;
    }
    if(busquedaFormulario.rating){
      numeroResultados.rating = busquedaFormulario.rating;
    }
    if(busquedaFormulario.orden){
      numeroResultados.order_by = busquedaFormulario.orden;
    }
    if(busquedaFormulario.sort){
      numeroResultados.sort = busquedaFormulario.sort;
    }

    this.cargando = true;
    this.error = null;
    this.sinResultados = false;

    //aqui se hace la llamada a laapi
    this.animeService.busquedaAvanzadaAnime(numeroResultados).subscribe({
      //si la repsuesta de la api es correcta lanza next
      next: (resultados) => {
        if(resultados && resultados.data){
          this.resultados = resultados.data;
          this.sinResultados = this.resultados.length === 0;//esta es comprobacion por si el anime que buscas no exsiste no es error de laapi sino que no exsiste con lo que length es 0
        }else{
          this.resultados = [];
          this.sinResultados = true;
        }
        this.cargando = false;
      },
      //el error es como un else, si la peticon falla salta eso
      error: (error) => {
        this.error = "Ha habido un error en la api al buscar los animes";
        this.cargando = false;
      }
    });  
  }

  resetearFormulario(): void {
    this.formularioBusqueda.reset(
      {
        textoBusqueda: '',
        tipoDeAnime: '',
        estado: '',
        rating: '',
        orden: 'score',
        sort: 'desc'
      });
      this.resultados = []; //vovlemos a poner el array de resultados vacio
      this.sinResultados = false;
      this.error = null;
  }
   obtenerUrlImagen(anime: any): string {
    return anime.images?.webp?.image_url || anime.images?.jpg?.image_url || '';
  }



}
