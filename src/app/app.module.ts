
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { QuestionPage } from '../pages/question/question';
import { ResultPage } from '../pages/result/result';
import { RegisterPage } from '../pages/register/register';
import { TabsPage } from '../pages/tabs/tabs';
import { DataService } from '../pages/service/data-service';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
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
    AboutPage,
    ContactPage,
    HomePage,
    QuestionPage,
    ResultPage,
    RegisterPage,
    TabsPage
  ],
  providers: [DataService]
})
export class AppModule {}
