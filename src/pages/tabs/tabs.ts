import { Component } from '@angular/core';

import { PictureHomePage } from '../picturehome/picturehome';
import { WordPage } from '../word/word';
import { NoticePage } from '../notice/notice';
import { VideoHomePage } from '../videohome/videohome';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = WordPage;
  tab2Root: any = PictureHomePage;
  tab3Root: any = VideoHomePage;
  tab4Root: any = NoticePage;

  constructor() {

  }
}
