import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http'; 
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { PersonenComponent } from './personen/personen.component';
import { MessagesComponent } from './messages/messages.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PersoonSearchComponent } from './persoon-search/persoon-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PersonenComponent,
    MessagesComponent,
    WelcomeComponent,
    PersoonSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    HttpClientModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
