import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//motion
import { DeviceMotion } from '@ionic-native/device-motion';
import { DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';

//audio

import { NativeAudio } from '@ionic-native/native-audio/ngx';

//vibracion
import { Vibration } from '@ionic-native/vibration/ngx';
//flash
import { Flashlight } from '@ionic-native/flashlight/ngx';

import { BarcodeScannerOptions, BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import { AuthService } from '../servicios/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  data: any;
  suscription: any;


  public mostrar = true;
   caminoAOdin: string = '../../assets/hacia_izquierda.mp3';
   caminoAScar: string = '../../assets/hacia_derecha.mp3';
   caminoAGuns: string = '../../assets/vibracion.mp3';

  scar: any;
  odin: any;
  guns: any;
  public valorBoton: string = "Activar Alarmas";


  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;

  constructor(private router: Router,
    private nativeAudio: NativeAudio,
    private vibration: Vibration,
    private flash: Flashlight,
    private barcodeScanner: BarcodeScanner,
    private authService: AuthService, 
    public afAuth: AngularFireAuth, 
    private alertCtrl: AlertController) {

    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };

    this.freno(1).then(() => {
      this.mostrar = false;
    });
  }

  ngOnInit() {
    //this.iniciarlizarAudios();
  }

  accion() {

    if (this.valorBoton === "Activar Alarmas") {
      this.observar();
    }
    else if (this.valorBoton === "Desactivar Alarmas") {

      this.presentPrompt();

      // this.desactivarSonidos();
      
    }
  }

  iniciarlizarAudios() {
    this.scar = new Audio();
    this.scar.src = this.caminoAScar;
    this.scar.volume = 1;
    this.scar.load();
    this.scar.loop = false;

    this.odin = new Audio();
    this.odin.src = this.caminoAOdin;
    this.odin.volume = 1;
    this.odin.load();

    this.guns = new Audio();
    this.guns.src = this.caminoAGuns;   
    this.guns.volume = 0.1;
    this.guns.load();
  }

  //=================================================movimiento

  observar() {
    this.valorBoton = "Desactivar Alarmas";
    this.iniciarlizarAudios();


    var opciones: DeviceMotionAccelerometerOptions = {
      frequency: 100
    }

    this.suscription = DeviceMotion.watchAcceleration(opciones).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.data = acceleration;

      if (acceleration.x < -0.3) {
        this.frenarSonidoScar();
        this.activarOdin();
      }

      if (acceleration.x > 0.3) {
        this.frenarSonidoOdin();
        this.activarScar();
      }

      //vertical prende el flash, funciona
      if (acceleration.y > 5) {

        this.frenarSonidos();
        this.activarFlash();
      }
      else if (acceleration.y < -5) {
        this.frenarSonidos();
        this.activarFlash();
      }

      //vibración
      if (acceleration.z > 11 || acceleration.z < -11) {

        this.frenarSonidos();
         this.activarGuns();
        this.activarVibracion();
      }

    });
  }


  abandonarObservacion() {
    this.suscription.unsubscribe();
  }

  //=====================================================Sonidos

  desactivarSonidos() {

    this.valorBoton = "Activar Alarmas";

    if (this.scar) {
      this.scar.pause();
    }

    if (this.odin) {
      this.odin.pause();
    }

    if (this.guns) {
      this.guns.pause();
    }

    this.guns = null;
    this.scar = null;
    this.odin = null;

    this.suscription.unsubscribe();
  }

  frenarSonidos() {
    this.frenarSonidoOdin();
    this.frenarSonidoScar();
    this.frenarSonidoGuns();
  }

  //=================================================Sonido Scar
  activarScar() {
    this.scar.play();
    this.scar.loop = true;
  }

  frenarSonidoScar() {
    this.scar.pause();
    this.scar.loop = false;
  }

  //=================================================Sonido Odin
  activarOdin() {
    this.odin.play();
    this.odin.loop = true;
  }

  frenarSonidoOdin() {
    this.odin.pause();
    this.odin.loop = false;
  }

  //=================================================Sonido Guns
  activarGuns() {
    this.guns.play();
    this.guns.loop = false;
  }

  frenarSonidoGuns() {
    this.guns.pause();
    this.guns.loop = false;
  }

  //===================================================Vibrar
  activarVibracion() {
    this.vibration.vibrate(3000);
  }

  //=================================================flash
  activarFlash() {
    this.flash.switchOn();
    this.freno(2000).then(any => {
      this.flash.switchOff();
    });
  }

  salir() {
    this.authService.logout();
    this.router.navigate(['/login']);
   }

  async freno(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("fired"));
  }


  async presentPrompt() {
    let alerta = await this.alertCtrl.create({
       header: 'Ingrese su contraseña',
      inputs: [
        {
          name: 'clave',
          placeholder: 'Clave',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Desactivar alarma',
          handler: data => {
             this.afAuth.signInWithEmailAndPassword(localStorage.getItem('correo'), data.clave)
             .then(resp => {
              this.desactivarSonidos();
              return true;
            })
            .catch(resp => { 
              this.authService.IngresoIncorrecto('Contraseña incorrecta', '');
              return false;
            })
          }
        }
      ]
    });
    await alerta.present();
  }

}