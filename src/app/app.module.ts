
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { PicturePage } from '../pages/picture/picture';
import { NoticePage } from '../pages/notice/notice';
import { VideoHomePage } from '../pages/videohome/videohome';
import { PictureHomePage } from '../pages/picturehome/picturehome';
import { WordPage } from '../pages/word/word';
import { CommentPage } from '../pages/comment/comment';
import { QuestionPage } from '../pages/question/question';
import { VideoPage } from '../pages/video/video';
import { RegisterPage } from '../pages/register/register';
import { TabsPage } from '../pages/tabs/tabs';
import { DataService } from '../pages/service/data-service';
import { ToolService } from "../pages/service/tool-service";


@NgModule({
  declarations: [
    MyApp,
    WordPage,
    NoticePage,
    VideoHomePage,
    PicturePage,
    PictureHomePage,
    CommentPage,
    RegisterPage,
    QuestionPage,
    VideoPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),FormsModule,HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WordPage,
    NoticePage,
    VideoHomePage,
    PicturePage,
    PictureHomePage,
    CommentPage,
    QuestionPage,
    VideoPage,
    RegisterPage,
    TabsPage
  ],
  providers: [DataService,ToolService]
})
export class AppModule {}
