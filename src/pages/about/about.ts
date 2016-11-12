import { Component,OnInit } from '@angular/core';

import { NavController, App } from 'ionic-angular';
import { UserData } from "../../model/user-data";
import { DataService } from "../service/data-service";


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit {
  user: UserData;

  constructor(public navCtrl: NavController, private dataService: DataService, private app: App) {

  }

  ngOnInit() {
    this.user = this.dataService.loginUser;
  }

  logout() {
    this.app.getRootNav().popToRoot();
  }
}
