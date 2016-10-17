import { Component } from '@angular/core';

import { NavController,App } from 'ionic-angular';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {


  constructor(public navCtrl: NavController, private app: App) {

  }

  logout(){
     this.app.getRootNav().popToRoot();
  }
}
