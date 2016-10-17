import { Component,OnInit } from '@angular/core';
import { Headers, Http} from '@angular/http';

import { NavController,App} from 'ionic-angular';
import { DataService } from "../service/data-service";
import { KeywordData } from "../../model/keyword-data";
import { QuestionPage } from "../question/question";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  keywordList: KeywordData[];
  tips:string;
  constructor(public navCtrl: NavController, private dataService: DataService, public http: Http, private app: App) {

  }

  ngOnInit() {
    this.getKeywordData();
  }

  getKeywordData() {
    this.http.post('http://192.168.2.111:8080/lisi/admin/setting/getKeywordAll', null).toPromise()
      .then(response => {
        let result = response.json();
        if (result.sucflag == true) {
          this.keywordList = result.rows;
        } else {
          this.tips = "无法获取关键字数据：" + result.response;
        }
      })
      .catch(this.loginHandleError);
  }

  beginAnswer(keyword: KeywordData) {
    this.navCtrl.push(QuestionPage,keyword);
  }

  private loginHandleError(error: any): Promise<any> {
    this.tips = "无法获取关键字数据，出现异常：" + error.response;
    return Promise.reject(error.response || error);
  }
}
