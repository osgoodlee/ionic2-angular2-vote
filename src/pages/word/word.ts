import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, App } from 'ionic-angular';
import { DataService } from "../service/data-service";
import { TJoke } from "../../model/TJoke";
import { FoodViewPage } from "../foodview/foodview";


@Component({
  selector: 'page-word',
  templateUrl: 'word.html'
})
export class WordPage implements OnInit {

  jokeList: TJoke[] = new Array<TJoke>();
  tips: string;
  constructor(public navCtrl: NavController, private dataService: DataService, public http: Http, private app: App) {

  }

  ngOnInit() {
    // this.getTJokeData();
    let tmp1 = new TJoke();
    tmp1.id = 1;
    tmp1.name = '洛克菲勒：';
    tmp1.content = '<p>I was early taught to work as well as play, My life has been one long, happy holiday; Full of work and full of play- I	dropped the worry on the way- And God was good to me everyday.</p>';
    let tmp2 = new TJoke();
    tmp2.id = 1;
    tmp2.name = '我不自觉捂紧了口袋里的钱包……：';
    tmp2.content = '<p>公交车上，上来一美女，那么多空位置，她却偏偏坐在了我旁边，辣麽近距离的坐着。脸微微一红，心里头像一万头小鹿在撞……然后…我不自觉捂紧了口袋里的钱包…….</p>';
    let tmp3 = new TJoke();
    tmp3.id = 1;
    tmp3.name = '又把鸡腿炸糊了：';
    tmp3.content = '<p>哥嫂出差，昨晚我带着十岁的侄儿去上补习班，出门前我妈答应侄儿，给他炸鸡腿做宵夜，并让我们回来前打个电话，好乘热吃。 当我们回来后，见到刚出锅，热气腾腾的面条时，侄儿摇了摇头，开口说道：看来奶奶又把鸡腿炸糊了！</p>';
    let tmp4 = new TJoke();
    tmp4.id = 1;
    tmp4.name = '我咋感觉自己被调戏了。。。。。。';
    tmp4.content = '<p>初一地理考试，有道考题是“非洲贫穷落后的根本原因是什么?” 大部分学生回答的都不错，突然看见一张试卷上写着“胸不发达”～～ 然后我找到这个学生做思想工作，他憋的满面通红的给我说，“老师，不好意思啊，我眼花写错了......” “我本来想写 脑不发达 的......” 嚓，我咋感觉自己被调戏了.......</p>';
    let tmp5 = new TJoke();
    tmp5.id = 1;
    tmp5.name = '发现我家多了一件种小麦用的木耧：';
    tmp5.content = '<p>小时候，爸爸要去镇上买楼，可把我高兴坏了!在那个漫长等待的上午，我已无心学习，在学校里，逢人便于他分享我的喜悦，同学们都投来羡慕的目光。 中午，当放学铃声刚响起，我便飞奔回家，发现我家多了一件种小麦用的木耧.</p>';

    this.jokeList.push(tmp1);
    this.jokeList.push(tmp2);
    this.jokeList.push(tmp3);
    this.jokeList.push(tmp4);
    this.jokeList.push(tmp5);
  }

  getTJokeData() {
    this.http.post('http://120.76.200.75/lisi/admin/setting/getKeywordAll', null).toPromise()
      .then(response => {
        let result = response.json();
        if (result.status == 'success') {
          if (result.sucflag == true) {
            for (let row of result.rows) {
              this.jokeList.push(row);
            }
          } else {
            this.tips = "无法获取类型数据：" + result.tip;
          }
        } else {
          this.tips = "无法获取类型数据：" + result.tip;
        }
      })
      .catch(this.requestHandleError);
  }

  seeDetail(keyword: string) {
    this.navCtrl.push(FoodViewPage, { 'keywordid': keyword });
  }

  private requestHandleError(error: any): Promise<any> {
    this.tips = "无法获取类型数据：" + error.tip;
    return Promise.reject(error.tip || error);
  }

  doRefresh(refresher) {
    setTimeout(() => {
      // for (var i = this.jokeList.length; i > 0; i--) {
      //   this.jokeList.pop();
      // }
      let jokeListTmp: TJoke[] = new Array<TJoke>();
      let tmp5 = new TJoke();
      tmp5.id = 1;
      tmp5.name = '发现我家多了一件种小麦用的木耧：';
      tmp5.content = '<p>小时候，爸爸要去镇上买楼，可把我高兴坏了!在那个漫长等待的上午，我已无心学习，在学校里，逢人便于他分享我的喜悦，同学们都投来羡慕的目光。 中午，当放学铃声刚响起，我便飞奔回家，发现我家多了一件种小麦用的木耧.</p>';
      jokeListTmp.push(tmp5);

      this.jokeList = jokeListTmp.concat(this.jokeList);
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {

    setTimeout(() => {
      this.getMore();

      infiniteScroll.complete();
    }, 500);
  }

  getMore() {
    // getKeywordData();
    let tmp1 = new TJoke();
    tmp1.id = 1;
    tmp1.name = '洛克菲勒：';
    tmp1.content = '<p>I was early taught to work as well as play, My life has been one long, happy holiday; Full of work and full of play- I	dropped the worry on the way- And God was good to me everyday.</p>';
    let tmp2 = new TJoke();
    tmp2.id = 1;
    tmp2.name = '我不自觉捂紧了口袋里的钱包……：';
    tmp2.content = '<p>公交车上，上来一美女，那么多空位置，她却偏偏坐在了我旁边，辣麽近距离的坐着。脸微微一红，心里头像一万头小鹿在撞……然后…我不自觉捂紧了口袋里的钱包…….</p>';
    let tmp3 = new TJoke();
    tmp3.id = 1;
    tmp3.name = '又把鸡腿炸糊了：';
    tmp3.content = '<p>哥嫂出差，昨晚我带着十岁的侄儿去上补习班，出门前我妈答应侄儿，给他炸鸡腿做宵夜，并让我们回来前打个电话，好乘热吃。 当我们回来后，见到刚出锅，热气腾腾的面条时，侄儿摇了摇头，开口说道：看来奶奶又把鸡腿炸糊了！</p>';
    let tmp4 = new TJoke();
    tmp4.id = 1;
    tmp4.name = '我咋感觉自己被调戏了。。。。。。';
    tmp4.content = '<p>初一地理考试，有道考题是“非洲贫穷落后的根本原因是什么?” 大部分学生回答的都不错，突然看见一张试卷上写着“胸不发达”～～ 然后我找到这个学生做思想工作，他憋的满面通红的给我说，“老师，不好意思啊，我眼花写错了......” “我本来想写 脑不发达 的......” 嚓，我咋感觉自己被调戏了.......</p>';
    let tmp5 = new TJoke();
    tmp5.id = 1;
    tmp5.name = '发现我家多了一件种小麦用的木耧：';
    tmp5.content = '<p>小时候，爸爸要去镇上买楼，可把我高兴坏了!在那个漫长等待的上午，我已无心学习，在学校里，逢人便于他分享我的喜悦，同学们都投来羡慕的目光。 中午，当放学铃声刚响起，我便飞奔回家，发现我家多了一件种小麦用的木耧.</p>';

    this.jokeList.push(tmp1);
    this.jokeList.push(tmp2);
    this.jokeList.push(tmp3);
    this.jokeList.push(tmp4);
    this.jokeList.push(tmp5);
  }
}
