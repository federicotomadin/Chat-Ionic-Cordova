import { Injectable } from '@angular/core';
// import {AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { usuario } from '../models/usuario';
import { AngularFireAuth } from '@angular/fire/auth'
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService { 
// private coleccion: AngularFirestoreCollection<usuario>
private usuarios: Observable<usuario[]>
public isLogged: any = false;

  constructor(public afAuth: AngularFireAuth, private alertController: AlertController) {

         
      afAuth.authState.subscribe(resp => { this.isLogged = true })

    // this.coleccion = db.collection<usuario>('usuarios');
    // this.usuarios = this.coleccion.snapshotChanges().pipe(map(
    //   actions => {
    //     return actions.map(a => {
    //       const data = a.payload.doc.data();
    //       const id  = a.payload.doc.id; 
    //       return { id, ...data };
    //     });
    //   }
    // ))
   }

//Login 
async OnLogin(user: usuario) {
  
  try {

    return await (await this.afAuth.signInWithEmailAndPassword(user.correo, user.clave)); 

  } catch (error) {

   console.log('Error en la creacion del usario', error);
   throw(error);
       
  }
}

async onRegister(user: usuario) {
  
  try {

    return await this.afAuth.createUserWithEmailAndPassword(user.correo, user.clave);
    
  } catch (error) {
    // console.log('Error en la creacion del usario', error);
    throw(error);
  }
}

logout() {
  this.afAuth.signOut();
}

  getUsuarios() {
    return this.usuarios;
  } 

  admin: usuario = new usuario("1", "admin@gmail.com", "111111", "admin", "femenino");
  invitado: usuario = new usuario("2", "invitado@gmail.com", "222222", "invitado", "femenino");
  usuario: usuario = new usuario("3", "usuario@gmail.com", "333333", "usuario", "masculino");
  anonimo: usuario = new usuario("4", "anonimo@gmail.com", "444444", "anónimo", "masculino");
  tester: usuario = new usuario("5", "tester@gmail.com", "555555", "tester", "femenino");

  public Usuarios() {

    let lista = new Array<usuario>();
    lista.push(this.admin);
    lista.push(this.invitado);
    lista.push(this.usuario);
    lista.push(this.anonimo);
    lista.push(this.tester);

    return lista;
  }

  
 async IngresoIncorrecto(titulo:string, mensaje:string) {

  const alert = await this.alertController.create({
    animated: true,
    backdropDismiss: true,
    cssClass: 'my-custom-class',
    header: titulo,
    message: mensaje,
    buttons: ['OK']
  });
   await alert.present();
}
}
