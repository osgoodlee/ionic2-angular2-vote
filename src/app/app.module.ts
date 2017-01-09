
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { PicturePage } from '../pages/picture/picture';
import { ContactPage } from '../pages/contact/contact';
import { ExtractPage } from '../pages/extract/extract';
import { PictureHomePage } from '../pages/picturehome/picturehome';
import { WordPage } from '../pages/word/word';
import { FoodViewPage } from '../pages/foodview/foodview';
import { QuestionPage } from '../pages/question/question';
import { ResultPage } from '../pages/result/result';
import { RegisterPage } from '../pages/register/register';
import { TabsPage } from '../pages/tabs/tabs';
import { DataService } from '../pages/service/data-service';


@NgModule({
  declarations: [
    MyApp,
    WordPage,
    ContactPage,
    ExtractPage,
    PicturePage,
    PictureHomePage,
    FoodViewPage,
    RegisterPage,
    QuestionPage,
    ResultPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),FormsModule,HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WordPage,
    ContactPage,
    ExtractPage,
    PicturePage,
    PictureHomePage,
    FoodViewPage,
    QuestionPage,
    ResultPage,
    RegisterPage,
    TabsPage
  ],
  providers: [DataService]
})
export class AppModule {}
