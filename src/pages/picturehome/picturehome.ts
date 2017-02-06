import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, App } from 'ionic-angular';
import { DataService } from "../service/data-service";
import { TJokeCategory } from "../../model/TJokeCategory";
import { PicturePage } from "../picture/picture";


@Component({
  selector: 'page-picturehome',
  templateUrl: 'picturehome.html'
})
export class PictureHomePage implements OnInit {

  jokeCategoryList: TJokeCategory[] = new Array<TJokeCategory>();
  tips: string;

  constructor(public navCtrl: NavController, private dataService: DataService, public http: Http, private app: App) {

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
            this.tips = "无法获取分类数据：" + result.tip;
          }
        }
      })
      .catch(this.requestHandleError);
  }

  browser(selectedItem: TJokeCategory) {
    this.navCtrl.push(PicturePage, { 'selectedJokeCategory': selectedItem });
  }

  private requestHandleError(error: any): Promise<any> {
    this.tips = "无法获取分类数据，出现异常：" + error.tip;
    return Promise.reject(error.tip || error);
  }
}
