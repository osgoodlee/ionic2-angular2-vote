import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, Platform, ToastController } from 'ionic-angular';
import { DataService } from "../service/data-service";
import { ToolService } from "../service/tool-service";
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
  newestJokeId: number = 0; //上次加载的最新的jokeid
  constructor(public navCtrl: NavController, private dataService: DataService, private toolService: ToolService, public http: Http, public platform: Platform, public toastCtrl: ToastController) {

  }

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
            //无法读取用户信息，设置为陌生人
            this.dataService.isLogin = true;
            this.dataService.loginUser = new UserData();
            this.dataService.loginUser.id = 0;
            this.dataService.loginUser.deviceCode = Device.uuid;
          }
          this.getMoreJokeData(0);
        },
        //第一次加载报error
        error => {
          this.http.get(this.dataService.serverURL + 'joke/register/' + Device.uuid).toPromise()
            .then(response => {
              let result = response.json();
              if (result.status == 'success') {
                this.dataService.isLogin = true;
                this.dataService.loginUser = new UserData();
                this.dataService.loginUser.id = result.data;
                this.dataService.loginUser.deviceCode = Device.uuid;
                NativeStorage.setItem('userinfo', { id: result.data, deviceCode: Device.uuid })
                  .then(
                  () => { },
                  error => this.presentToast('无法保存数据' + error)
                  );
              } else {
                //无法读取用户信息，设置为陌生人
                this.dataService.isLogin = true;
                this.dataService.loginUser = new UserData();
                this.dataService.loginUser.id = 0;
                this.dataService.loginUser.deviceCode = Device.uuid;
              }
              this.getMoreJokeData(0);
            })
            .catch(this.requestHandleError);
        }
        );
    });
  }

  getMoreJokeData(categoryId: number) {
    var jokeData = { "userId": this.dataService.loginUser.id, "pageNo": this.pageCount, "type": 1, "size": 10 };
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
