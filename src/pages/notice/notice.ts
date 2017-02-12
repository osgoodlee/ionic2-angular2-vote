import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, ToastController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
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

  private requestHandleError(error: any): Promise<any> {
    this.tips = "无法获取公告数据，出现异常：" + error.tip;
    return Promise.reject(error.tip || error);
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
