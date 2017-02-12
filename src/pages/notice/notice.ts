import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, ToastController } from 'ionic-angular';
import { DataService } from "../service/data-service";
import { TNotice } from "../../model/TNotice";

@Component({
  selector: 'page-notice',
  templateUrl: 'notice.html'
})
export class NoticePage implements OnInit {

  tips: string;
  pageCount: number = 1; //已加载分页数量
  noticeList: TNotice[] = new Array<TNotice>();
  newestNoticeId: number = 0; //上次加载的最新的jokeid

  constructor(private dataService: DataService, public navCtrl: NavController, public http: Http, public toastCtrl: ToastController) {

  }

  ngOnInit() {
    this.getMoreNoticeData();
  }

  getMoreNoticeData() {
    var noticeData = { "userId": this.dataService.loginUser.id, "pageNo": this.pageCount, "size": 10 };
    this.http.post(this.dataService.serverURL + 'joke/getNotice', noticeData).toPromise()
      .then(response => {
        let result = response.json();
        if (result.status == 'success') {
          for (let entry of result.data) {
            this.noticeList.push(entry);
          }
          this.pageCount++;
        } else {
          if (null != result.tip) {
            this.presentToast(result.tip);
          }
        }
      })
      .catch(this.requestHandleError);
  }

  getNewNoticeData(refresher) {
    var noticeData = { "userId": this.dataService.loginUser.id, "index": this.newestNoticeId, "pageNo": this.pageCount, "size": 1000 };
    this.http.post(this.dataService.serverURL + 'joke/getJokeList', noticeData).toPromise()
      .then(response => {
        let result = response.json();
        if (result.status == 'success') {
          let jokeListTmp: TNotice[] = new Array<TNotice>();
          for (let entry of result.data) {
            jokeListTmp.push(entry);
          }
          this.noticeList = jokeListTmp.concat(this.noticeList);
          if (this.noticeList.length > 0) {
            this.newestNoticeId = this.noticeList[0].id;
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

  private requestHandleError(error: any): Promise<any> {
    this.tips = "无法获取公告数据，出现异常：" + error.tip;
    return Promise.reject(error.tip || error);
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.getNewNoticeData(refresher);
      // refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {

    setTimeout(() => {
      this.getMoreNoticeData();
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

}
