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
  pageCount: number = 1; //已加载分页数量
  newestJokeCategoryId: number = 0; //上次加载的最新的jokeid

  constructor(public navCtrl: NavController, private dataService: DataService, private toolService: ToolService, public http: Http, public toastCtrl: ToastController) {

  }

  ngOnInit() {
    this.getPictureTypeData();
  }

  getPictureTypeData() {
    var jokeCategoryData = { "pageNo": this.pageCount, "type": 2, "size": 10 };
    this.http.post(this.dataService.serverURL + 'joke/getJokeCategoryList', jokeCategoryData).toPromise()
      .then(response => {
        let result = response.json();
        if (result.status == 'success') {
          for (let entry of result.data) {
            this.jokeCategoryList.push(entry);
          }
          this.pageCount++;
          if (this.jokeCategoryList.length > 0) {
            this.newestJokeCategoryId = this.jokeCategoryList[0].id;
          }
        } else {
          if (null != result.tip) {
            this.presentToast(result.tip);
          }
        }
      })
      .catch(this.requestHandleError);
  }

  getNewJokeCategoryData(refresher) {
    var jokeData = { "pageNo": 1, "type": 2, "size": 100, "index": this.newestJokeCategoryId };
    this.http.post(this.dataService.serverURL + 'joke/getJokeList', jokeData).toPromise()
      .then(response => {
        let result = response.json();
        if (result.status == 'success') {
          let jokeCategoryListTmp: TJokeCategory[] = new Array<TJokeCategory>();
          for (let entry of result.data) {
            jokeCategoryListTmp.push(entry);
          }
          this.jokeCategoryList = jokeCategoryListTmp.concat(this.jokeCategoryList);
          if (this.jokeCategoryList.length > 0) {
            this.newestJokeCategoryId = this.jokeCategoryList[0].id;
          }
        } else {
          if (null != result.tip) {
            this.presentToast(result.tip);
          }
        }
        refresher.complete();
      })
      .catch(this.requestHandleError);
  }

  refresh() {
    this.jokeCategoryList = new Array<TJokeCategory>();
    this.pageCount = 1; //已加载分页数量
    this.newestJokeCategoryId = 0; //上次加载的最新的jokeid
    this.getPictureTypeData();
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.getNewJokeCategoryData(refresher);
    }, 1000);
  }

  doInfinite(infiniteScroll) {

    setTimeout(() => {
      this.getPictureTypeData();
      infiniteScroll.complete();
    }, 1000);
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
