import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, App, NavParams } from 'ionic-angular';
import { UserData } from "../../model/user-data";
import { TJokeCategory } from "../../model/TJokeCategory";
import { TJoke } from "../../model/TJoke";
import { DataService } from "../service/data-service";

@Component({
  selector: 'page-video',
  templateUrl: 'video.html'
})
export class VideoPage implements OnInit {

  user: UserData;
  tips: string;
  dataCount : number = 0; //已加载数据数量
  refreshTime : Date = new Date(); //刷新时间
  initialTime : Date = new Date(); //初始加载时间
  selectedJokeCategory: TJokeCategory;
  jokeList: TJoke[] = new Array<TJoke>();

  constructor(public navCtrl: NavController, private dataService: DataService, private app: App, private navParm: NavParams, public http: Http) {

  }

  ngOnInit() {
      this.selectedJokeCategory = this.navParm.get('selectedJokeCategory');
    let tmp1 = new TJoke();
    tmp1.id = 1;
    tmp1.name = '酷炫视频：';
    tmp1.content = 'http://gslb.miaopai.com/stream/DaxxO1bqeGlE4D7-EwOjZA__.mp4';
    let tmp2 = new TJoke();
    tmp2.id = 2;
    tmp2.name = '酷炫视频：';
    tmp2.content = 'http://gslb.miaopai.com/stream/DaxxO1bqeGlE4D7-EwOjZA__.mp4';
    let tmp3 = new TJoke();
    tmp3.id = 3;
    tmp3.name = '非洲二哥：';
    tmp3.content = 'http://gslb.miaopai.com/stream/DaxxO1bqeGlE4D7-EwOjZA__.mp4';
    this.jokeList.push(tmp1);
    this.jokeList.push(tmp2);
    this.jokeList.push(tmp3);
    // this.getMetaData();
  }

  getMetaData() {
    this.http.get('http://120.76.200.75/lisi/app/getMetaData/1').toPromise()
      .then(response => {
        let result = response.json();
        if (result.status == 'success') {
        } else {
          this.tips = "无法获取元数据：" + result.tip;
        }
      })
      .catch(this.loginHandleError);
  }


  private loginHandleError(error: any): Promise<any> {
    this.tips = "无法获取元数据：，出现异常：" + error.tip;
    return Promise.reject(error.tip || error);
  }
}
