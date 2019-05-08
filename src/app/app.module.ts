import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { PersonsListComponent } from "./persons-list/persons-list.component";
import { HttpClientModule } from "@angular/common/http";
import { AmplifyAngularModule, AmplifyService } from "aws-amplify-angular";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import {MatCardModule} from '@angular/material/card';
import { PersonEditComponent } from "./person-edit/person-edit.component";
import { FormsModule } from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonAddComponent } from './person-add/person-add.component';

const appRoutes: Routes = [
  {
    path: "persons",
    component: PersonsListComponent,
    data: { title: "Persons List" }
  },
  {
path: "persons/create",
component:PersonAddComponent
  },
  {
    path: "persons/update",
    component: PersonEditComponent
  },
  { path: "", redirectTo: "/", pathMatch: "full" }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [AppComponent, PersonsListComponent, PersonEditComponent, PersonAddComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }), // <-- debugging purposes only
    AmplifyAngularModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,MatInputModule,BrowserAnimationsModule
  ],

  providers: [AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule {}
