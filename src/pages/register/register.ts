import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { NavController } from 'ionic-angular';
import { DataService } from "../service/data-service";
import { UserData } from "../../model/user-data";
import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage implements OnInit {
  textContent: string;
  loginTip: string;
  registerTip: string = "";
  showLogin: boolean = true;
  user: UserData = new UserData();

  constructor(public navCtrl: NavController, private dataService: DataService, public http: Http) {
  }

  ngOnInit() {
  }

  login() {
    var userData = { "name": this.user.name, "password": this.user.password };
    this.http.post('http://localhost:8080/lisi/app/login', userData).toPromise()
      .then(response => {
        let result = response.json();
        if (result.status == 'success') {
          this.dataService.isLogin = true;
          this.dataService.loginUser = result.data;
          this.navCtrl.push(TabsPage);
        } else {
          this.loginTip = "登录失败：" + result.tip;
        }
      })
      .catch(this.loginHandleError);
  }

  //注册用户
  register() {
    var userData = { "name": this.user.name, "password": this.user.password };
    this.http.post('http://localhost:8080/lisi/app/registerUser', userData).toPromise()
      .then(response => {
        let result = response.json();
        if (result.status == 'success') {
          this.dataService.isLogin = true;
          this.dataService.loginUser = result.data;
          this.navCtrl.push(TabsPage);
        } else {
          this.registerTip = "注册失败：" + result.tip;
        }
      })
      .catch(this.registerHandleError);
  }

  //显示注册界面
  toRegister() {
    this.showLogin = false;//显示注册内容
  }

  //显示登录界面
  toLogin() {
    this.showLogin = true;//显示登录内容
  }

  private loginHandleError(error: any): Promise<any> {
    this.loginTip = "登录失败,出现异常：" + error.tip;
    return Promise.reject(error.tip || error);
  }

  private registerHandleError(error: any): Promise<any> {
    this.loginTip = "登录失败,出现异常：" + error.tip;
    return Promise.reject(error.tip || error);
  }
}
