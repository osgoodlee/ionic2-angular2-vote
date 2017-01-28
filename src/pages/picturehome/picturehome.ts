import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, App } from 'ionic-angular';
import { DataService } from "../service/data-service";
import { TJokeCategory } from "../../model/TJokeCategory";
import { PicturePage } from "../picture/picture";


@Component({
  selector: 'page-picturehome',
  templateUrl: 'picturehome.html'
})
export class PictureHomePage implements OnInit {

  jokeCategoryList: TJokeCategory[] = new Array<TJokeCategory>();
  tips: string;

  constructor(public navCtrl: NavController, private dataService: DataService, public http: Http, private app: App) {

  }

  ngOnInit() {
    // let tmp1 = new TJokeCategory();
    // tmp1.id = 1;
    // tmp1.name = '美女动态图';
    // tmp1.thumb = 'http://img4.imgtn.bdimg.com/it/u=262044375,3714853663&fm=21&gp=0.jpg';
    // tmp1.type = 1;
    // let tmp2 = new TJokeCategory();
    // tmp2.id = 2;
    // tmp2.name = '美腿';
    // tmp2.thumb = 'http://i3.shouyou.itc.cn/2014/news/2014/06/04/z2.jpg';
    // tmp2.type = 2;
    // this.jokeCategoryList.push(tmp1);
    // this.jokeCategoryList.push(tmp2);
    this.getPictureTypeData();
  }

  getPictureTypeData() {
    this.http.get('http://192.168.31.212:8080/lisi/joke/getJokeCategoryList/2').toPromise()
      .then(response => {
        let result = response.json();
        if (result.status == 'success') {
          this.jokeCategoryList = result.data;
        } else {
          if (null != result.tip) {
            this.tips = "无法获取分类数据：" + result.tip;
          }
        }
      })
      .catch(this.requestHandleError);
  }

  // browser(keyword: KeywordData) {
  //   this.navCtrl.push(QuestionPage, { 'keywordid': keyword.id });
  // }
  browser(selectedItem: TJokeCategory) {
    this.navCtrl.push(PicturePage, { 'selectedJokeCategory': selectedItem });
  }

  private requestHandleError(error: any): Promise<any> {
    this.tips = "无法获取分类数据，出现异常：" + error.tip;
    return Promise.reject(error.tip || error);
  }
}
