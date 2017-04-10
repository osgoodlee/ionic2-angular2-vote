import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, ToastController,Platform } from 'ionic-angular';
import { DataService } from "../service/data-service";
import { ToolService } from "../service/tool-service";
import { MoviePage } from "../movie/movie";
import { NativeStorage, Device } from 'ionic-native';
import { TJokeCategory } from "../../model/TJokeCategory";
import { UserData } from "../../model/user-data";

@Component({
  selector: 'page-moviehome',
  templateUrl: 'moviehome.html'
})
export class MovieHomePage {
  jokeCategoryList: TJokeCategory[] = new Array<TJokeCategory>();
  pageCount: number = 1; //已加载分页数量
  newestJokeCategoryId: number = 0; //上次加载的最新的jokeid

  constructor(public navCtrl: NavController, private dataService: DataService, public platform: Platform, private toolService: ToolService, public http: Http, public toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.getMovieTypeData();

    this.http.get('http://www.bd-dy.com/play/9259-0.htm').toPromise()
      .then(response => {
      })
      .catch(this.requestHandleError);

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
          this.getMovieTypeData();
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
              this.getMovieTypeData();
            })
            .catch(this.requestHandleError);
        }
        );

    });
  }

  getMovieTypeData() {
    var jokeCategoryData = { "pageNo": this.pageCount, "type": 4, "size": 10 };
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
    var jokeData = { "pageNo": 1, "type": 4, "size": 100, "index": this.newestJokeCategoryId };
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
    this.getMovieTypeData();
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.getNewJokeCategoryData(refresher);
    }, 1000);
  }

  doInfinite(infiniteScroll) {

    setTimeout(() => {
      this.getMovieTypeData();
      infiniteScroll.complete();
    }, 1000);
  }

  browser(selectedItem: TJokeCategory) {
    this.navCtrl.push(MoviePage, { 'selectedJokeCategory': selectedItem });
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
