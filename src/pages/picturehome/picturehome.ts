import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, App, ToastController } from 'ionic-angular';
import { DataService } from "../service/data-service";
import { TJokeCategory } from "../../model/TJokeCategory";
import { PicturePage } from "../picture/picture";


@Component({
  selector: 'page-picturehome',
  templateUrl: 'picturehome.html'
})
export class PictureHomePage implements OnInit {

  jokeCategoryList: TJokeCategory[] = new Array<TJokeCategory>();

  constructor(public navCtrl: NavController, private dataService: DataService, public http: Http, private app: App, public toastCtrl: ToastController) {

  }

  ngOnInit() {
    this.getPictureTypeData();
  }

  getPictureTypeData() {
    this.http.get(this.dataService.serverURL + 'joke/getJokeCategoryList/2').toPromise()
      .then(response => {
        let result = response.json();
        if (result.status == 'success') {
          this.jokeCategoryList = result.data;
        } else {
          if (null != result.tip) {
           this.presentToast(result.tip);
          }
        }
      })
      .catch(this.requestHandleError);
  }

  browser(selectedItem: TJokeCategory) {
    this.navCtrl.push(PicturePage, { 'selectedJokeCategory': selectedItem });
  }

  private requestHandleError(error: any): Promise<any> {
    this.presentToast(error.tip);
    return Promise.reject(error.tip || error);
  }

   presentToast(info) {
    let toast = this.toastCtrl.create({
      message: info,
      duration: 2000
    });
    toast.present();
  }
}
