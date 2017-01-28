import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { NavController } from 'ionic-angular';
import { DataService } from "../service/data-service";
import { VideoPage } from "../video/video";
import { TJokeCategory } from "../../model/TJokeCategory";

@Component({
  selector: 'page-videohome',
  templateUrl: 'videohome.html'
})
export class VideoHomePage {
  jokeCategoryList: TJokeCategory[] = new Array<TJokeCategory>();
  tips: string;

  constructor(public navCtrl: NavController, private dataService: DataService, public http: Http) {
  }

  ngOnInit() {
    let tmp1 = new TJokeCategory();
    tmp1.id = 1;
    tmp1.name = '搞笑视频';
    tmp1.thumb = 'http://img4.imgtn.bdimg.com/it/u=262044375,3714853663&fm=21&gp=0.jpg';
    tmp1.type = 1;
    let tmp2 = new TJokeCategory();
    tmp2.id = 2;
    tmp2.name = '极限运动';
    tmp2.thumb = 'http://i3.shouyou.itc.cn/2014/news/2014/06/04/z2.jpg';
    tmp2.type = 2;
    this.jokeCategoryList.push(tmp1);
    this.jokeCategoryList.push(tmp2);
    // this.getVideoTypeData();
  }

  getVideoTypeData() {
    this.http.post('http://120.76.200.75/lisi/admin/setting/getKeywordAll', null).toPromise()
      .then(response => {
        let result = response.json();
        if (result.status == 'success') {
          if (result.sucflag == true) {
            this.jokeCategoryList = result.rows;
          } else {
            this.tips = "无法获取分类数据：" + result.tip;
          }
        } else {
          this.tips = "无法获取分类数据：" + result.tip;
        }
      })
      .catch(this.requestHandleError);
  }

  browser(selectedItem: TJokeCategory) {
    this.navCtrl.push(VideoPage, { 'selectedJokeCategory': selectedItem });
  }

  private requestHandleError(error: any): Promise<any> {
    this.tips = "无法获取分类数据，出现异常：" + error.tip;
    return Promise.reject(error.tip || error);
  }

}
