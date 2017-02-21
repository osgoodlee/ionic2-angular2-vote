import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, App, NavParams, ToastController } from 'ionic-angular';
import { TJokeCategory } from "../../model/TJokeCategory";
import { TJoke } from "../../model/TJoke";
import { DataService } from "../service/data-service";
import { ToolService } from "../service/tool-service";
import { CommentPage } from "../comment/comment";


@Component({
  selector: 'page-picture',
  templateUrl: 'picture.html'
})
export class PicturePage implements OnInit {
  pageCount: number = 1; //已加载分页数量
  newestJokeId: number = 0; //上次加载的最新的jokeid
  selectedJokeCategory: TJokeCategory;
  selectedJoke: TJoke;
  jokeList: TJoke[] = new Array<TJoke>();

  constructor(public navCtrl: NavController, private dataService: DataService, private toolService: ToolService, private app: App, private navParm: NavParams, public http: Http, public toastCtrl: ToastController) {

  }

  ngOnInit() {
    this.selectedJokeCategory = this.navParm.get('selectedJokeCategory');
    this.getMoreJokeData(this.selectedJokeCategory.id);
  }

  getMoreJokeData(categoryId: number) {
    var jokeData = { "userId": this.dataService.loginUser.id, "pageNo": this.pageCount, "type": 2, "categoryId": categoryId, "size": 5 };
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

  likeIt(jokeItem: TJoke) {
    this.selectedJoke = jokeItem;
    var jokePraiseData = { "userId": this.dataService.loginUser.id, "jokeId": jokeItem.id };
    this.http.post(this.dataService.serverURL + 'joke/saveJokePraise', jokePraiseData).toPromise()
      .then(response => {
        let result = response.json();
        if (result == 'success') {
          this.selectedJoke.praiseNum++;
        } else {
          if (null != result.tip) {
            this.presentToast(result.tip);
          }
        }
      })
      .catch(this.requestHandleError);
  }

  commentIt(jokeItem: TJoke) {
    this.navCtrl.push(CommentPage, { 'selectedJoke': jokeItem });
  }

  getNewJokeData(refresher) {
    var jokeData = { "userId": this.dataService.loginUser.id, "index": this.newestJokeId, "pageNo": 1, "type": 2, "categoryId": this.selectedJokeCategory.id, "size": 1000 };
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


  doRefresh(refresher) {
    setTimeout(() => {
      this.getNewJokeData(refresher);
      // refresher.complete();
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
