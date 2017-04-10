import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, NavParams, ToastController } from 'ionic-angular';
import { TJokeCategory } from "../../model/TJokeCategory";
import { TJoke } from "../../model/TJoke";
import { MovieDetailPage } from "../moviedetail/moviedetail";
import { DataService } from "../service/data-service";
import { ToolService } from "../service/tool-service";
// import chart from 'chart.js'; // 导入chart.js


@Component({
  selector: 'page-movie',
  templateUrl: 'movie.html'
})
export class MoviePage implements OnInit {

  pageCount: number = 1; //已加载分页数量
  newestJokeId: number = 0; //上次加载的最新的jokeid
  selectedJokeCategory: TJokeCategory;
  selectedJoke: TJoke;
  jokeList: TJoke[] = new Array<TJoke>();

  constructor(public navCtrl: NavController, private dataService: DataService, private toolService: ToolService, private navParm: NavParams, public http: Http, public toastCtrl: ToastController) {
  }


  ngOnInit() {
    this.selectedJokeCategory = this.navParm.get('selectedJokeCategory');
    this.getMoreJokeData(this.selectedJokeCategory.id);
  }

  getMoreJokeData(categoryId: number) {
    var jokeData = { "userId": this.dataService.loginUser.id, "pageNo": this.pageCount, "type": 3, "categoryId": categoryId, "size": 5 };
    this.http.post(this.dataService.serverURL + 'joke/getJokeList', jokeData).toPromise()
      .then(response => {
        let result = response.json();
        if (result.status == 'success') {
          for (let entry of result.data) {
            this.jokeList.push(entry);
          }
          this.pageCount++;
          if (this.jokeList.length > 0) {
            this.newestJokeId = this.jokeList[0].id;
          }
        } else {
          if (null != result.tip) {
            this.presentToast(result.tip);
          }
        }
      })
      .catch(this.requestHandleError);
  }

  getNewJokeData(refresher) {
    var jokeData = { "userId": this.dataService.loginUser.id, "index": this.newestJokeId, "pageNo": 1, "type": 3, "categoryId": this.selectedJokeCategory.id, "size": 1000 };
    this.http.post(this.dataService.serverURL + 'joke/getJokeList', jokeData).toPromise()
      .then(response => {
        let result = response.json();
        if (result.status == 'success') {
          let jokeListTmp: TJoke[] = new Array<TJoke>();
          for (let entry of result.data) {
            jokeListTmp.push(entry);
          }
          this.jokeList = jokeListTmp.concat(this.jokeList);
          if (this.jokeList.length > 0) {
            this.newestJokeId = this.jokeList[0].id;
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

  browser(selectedItem: TJoke) {
    this.navCtrl.push(MovieDetailPage, { 'selectedJoke': selectedItem });
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.getNewJokeData(refresher);
    }, 1000);
  }

  doInfinite(infiniteScroll) {

    setTimeout(() => {
      this.getMoreJokeData(this.selectedJokeCategory.id);
      infiniteScroll.complete();
    }, 1000);
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
