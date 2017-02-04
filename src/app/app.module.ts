import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {SearchPage} from "../pages/search/search";
import {AddNewPage} from "../pages/add-new/add-new";
import {HttpModule} from "@angular/http";
import {IntrstingService} from "./service/intrsting.service";
import {IntrstingDetailPage} from "../pages/intrsting-detail/intrsting-detail";
import {NotEmptyValidator} from "./validator/NotEmptyValidator";
import {RequiredIfValidator} from "./validator/RequiredIfValidator";

@NgModule({
  declarations: [
    MyApp,
    SearchPage,
    AddNewPage,
    IntrstingDetailPage,
    NotEmptyValidator,
    RequiredIfValidator
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    AddNewPage,
    IntrstingDetailPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, HttpModule, IntrstingService]
})
export class AppModule {}
