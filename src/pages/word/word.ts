import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, ToastController } from 'ionic-angular';
import { DataService } from "../service/data-service";
import { ToolService } from "../service/tool-service";
import { TJoke } from "../../model/TJoke";


import { CommentPage } from "../comment/comment";
declare var Wechat: any;

@Component({
  selector: 'page-word',
  templateUrl: 'word.html'
})
export class WordPage implements OnInit {

  jokeList: TJoke[] = new Array<TJoke>();
  selectedJoke: TJoke;
  pageCount: number = 1; //已加载分页数量
  newestJokeId: number = 0; //上次加载的最新的jokeid
  constructor(public navCtrl: NavController, private dataService: DataService, private toolService: ToolService, public http: Http, public toastCtrl: ToastController) {

  }

  ngOnInit() {
    this.getMoreJokeData(0);
  }

  getMoreJokeData(categoryId: number) {
    var jokeData = { "userId": this.dataService.loginUser.id, "pageNo": this.pageCount, "type": 1, "size": 5 };
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
    var jokeData = { "userId": this.dataService.loginUser.id, "index": this.newestJokeId, "pageNo": 1, "type": 1, "size": 1000 };
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

  share(jokeItem: TJoke) {
    var jokePraiseData = { "userId": this.dataService.loginUser.id, "jokeId": jokeItem.id };
    Wechat.isInstalled(function (installed) {
      // Wechat.share({
      //   message: {
      //     title: jokeItem.title,
      //     description: jokeItem.content,
      //     // thumb: 'https://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/dmas/pic/item/fb22720e0cf3d7ca53daa5e3fa1fbe096b63a973.jpg',
      //     media: {
      //       type: Wechat.Type.LINK,
      //       // webpageUrl: 'http://www.cnblogs.com/yanxiaodi/p/6060123.html'
      //     }
      //   },
      //  scene: Wechat.Scene.SESSION   // share to SESSION
      // }, function () {
      //    alert('分享成功');
      // }, function (reason) {
      //   console.log("Failed: " + reason);
      // });

      // var scope = 'snsapi_userinfo',
      //   state = '_' + (+new Date());
      // Wechat.auth(scope, state, function (response) {
      //   // you may use response.code to get the access token.
      //   alert(JSON.stringify(response));
      // }, function (reason) {
      //   alert('Failed: ' + reason);
      // });


      Wechat.share({
        text: "分享的文字",
        scene: 0
      }, function () {
        alert("Success");
      }, function (reason) {
        alert("Failed: " + reason);
      });

    }, function (reason) {
      alert('无法启动微信');
    });
  }


  commentIt(jokeItem: TJoke) {
    this.navCtrl.push(CommentPage, { 'selectedJoke': jokeItem });
  }

  private requestHandleError(error: any): Promise<any> {
    this.presentToast(error.tip);
    return Promise.reject(error.tip || error);
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.getNewJokeData(refresher);
      // refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {

    setTimeout(() => {
      this.getMoreJokeData(0);
      infiniteScroll.complete();
    }, 1000);
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
