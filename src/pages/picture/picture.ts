import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { NavController, App, NavParams } from 'ionic-angular';
import { UserData } from "../../model/user-data";
import { TJokeCategory } from "../../model/TJokeCategory";
import { TJoke } from "../../model/TJoke";
import { DataService } from "../service/data-service";


@Component({
  selector: 'page-picture',
  templateUrl: 'picture.html'
})
export class PicturePage implements OnInit {
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
    tmp1.name = '女神周韦彤：';
    tmp1.content = '<p><img src="http://images.rednet.cn/articleimage/2011/03/27/1152215221.jpg"/></p>';
    let tmp2 = new TJoke();
    tmp2.id = 2;
    tmp2.name = '女神周韦彤：';
    tmp2.content = '<p><img src="http://i3.shouyou.itc.cn/2014/news/2014/06/04/z2.jpg"/></p>';
    let tmp3 = new TJoke();
    tmp3.id = 2;
    tmp3.name = '非洲二哥：';
    tmp3.content = '<p><img src="http://s11.sinaimg.cn/mw690/001M3Wnnzy6VsumwdRg3a"/></p>';
    let tmp4 = new TJoke();
    tmp4.id = 2;
    tmp4.name = '可爱的虎鲸：';
    tmp4.content = '<p><img src="http://images.forwallpaper.com/files/images/3/3c2f/3c2ff9c5/1039712/untitled-wallpaper.jpg"/></p>';
    let tmp5 = new TJoke();
    tmp5.id = 2;
    tmp5.name = '威武的雄狮：';
    tmp5.content = '<p><img src="http://image5.tuku.cn/pic/wallpaper/dongwu/xongshikuanpingbizhi/007.jpg"/></p>';
    let tmp6 = new TJoke();
    tmp6.id = 2;
    tmp6.name = '美女动态图：';
    tmp6.content = '<p><img src="http://img4.imgtn.bdimg.com/it/u=262044375,3714853663&fm=21&gp=0.jpg"/></p>';
    this.jokeList.push(tmp1);
    this.jokeList.push(tmp2);
    this.jokeList.push(tmp3);
    // this.jokeList.push(tmp4);
    this.jokeList.push(tmp5);
    this.jokeList.push(tmp6);
    // this.user = this.dataService.loginUser;
  }

  getMorePictureData() {
    this.http.post('http://120.76.200.75/lisi/admin/setting/getKeywordAll', null).toPromise()
      .then(response => {
        let result = response.json();
        if (result.status == 'success') {
          if (result.sucflag == true) {
            this.jokeList = result.rows;
          } else {
            this.tips = "无法获取分类数据：" + result.tip;
          }
        } else {
          this.tips = "无法获取分类数据：" + result.tip;
        }
      })
      .catch(this.requestHandleError);
  }

  getNewPictureData() {
  }


  doRefresh(refresher) {
    setTimeout(() => {
      // for (var i = this.jokeList.length; i > 0; i--) {
      //   this.jokeList.pop();
      // }
      let jokeListTmp: TJoke[] = new Array<TJoke>();
      let tmp5 = new TJoke();
      tmp5.id = 2;
      tmp5.name = '威武的雄狮：';
      tmp5.content = '<p><img src="http://image5.tuku.cn/pic/wallpaper/dongwu/xongshikuanpingbizhi/007.jpg"/></p>';
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
    let tmp1 = new TJoke();
    tmp1.id = 1;
    tmp1.name = '女神周韦彤：';
    tmp1.content = '<p><img src="http://images.rednet.cn/articleimage/2011/03/27/1152215221.jpg"/></p>';
    let tmp2 = new TJoke();
    tmp2.id = 2;
    tmp2.name = '女神周韦彤：';
    tmp2.content = '<p><img src="http://i3.shouyou.itc.cn/2014/news/2014/06/04/z2.jpg"/></p>';
    let tmp3 = new TJoke();
    tmp3.id = 2;
    tmp3.name = '非洲二哥：';
    tmp3.content = '<p><img src="http://s11.sinaimg.cn/mw690/001M3Wnnzy6VsumwdRg3a"/></p>';
    let tmp4 = new TJoke();
    tmp4.id = 2;
    tmp4.name = '可爱的虎鲸：';
    tmp4.content = '<p><img src="http://images.forwallpaper.com/files/images/3/3c2f/3c2ff9c5/1039712/untitled-wallpaper.jpg"/></p>';
    let tmp5 = new TJoke();
    tmp5.id = 2;
    tmp5.name = '威武的雄狮：';
    tmp5.content = '<p><img src="http://image5.tuku.cn/pic/wallpaper/dongwu/xongshikuanpingbizhi/007.jpg"/></p>';
    let tmp6 = new TJoke();
    tmp6.id = 2;
    tmp6.name = '美女动态图：';
    tmp6.content = '<p><img src="http://img4.imgtn.bdimg.com/it/u=262044375,3714853663&fm=21&gp=0.jpg"/></p>';
    this.jokeList.push(tmp1);
    this.jokeList.push(tmp2);
    this.jokeList.push(tmp3);
    // this.jokeList.push(tmp4);
    this.jokeList.push(tmp5);
    this.jokeList.push(tmp6);
  }

  private requestHandleError(error: any): Promise<any> {
    this.tips = "无法获取分类数据，出现异常：" + error.tip;
    return Promise.reject(error.tip || error);
  }
}
