import { Component,OnInit } from '@angular/core';
import { Http} from '@angular/http';

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
    this.http.post('http://localhost:8080/lisi/admin/setting/getKeywordAll', null).toPromise()
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

  beginAnswer(keyword: KeywordData) {
    this.navCtrl.push(QuestionPage, { 'keywordid': keyword.id });
  }

  private loginHandleError(error: any): Promise<any> {
    this.tips = "无法获取关键字数据，出现异常：" + error.tip;
    return Promise.reject(error.tip || error);
  }
}
