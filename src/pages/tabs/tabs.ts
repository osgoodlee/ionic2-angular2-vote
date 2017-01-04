import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { FoodPage } from '../food/food';
import { AboutPage } from '../about/about';
import { ExtractPage } from '../extract/extract';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = FoodPage;
  tab2Root: any = AboutPage;
  tab3Root: any = ExtractPage;

  constructor() {

  }
}
