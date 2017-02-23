import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, ToastController } from 'ionic-angular';
import { DataService } from "../service/data-service";
import { VideoPage } from "../video/video";
import { TJokeCategory } from "../../model/TJokeCategory";

@Component({
  selector: 'page-videohome',
  templateUrl: 'videohome.html'
})
export class VideoHomePage {
  jokeCategoryList: TJokeCategory[] = new Array<TJokeCategory>();

  constructor(public navCtrl: NavController, private dataService: DataService, public http: Http, public toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.getVideoTypeData();
  }

  getVideoTypeData() {
    var jokeCategoryData = { "type": 3 };
    this.http.post(this.dataService.serverURL + 'joke/getJokeCategoryList', jokeCategoryData).toPromise()
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
    this.navCtrl.push(VideoPage, { 'selectedJokeCategory': selectedItem });
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
