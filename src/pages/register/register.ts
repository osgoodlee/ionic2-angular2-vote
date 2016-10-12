import {Component,OnInit,Injectable} from '@angular/core';
import {Headers,Http,Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {NavController} from 'ionic-angular';
import {DataService} from "../service/data-service";
import {UserData} from "../../model/user-data";


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage implements OnInit {
  textContent:string;
  showLogin:boolean = true;
  user:UserData = new UserData();
  constructor(public navCtrl:NavController, private dataService:DataService,public http: Http) {
    // hasLogin = psDibsData.islogin;
    //   $scope.islogin = true;
    //   $scope.userData = {};
    //   $scope.$on('$ionicView.enter', function() {
    //     $scope.loginTip = "";
    //     $scope.registerTip = "";
    //   });
    //   $scope.register = function () {
    //     var data = {"name":$scope.userData.userId,"password":$scope.userData.userPassword};
    //     $http({
    //       url:'http://192.168.31.138:8080/lisi/app/registerUser',
    //       method:"POST",
    //       data: data
    //     }).
    //     success(function(data, status, headers, config) {
    //       // this callback will be called asynchronously
    //       // when the response is available
    //       psDibsData.islogin = true;
    //       psDibsData.loginUser = data;
    //       $scope.registerTip = "注册成功";
    //       $state.go("tab.question");//跳转到登录页
    //     });
    //   };
    //   $scope.toRegister = function () {
    //     $scope.islogin = false;//显示注册内容
    //   };
    //   $scope.toLogin = function () {
    //     $scope.islogin = true;//显示登录内容
    //   };

  }
  ngOnInit() {
    this.textContent = this.dataService.transferResult;
  }

  login () {
    var data = {"name":this.user.name,"password":this.user.password};
    this.http.get('http://192.168.1.119:8080/lisi/app/login').toPromise()
      .then(response => response.json() as UserData).then(data=>{
        this.dataService.loginUser = data;

      })
      .catch(this.handleError).then();
    // this.http.post('http://192.168.1.119:8080/lisi/app/login',data).toPromise()
    //   .then(response => response.json().data as Hero[])
    //   .catch(this.handleError);

    //   .subscribe(response =>{
    //   this.dataService.loginUser = response.json();
    //   if (null != this.dataService.loginUser && null != this.dataService.loginUser.id) {
    //     this.showLogin = true;
    //     this.dataService.isLogin = true;
    //     let link = ['/detail', hero.id];
    //     this.router.navigate(link);
    //         //   $state.go("tab.question");//跳转到登录页
    //         // }else{
    //         //   $scope.loginTip = "登录失败:用户名或密码错误";
    //         // }
    // });


    // this.http.post('http://localhost:8080/lisi/app/login',data).subscribe(response => this.dataService.loginUser = response.json())
    // $http({
    //   url:,
    //   method:"POST",
    //   data: data
    // })
    //   .success(function (data) {
    //     // this callback will be called asynchronously
    //     // when the response is available
    //     if (null != data && null != data.id) {
    //       psDibsData.islogin = true;
    //       psDibsData.loginUser = data;
    //       $scope.hasLogin = true;
    //       $state.go("tab.question");//跳转到登录页
    //     }else{
    //       $scope.loginTip = "登录失败:用户名或密码错误";
    //     }
    //
    //   })
    //   .error(function (data) {
    //     //处理响应失败
    //     $scope.loginTip = "登录失败:"+data;
    //   });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
