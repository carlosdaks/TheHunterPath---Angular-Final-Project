import { Component, signal } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {


  protected menuAbierto = signal(false);

  alternarMenu(): void {
    this.menuAbierto.update((estadoActual) => !estadoActual);
  }

  cerrarMenu(): void  {
    this.menuAbierto.set(false);
  }

}
