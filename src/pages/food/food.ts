import { Component,OnInit } from '@angular/core';
import { Http} from '@angular/http';

import { NavController,App} from 'ionic-angular';
import { DataService } from "../service/data-service";
import { KeywordData } from "../../model/keyword-data";
import { FoodViewPage } from "../foodview/foodview";


@Component({
  selector: 'page-home',
  templateUrl: 'food.html'
})
export class FoodPage implements OnInit {

  keywordList: KeywordData[];
  tips:string;
  constructor(public navCtrl: NavController, private dataService: DataService, public http: Http, private app: App) {

  }

  ngOnInit() {
    // this.getKeywordData();
  }

  getKeywordData() {
    this.http.post('http://120.76.200.75/lisi/admin/setting/getKeywordAll', null).toPromise()
      .then(response => {
        let result = response.json();
        if (result.status == 'success') {
          if (result.sucflag == true) {
            this.keywordList = result.rows;
          } else {
            this.tips = "无法获取关键字数据：" + result.tip;
          }
        } else {
          this.tips = "无法获取关键字数据：" + result.tip;
        }
      })
      .catch(this.loginHandleError);
  }

  seeDetail(keyword: string) {
    this.navCtrl.push(FoodViewPage, { 'keywordid': keyword });
  }

  private loginHandleError(error: any): Promise<any> {
    this.tips = "无法获取关键字数据，出现异常：" + error.tip;
    return Promise.reject(error.tip || error);
  }
}
