import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatBottomSheet } from "@angular/material";
import { CountryCodeSelectComponent } from "../country-code-select/country-code-select.component";
import { CountryCode } from "../country-code-select/country-codes";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth/auth.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  hide = true;
  signupForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.min(10)]),
    fname: new FormControl("", [Validators.min(2)]),
    lname: new FormControl("", [Validators.min(2)])
  });

  countryCode = "+55";

  get emailInput() {
    return this.signupForm.get("email");
  }
  get preferred_Username() {
    return this.signupForm.get("username");
  }
  get passwordInput() {
    return this.signupForm.get("password");
  }
  get fnameInput() {
    return this.signupForm.get("fname");
  }
  get lnameInput() {
    return this.signupForm.get("lname");
  }
  get phoneInput() {
    return this.signupForm.get("phone");
  }

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit() {}

  selectCountryCode() {
    this._bottomSheet
      .open(CountryCodeSelectComponent)
      .afterDismissed()
      .subscribe((data: CountryCode) => {
        this.countryCode = data ? data.dial_code : this.countryCode;
      });
  }

  getEmailInputError() {
    if (this.emailInput.hasError("email")) {
      return "Please enter a valid email address.";
    }
    if (this.emailInput.hasError("required")) {
      return "An Email is required.";
    }
  }

  getPasswordInputError() {
    if (this.passwordInput.hasError("required")) {
      return "A password is required.";
    }
  }

  shouldEnableSubmit() {
    return (
      !this.emailInput.valid ||
      !this.preferred_Username.valid ||
      !this.passwordInput.valid ||
      !this.fnameInput.valid ||
      !this.lnameInput.valid ||
      !this.phoneInput.valid
    );
  }

  signUp() {
    this._authService
      .signUp({
        preferred_username: this.preferred_Username.value,
        email: this.emailInput.value,
        password: this.passwordInput.value,
        firstName: this.fnameInput.value,
        lastName: this.lnameInput.value,
        phone: this.countryCode + this.phoneInput.value
      })
      .then(() => {
        console.log("username: " + this.preferred_Username.value);
        environment.confirm.preferred_username = this.preferred_Username.value;
        environment.confirm.email = this.emailInput.value;
        environment.confirm.password = this.passwordInput.value;
        this._router.navigate(["auth/confirm"]);
      })
      .catch(error => console.log(error));
  }
}
