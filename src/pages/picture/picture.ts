import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, App, NavParams } from 'ionic-angular';
import { TJokeCategory } from "../../model/TJokeCategory";
import { TJoke } from "../../model/TJoke";
import { DataService } from "../service/data-service";
import { CommentPage } from "../comment/comment";


@Component({
  selector: 'page-picture',
  templateUrl: 'picture.html'
})
export class PicturePage implements OnInit {
  tips: string;
  pageCount: number = 1; //已加载分页数量
  refreshTime: Date = new Date(); //刷新时间
  initialTime: Date = new Date(); //初始加载时间
  selectedJokeCategory: TJokeCategory;
  selectedJoke: TJoke;
  jokeList: TJoke[] = new Array<TJoke>();

  constructor(public navCtrl: NavController, private dataService: DataService, private app: App, private navParm: NavParams, public http: Http) {

  }

  ngOnInit() {
    this.selectedJokeCategory = this.navParm.get('selectedJokeCategory');
    this.getMoreJokeData(this.selectedJokeCategory.id);
  }

  getMoreJokeData(categoryId: number) {
    var jokeData = { "userId": 1, "pageNo": this.pageCount, "type": 2, "categoryId": categoryId, "size": 5 };
    this.http.post(this.dataService.serverURL + 'joke/getJokeList', jokeData).toPromise()
      .then(response => {
        let result = response.json();
        if (result.status == 'success') {
          for (let entry of result.data) {
            this.jokeList.push(entry);
          }
          this.pageCount++;
        } else {
          if (null != result.tip) {
            this.tips = "无法获取段子数据：" + result.tip;
          }
        }
      })
      .catch(this.requestHandleError);
  }

  likeIt(jokeItem: TJoke) {
    this.selectedJoke = jokeItem;
    var jokePraiseData = { "userId": 1, "jokeId": jokeItem.id };
    this.http.post(this.dataService.serverURL + 'joke/saveJokePraise', jokePraiseData).toPromise()
      .then(response => {
        let result = response.json();
        if (result == 'success') {
          this.selectedJoke.praiseNum++;
        } else {
          if (null != result.tip) {
             alert(this.tips);
          }
        }
      })
      .catch(this.requestHandleError);
  }
  
  commentIt(jokeItem: TJoke) {
      this.navCtrl.push(CommentPage, { 'selectedJoke': jokeItem });
  }

  getNewJokeData() {

  }


  doRefresh(refresher) {
    setTimeout(() => {
      // for (var i = this.jokeList.length; i > 0; i--) {
      //   this.jokeList.pop();
      // }
      let jokeListTmp: TJoke[] = new Array<TJoke>();
      let tmp5 = new TJoke();
      tmp5.id = 2;
      tmp5.name = '威武的雄狮：';
      tmp5.content = '<p><img src="http://image5.tuku.cn/pic/wallpaper/dongwu/xongshikuanpingbizhi/007.jpg"/></p>';
      jokeListTmp.push(tmp5);

      this.jokeList = jokeListTmp.concat(this.jokeList);
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {

    setTimeout(() => {
      this.getMoreJokeData(this.selectedJokeCategory.id);
      infiniteScroll.complete();
    }, 1000);
  }

  private requestHandleError(error: any): Promise<any> {
    this.tips = "无法获取分类数据，出现异常：" + error.tip;
    return Promise.reject(error.tip || error);
  }
}
