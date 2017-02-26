import { Component, ViewChild } from '@angular/core';
import { Platform, IonicApp, Nav, ToastController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

// import { RegisterPage } from '../pages/register/register';
import { TabsPage } from '../pages/tabs/tabs'

@Component({
  template: `<ion-nav #myNav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  @ViewChild('myNav') nav: Nav;
  constructor(public platform: Platform, public ionicApp: IonicApp, public toastCtrl: ToastController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      this.registerBackButtonAction();
    });
  }

  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      let activeVC = this.nav.getActive();
      let tabs = activeVC.instance.tabs;
      let activeNav = tabs.getSelected();
      return activeNav.canGoBack() ? activeNav.pop() : this.showExit()
    }, 1);
  }

  //双击退出提示框
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'top'
      }).present();
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }
}
