import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { KeywordData } from "../../model/keyword-data";
import { QuestionData } from "../../model/question-data";
import { QuestionItemData } from "../../model/questionitem-data";
import { DataService } from "../service/data-service";
import {ResultPage} from "../result/result";


@Component({
  selector: 'page-question',
  templateUrl: 'question.html'
})
export class QuestionPage {
  keyword: KeywordData;
  tips: string;
  questionInfo: QuestionData;
  answerItem: number;

  constructor(public navCtrl: NavController, private dataService: DataService, private navParm: NavParams, public http: Http) {
    this.questionInfo = new QuestionData();
  }

  ngOnInit() {
    this.questionInfo = new QuestionData();
    this.getQuestionData();
  }

  getQuestionData() {
    
    this.http.get('http://114.215.169.187/lisi/app/getQuestion/' + this.dataService.loginUser.id + '/' + this.navParm.get('keywordid')).toPromise()
      .then(response => {
        let result = response.json();
        if (result.status == 'success') {
          this.questionInfo = result.data;
        } else {
          this.questionInfo = new QuestionData();
          this.tips = "无法获取关键字数据：" + result.tip;
        }
      })
      .catch(this.handleError);
  }

  submitAnswer() {
    if (null == this.answerItem) {
      this.tips = " 请先选择答案";
    } else {
      this.http.get('http://114.215.169.187/lisi/app/answerQuestion/' + this.dataService.loginUser.id + '/' + this.questionInfo.id + '/' + this.answerItem).toPromise()
        .then(response => {
          let result = response.json();
          if (result.status == 'success') {
            this.navCtrl.push(ResultPage, { question: this.questionInfo, result: result.data });
          } else {
            this.questionInfo = new QuestionData();
            this.tips = "无法回答：" + result.tip;
          }
        })
        .catch(this.handleError);
    };
  }

  private handleError(error: any): Promise<any> {
    this.tips = "无法获取数据,出现异常：" + error.tip;
    return Promise.reject(error.tip || error);
  }

}
