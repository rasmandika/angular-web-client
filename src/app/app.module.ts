import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TransactionComponent } from './transaction/transaction.component';
import { MyMaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppService } from './_service/app.service';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientJsonpModule } from '@angular/common/http';
import { InterceptService } from './_service/intercept.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MyMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [
    AppService,
    // InterceptService,
    // {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: InterceptService,
    //     multi: true
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
