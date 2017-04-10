
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { PicturePage } from '../pages/picture/picture';
import { NoticePage } from '../pages/notice/notice';
import { VideoHomePage } from '../pages/videohome/videohome';
import { VideoPage } from '../pages/video/video';
import { VideoDetailPage } from '../pages/videodetail/videodetail';
import { PictureHomePage } from '../pages/picturehome/picturehome';
import { WordPage } from '../pages/word/word';
import { CommentPage } from '../pages/comment/comment';
import { QuestionPage } from '../pages/question/question';
import { MovieHomePage } from '../pages/moviehome/moviehome';
import { MoviePage } from '../pages/movie/movie';
import { MovieDetailPage } from '../pages/moviedetail/moviedetail';
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
    VideoPage,
    VideoDetailPage,
    PicturePage,
    PictureHomePage,
    MovieHomePage,
    MoviePage,
    MovieDetailPage,
    CommentPage,
    RegisterPage,
    QuestionPage,

    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp), FormsModule, HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WordPage,
    NoticePage,
    VideoHomePage,
    QuestionPage,
    VideoPage,
    VideoDetailPage,
    PicturePage,
    PictureHomePage,
    MovieHomePage,
    MoviePage,
    MovieDetailPage,
    CommentPage,

    RegisterPage,
    TabsPage
  ],
  providers: [DataService, ToolService]
})
export class AppModule { }
