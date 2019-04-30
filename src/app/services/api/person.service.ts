import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Auth, Cache } from "aws-amplify";
import { stringify } from "querystring";
import { CognitoIdToken, CognitoUserSession } from "amazon-cognito-identity-js";
import { tokenKey } from "@angular/core/src/view";
import { getToken } from "@angular/router/src/utils/preactivation";

@Injectable({
  providedIn: "root"
})
export class PersonService {
  token: String;

  constructor(private http: HttpClient) {
    this.token = this.getToken();
  }

  getToken() {
    Auth.currentSession()
      .then(data => (this.token = data.getIdToken().getJwtToken()))
      .catch(err => console.log(err));
    return this.token;
  }

  getAll(): Observable<any> {
    console.log("Token: " + this.getToken());
    return this.http.get("//localhost:8080/api/person/persons", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + this.token
      }
    });
  }


  
}
