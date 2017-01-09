import { Component } from '@angular/core';

import { PictureHomePage } from '../picturehome/picturehome';
import { WordPage } from '../word/word';
import { ContactPage } from '../contact/contact';
import { ExtractPage } from '../extract/extract';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = WordPage;
  tab2Root: any = PictureHomePage;
  tab3Root: any = ExtractPage;
  tab4Root: any = ContactPage;

  constructor() {

  }
}
