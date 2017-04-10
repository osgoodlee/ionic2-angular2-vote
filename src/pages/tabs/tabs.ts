import { Component, ViewChild } from '@angular/core';

import { PictureHomePage } from '../picturehome/picturehome';
import { WordPage } from '../word/word';
import { NoticePage } from '../notice/notice';
import { VideoHomePage } from '../videohome/videohome';
import { MovieHomePage } from '../moviehome/moviehome';

import { Tabs } from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  @ViewChild('mainTabs') tabs: Tabs;
  tab1Root: any = MovieHomePage;
  tab2Root: any = PictureHomePage;
  tab3Root: any = WordPage;
  tab4Root: any = VideoHomePage;

  constructor() {

  }
}
