import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { PersonsListComponent } from "./persons-list/persons-list.component";
import { HttpClientModule } from "@angular/common/http";
import { AmplifyAngularModule, AmplifyService } from "aws-amplify-angular";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { PersonEditComponent } from "./person-edit/person-edit.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule,MatProgressSpinnerModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PersonAddComponent } from "./person-add/person-add.component";
import { AuthComponent } from "./services/auth/auth.component";
import { LoaderComponent } from "./services/loader/loader.component";
import { CountryCodeSelectComponent } from "./services/auth/country-code-select/country-code-select.component";
import { FilterPipe } from "./services/auth/country-code-select/filter.pipe";
import { SignInComponent } from "./services/auth/sign-in/sign-in.component";
import { SignUpComponent } from "./services/auth/sign-up/sign-up.component";
import { ConfirmCodeComponent } from "./services/auth/confirm-code/confirm-code.component";
import { ProfileComponent } from "./services/auth/profile/profile.component";
import { AvatarComponent } from "./services/auth/profile/avatar/avatar.component";
import { UnauthGuard } from './auth/auth/unauth.guard';
import { AuthGuard } from './auth/auth/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import {MatListModule} from '@angular/material/list';
import { AuthService } from './auth/auth/auth.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatDialogModule} from '@angular/material/dialog';
import { Analytics } from 'aws-amplify'

Analytics.configure({ disabled: true })


const appRoutes: Routes = [
  {
     path: 'auth', component: AuthComponent, children: 
  [    
    {      
      path: 'signin',      
      component: SignInComponent,      
      canActivate: [UnauthGuard]    
   },    
   {      
      path: 'signup',
      component: SignUpComponent,
      canActivate: [UnauthGuard]    
   },    
   {
      path: 'confirm',
      component: ConfirmCodeComponent,
      canActivate: [UnauthGuard]    
   },    
   {
      path: 'profile',
      component: ProfileComponent,
      canActivate: [AuthGuard]
   }  ,
  {
    path: "persons",
    component: PersonsListComponent,
    data: { title: "Persons List" },
  },
  {
    path: "persons/create",
    component: PersonAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "persons/update",
    component: PersonEditComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: "", 
    redirectTo: "/", 
    pathMatch: "full",
    canActivate: [AuthGuard]
   }]
  // { path: '**', component: PageNotFoundComponent }
}];

@NgModule({
  declarations: [
    AppComponent,
    PersonsListComponent,
    PersonEditComponent,
    PersonAddComponent,
    AuthComponent,
    LoaderComponent,
    CountryCodeSelectComponent,
    FilterPipe,
    SignInComponent,
    SignUpComponent,
    ConfirmCodeComponent,
    ProfileComponent,
    AvatarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatListModule,
    //RouterModule.forRoot(appRoutes, { enableTracing: true }), // <-- debugging purposes only
    AmplifyAngularModule,
    MatTableModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSnackBarModule ,
    MatBottomSheetModule,
    MatDialogModule
  ],
 // providers: [AmplifyService],
 providers: [AuthService],
 bootstrap: [AppComponent],
  entryComponents: [CountryCodeSelectComponent, LoaderComponent]
})
export class AppModule {}
