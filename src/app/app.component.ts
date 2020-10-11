import { Component } from '@angular/core';

import { ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';
import { NativeAudio } from '@ionic-native/native-audio/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  showSplash: boolean = true;
  caminoInicial: string = '../../assets/panteraRosa.mp3';
  jungle:any;
   
  

  constructor(private nativeAudio: NativeAudio, private platform: Platform,  private splashScreen: SplashScreen, private statusBar: StatusBar) {
    this.initializeApp();
  }


  async initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();  
      timer(5000).subscribe(() => this.showSplash = false);    
    });
  }

}
