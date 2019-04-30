import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PersonsListComponent } from './persons-list/persons-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';

const appRoutes: Routes = [
  {
    path: 'persons',
    component: PersonsListComponent,
    data: { title: 'Persons List' }
  },
  { path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
 // { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    PersonsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }), // <-- debugging purposes only
    AmplifyAngularModule,
    MatTableModule,
    MatIconModule
    ],

  providers: [ AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
