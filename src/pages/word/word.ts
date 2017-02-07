import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, App, Platform } from 'ionic-angular';
import { DataService } from "../service/data-service";
import { TJoke } from "../../model/TJoke";
import { UserData } from "../../model/user-data";
import { NativeStorage, Device } from 'ionic-native';
import { CommentPage } from "../comment/comment";

@Component({
  selector: 'page-word',
  templateUrl: 'word.html'
})
export class WordPage implements OnInit {

  jokeList: TJoke[] = new Array<TJoke>();
  selectedJoke: TJoke;
  pageCount: number = 1; //已加载分页数量
  tips: string;
  constructor(public navCtrl: NavController, private dataService: DataService, public http: Http, private app: App, public platform: Platform) {

  }

  // getGeographic() {
  //   Geolocation.getCurrentPosition().then((resp) => {
  //     alert('lat: ' + resp.coords.latitude + ', lon: ' + resp.coords.longitude);
  //   }).catch((error) => {
  //     alert('Error getting location' + error);
  //   });
  // }
  ngOnInit() {
    this.platform.ready().then(() => {
      NativeStorage.getItem('userinfo')
        .then(
        data => {
          if (data != null) {
            this.dataService.isLogin = true;
            this.dataService.loginUser = new UserData();
            this.dataService.loginUser.id = data.id;
            this.dataService.loginUser.deviceCode = data.deviceCode;
          } else {
            this.http.get(this.dataService.serverURL + 'joke/register/' + Device.uuid).toPromise()
              .then(response => {
                let result = response.json();
                if (result.status == 'success') {
                  this.dataService.loginUser = new UserData();
                  this.dataService.loginUser.id = result.data;
                  this.dataService.loginUser.deviceCode = Device.uuid;
                  NativeStorage.setItem('userinfo', { id: result.data, deviceCode: Device.uuid })
                    .then(
                    () => { this.tips = this.dataService.loginUser.id.toString(); },
                    error => alert('无法保存数据' + error)
                    );
                } else {
                  this.tips = "无法获取段子数据：" + result.tip;
                }
              })
              .catch(this.requestHandleError);
          }
        },
        error => {
          this.http.get(this.dataService.serverURL + 'joke/register/' + Device.uuid).toPromise()
            .then(response => {
              let result = response.json();
              if (result.status == 'success') {
                this.dataService.loginUser = new UserData();
                this.dataService.loginUser.id = result.data;
                this.dataService.loginUser.deviceCode = Device.uuid;
                NativeStorage.setItem('userinfo', { id: result.data, deviceCode: Device.uuid })
                  .then(
                  () => { this.tips = this.dataService.loginUser.id.toString(); },
                  error => alert('无法保存数据' + error)
                  );
              } else {
                this.tips = "无法获取段子数据：" + result.tip;
              }
            })
            .catch(this.requestHandleError);
        }
        );
    });

    this.getMoreJokeData(0);
  }

  getMoreJokeData(categoryId: number) {
    var jokeData = { "userId": 1, "pageNo": this.pageCount, "type": 1, "size": 5 };
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

  getNewJokeData() {

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
            alert(result.tip);
          }
        }
      })
      .catch(this.requestHandleError);
  }

  commentIt(jokeItem: TJoke) {
    this.navCtrl.push(CommentPage, { 'selectedJoke': jokeItem });
  }

  private requestHandleError(error: any): Promise<any> {
    this.tips = error.tip;
    return Promise.reject(error.tip || error);
  }

  doRefresh(refresher) {
    setTimeout(() => {
      let jokeListTmp: TJoke[] = new Array<TJoke>();
      let tmp5 = new TJoke();
      tmp5.id = 1;
      tmp5.name = '发现我家多了一件种小麦用的木耧：';
      tmp5.content = '<p>小时候，爸爸要去镇上买楼，可把我高兴坏了!在那个漫长等待的上午，我已无心学习，在学校里，逢人便于他分享我的喜悦，同学们都投来羡慕的目光。 中午，当放学铃声刚响起，我便飞奔回家，发现我家多了一件种小麦用的木耧.</p>';
      jokeListTmp.push(tmp5);

      this.jokeList = jokeListTmp.concat(this.jokeList);
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {

    setTimeout(() => {
      this.getMoreJokeData(0);
      infiniteScroll.complete();
    }, 1000);
  }

}
