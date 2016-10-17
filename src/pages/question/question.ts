import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { KeywordData } from "../../model/keyword-data";
import { QuestionData } from "../../model/question-data";
import { QuestionItemData } from "../../model/questionitem-data";
import { DataService } from "../service/data-service";


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
    this.getQuestionData();
  }

  getQuestionData() {
    this.http.get('http://192.168.2.111:8080/lisi/app/getQuestion/' + this.dataService.loginUser.id + '/' + this.navParm.get("id")).toPromise()
      .then(response => {
        let result = response.json();
       if (result.response == 'success') {
          this.questionInfo = result.data;
        } else {
          this.questionInfo = new QuestionData();
          this.tips = "无法获取关键字数据：" + result.response;
        }
      })
      .catch(this.handleError);
  }



  // $scope.questionInfo = {};
  // $scope.answerRecord = {};

  submitAnswer () {
    if (null == this.answerItem) {
      this.tips = " 请先选择答案";
    } else {
      this.http.get('http://192.168.31.138:8080/lisi/app/answerQuestion/'+this.dataService.loginUser.id +'/' + this.questionInfo.id + '/' + this.answerItem).toPromise()
      .then(response => {
        let result = response.json();
       if (result.response == 'success') {
          // $state.go("tab.question-result", { questionId: $scope.questionInfo.id, result: data.result });//跳转到结果页
        } else {
          this.questionInfo = new QuestionData();
          this.tips = "答题失败：" + result.response;
        }
      })
      .catch(this.handleError);
  };
  }

  private handleError(error: any): Promise<any> {
    this.tips = "无法获取数据,出现异常：" + error.response;
    return Promise.reject(error.response || error);
  }

}
