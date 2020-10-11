import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Mensaje } from '../Modules/mensaje';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.page.html',
  styleUrls: ['./opciones.page.scss'],
})

export class OpcionesPage implements OnInit {

  nombreUsuario: string = "";
  mensaje: string = "";
  mensajes = new Array<Mensaje>();
  claseActual = "colorTerciario";
  mostrar:boolean = true;

  constructor(private router: Router) {

    this.nombreUsuario = localStorage.getItem("usuarioActual");
    this.getMessages();
  }

  ngOnInit() {

    if (localStorage.usuarioActual == undefined) {
      this.router.navigate(['/login'])
    }

  }

  getMessages() {

    var messagesRef = firebase.database().ref().child("mensajes_a");
    messagesRef.on("value", (snap) => {
      var data = snap.val();
      this.mensajes = [];
      for (var key in data) {
        this.mensajes.push(data[key]);
      }
      this.mostrar = false;
    });
  }

  sendMessage() {

    var fechaActual = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
    var messagesRef = firebase.database().ref().child("mensajes_a");
    messagesRef.push({ mensaje: this.mensaje, nombre: this.nombreUsuario, fecha: fechaActual });
    this.mensaje = "";
  }

  salir() {
    localStorage.clear();
    this.router.navigate(['/menu'])
  }
}

