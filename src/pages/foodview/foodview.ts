import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from "../service/data-service";
import { QuestionPage } from "../question/question";
import { QuestionData } from "../../model/question-data";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-foodview',
  templateUrl: 'foodview.html'
})
export class FoodViewPage {
  questionInfo: QuestionData;
  answerResult: boolean;
  // tips: string;

  constructor(public navCtrl: NavController, private dataService: DataService, private navParm: NavParams) {
  }

  ngOnInit() {
    this.questionInfo = this.navParm.get('question');
    this.answerResult = this.navParm.get('result');
  }

  goNext() {
    this.navCtrl.push(QuestionPage, { 'keywordid': this.questionInfo.keywordid });//跳转到答题页
  };

   goHome() {
   this.navCtrl.push(HomePage);
  }

}
