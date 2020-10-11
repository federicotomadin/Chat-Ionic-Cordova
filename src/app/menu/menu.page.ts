import { Component, OnInit } from '@angular/core';
import { User } from '../Modules/user';
import { Router } from '@angular/router'
import * as firebase from 'firebase';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  mostrar:boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {

    if(localStorage.usuarioActual == undefined)
    {      
      this.router.navigate(['/login'])
    }

     this.freno(1000).then(()=>{      
      this.mostrar = false;
    });

  }

  Ingresar(evento) {
    let opcion = evento.toElement.id;

    switch (opcion) {
      case "1":
        this.IngresoChatA();        
        break;
      case "2":
        this.IngresoChatB();        
        break;
      default:
        console.log("Hubo un error");
        break;
        
    }
    //this.router.navigateByUrl('home')
  }
  
  IngresoChatA() {
    
    this.router.navigate(['/opciones'])
    
  }
  
  IngresoChatB() {
    this.router.navigate(['/opciones-b'])
  }

  async freno(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }

  salir(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
  

}
