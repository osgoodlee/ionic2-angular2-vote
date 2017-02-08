import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavParams, ToastController } from 'ionic-angular';
import { DataService } from "../service/data-service";
import { TComment } from "../../model/TComment";
import { TJoke } from "../../model/TJoke";
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html'
})
export class CommentPage {
  pageCount: number = 1; //已加载分页数量
  commentNum: number = 0; //评论总数
  commentList: TComment[] = new Array<TComment>();
  hotCommentList: TComment[] = new Array<TComment>();
  selectedJoke: TJoke;
  tips: string;
  displayHot: boolean;

  constructor(public alertCtrl: AlertController, private dataService: DataService, private navParm: NavParams, public http: Http, public toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.selectedJoke = this.navParm.get('selectedJoke');
    this.getMoreCommentData(this.selectedJoke.id);
  }

  getMoreCommentData(jokeId: number) {
    var commentData = { "jokeId": jokeId, "pageNo": this.pageCount, "size": 5 };
    this.http.post(this.dataService.serverURL + 'joke/getComments', commentData).toPromise()
      .then(response => {
        let result = response.json();
        if (result.status == 'success') {
          for (let entry of result.data.newData) {
            this.commentList.push(entry);
          }
          if (null != result.data.hotData && result.data.hotData.length > 0) {
            this.hotCommentList = result.data.hotData;
            this.displayHot = true;
          }
          this.commentNum = result.data.total;
          // for (let entry of result.hotData) {
          //   this.hotCommentList.push(entry);
          // }
          this.pageCount++;
        } else {
          if (null != result.tip) {
            this.tips = "无法获取评论数据：" + result.tip;
          }
        }
      })
      .catch(this.requestHandleError);
  }

  addComment() {
    let prompt = this.alertCtrl.create({
      title: '编写评论',
      inputs: [
        {
          name: 'content',
          placeholder: '请注意不要发布非法信息！'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
          }
        },
        {
          text: '发布',
          handler: data => {
            var commentData = { "jokeId": this.selectedJoke.id, "userId": this.dataService.loginUser.id, "content": data.content };
            this.http.post(this.dataService.serverURL + 'joke/saveComment', commentData).toPromise()
              .then(response => {
                let result = response.json();
                if (result.status == 'success') {
                  this.selectedJoke.commentNum++;
                  var tmpArray = new Array<TComment>();
                  tmpArray.push(result.data);
                  this.commentList = tmpArray.concat(this.commentList);
                } else {
                  if (null != result.tip) {
                    this.presentToast(result.tip);
                  }
                }
              })
              .catch(this.requestHandleError);
          }
        }
      ]
    });
    prompt.present();
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.getMoreCommentData(this.selectedJoke.id);
      infiniteScroll.complete();
    }, 1000);
  }

  private requestHandleError(error: any): Promise<any> {
    this.tips = "无法获取评论数据：" + error.tip;
    return Promise.reject(error.tip || error);
  }

  presentToast(info) {
    let toast = this.toastCtrl.create({
      message: info,
      duration: 2000
    });
    toast.present();
  }
}
