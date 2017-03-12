import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler, Events} from 'ionic-angular';
import {MyApp} from './app.component';
import {SearchPage} from "../pages/search/search";
import {AddNewPage} from "../pages/add-new/add-new";
import {HttpModule} from "@angular/http";
import {IntrstingService} from "./service/intrsting.service";
import {IntrstingDetailPage} from "../pages/intrsting-detail/intrsting-detail";
import {NotEmptyValidator} from "./validator/NotEmptyValidator";
import {RequiredIfValidator} from "./validator/RequiredIfValidator";
import {IntrstingTypesComponent} from "./components/intrsting-types/intrsting-types.component";
import {ButtonInputToggleComponent} from "./components/button-input-toggle/button-input-toggle.component";
import {ReviewService} from "./service/review.service";
import {ReviewComponent} from "./components/review/review.component";
import {UserService} from "./service/user.service";
import {LoginPage} from "../pages/login/login";
import { Storage } from '@ionic/storage';
import {RegisterUserPage} from "../pages/register-user/register-user";
import {TagComponent} from "./components/tag/tag.component";
import {TagService} from "./service/tag.service";
import {TagSearchComponent} from "./components/tagsearch/tagsearch.component";
import {FavoriteService} from "./service/favorite.service";
import {TodoListPage} from "../pages/todo-list/todo-list";
import {WholePositiveNumberValidator} from "./validator/WholePositiveNumberValidator";
import {TaskService} from "./service/task.service";
import {TasknameSearchComponent} from "./components/tasknamesearch/tasknamesearch.component";

@NgModule({
  declarations: [
    MyApp,
    SearchPage,
    AddNewPage,
    IntrstingDetailPage,
    LoginPage,
    RegisterUserPage,
    TodoListPage,

    NotEmptyValidator,
    WholePositiveNumberValidator,
    RequiredIfValidator,

    IntrstingTypesComponent,
    ButtonInputToggleComponent,
    ReviewComponent,
    TagComponent,
    TagSearchComponent,
    TasknameSearchComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    AddNewPage,
    IntrstingDetailPage,
    LoginPage,
    RegisterUserPage,
    TagSearchComponent,
    TasknameSearchComponent,
    TodoListPage
  ],
  providers: [{
    provide: ErrorHandler,
    useClass: IonicErrorHandler
  },
    HttpModule,
    IntrstingService,
    ReviewService,
    UserService,
    TagService,
    FavoriteService,
    TaskService,
    Storage,
    Events
  ]
})
export class AppModule {
}
