import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./services/auth/auth.component";
import { SignInComponent } from "./services/auth/sign-in/sign-in.component";
import { UnauthGuard } from "./auth/auth/unauth.guard";
import { SignUpComponent } from "./services/auth/sign-up/sign-up.component";
import { ConfirmCodeComponent } from "./services/auth/confirm-code/confirm-code.component";
import { ProfileComponent } from "./services/auth/profile/profile.component";
import { AuthGuard } from "./auth/auth/auth.guard";
import { PersonsListComponent } from "./persons-list/persons-list.component";
import { PersonAddComponent } from "./person-add/person-add.component";
import { PersonEditComponent } from "./person-edit/person-edit.component";

const routes: Routes = [
  {
    path: "auth",
    component: AuthComponent,
    children: [
      {
        path: "signin",
        component: SignInComponent,
        canActivate: [UnauthGuard]
      },
      {
        path: "signup",
        component: SignUpComponent,
        canActivate: [UnauthGuard]
      },
      {
        path: "confirm",
        component: ConfirmCodeComponent,
        canActivate: [UnauthGuard]
      },
      {
        path: "profile",
        component: ProfileComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  { 
      path: "", redirectTo: "/", pathMatch: "full", canActivate: [AuthGuard] 
    },
  {
    path: "persons",
    component: PersonsListComponent,
    data: { 
      title: "Persons List", 
  },
    canActivate: [AuthGuard]
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
