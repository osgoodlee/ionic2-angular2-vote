import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, App, NavParams } from 'ionic-angular';
import { UserData } from "../../model/user-data";
import { TJokeCategory } from "../../model/TJokeCategory";
import { TJoke } from "../../model/TJoke";
import { DataService } from "../service/data-service";
import * as chart from 'chart.js'; // 导入chart.js


@Component({
  selector: 'page-video',
  templateUrl: 'video.html'
})
export class VideoPage implements OnInit {

  user: UserData;
  tips: string;
  dataCount: number = 0; //已加载数据数量
  refreshTime: Date = new Date(); //刷新时间
  initialTime: Date = new Date(); //初始加载时间
  selectedJokeCategory: TJokeCategory;
  jokeList: TJoke[] = new Array<TJoke>();

  constructor(public navCtrl: NavController, private dataService: DataService, private app: App, private navParm: NavParams, public http: Http) {
  }

  ionViewDidEnter() {
    var canvas = <HTMLCanvasElement>document.getElementById("myChart");
    var ctx = canvas.getContext("2d");  // 这里是关键, 不能写在constructor()中
    chart.Line(ctx, {
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  ngOnInit() {
    // this.ionViewDidEnter();
    this.selectedJokeCategory = this.navParm.get('selectedJokeCategory');
    let tmp1 = new TJoke();
    tmp1.id = 1;
    tmp1.name = '酷炫视频：';
    tmp1.content = 'http://gslb.miaopai.com/stream/rMVlnMVjYCu2Po-93jd2JA__.mp4';
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
