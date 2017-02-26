import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, ToastController } from 'ionic-angular';
import { DataService } from "../service/data-service";
import { ToolService } from "../service/tool-service";
import { TJokeCategory } from "../../model/TJokeCategory";
import { PicturePage } from "../picture/picture";


@Component({
  selector: 'page-picturehome',
  templateUrl: 'picturehome.html'
})
export class PictureHomePage implements OnInit {

  jokeCategoryList: TJokeCategory[] = new Array<TJokeCategory>();

  constructor(public navCtrl: NavController, private dataService: DataService, private toolService: ToolService, public http: Http, public toastCtrl: ToastController) {

  }

  ngOnInit() {
    this.getPictureTypeData();
  }

  getPictureTypeData() {
    var jokeCategoryData = { "type": 2 };
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

  transferTime(timeValue: number) {
    return this.toolService.transferTime(timeValue);
  }
}
