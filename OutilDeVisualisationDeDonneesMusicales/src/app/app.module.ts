import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { DisplayTableComponent } from './display-table/display-table.component';
import { DisplayDetailsComponent } from './display-details/display-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    DisplayTableComponent,
    DisplayDetailsComponent
  ],
  imports: [
    BrowserModule, FormsModule, BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
