import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Auth } from "aws-amplify";

@Injectable({
  providedIn: "root"
})
export class PersonService {
  token: string;
  apiURL = "//localhost:8080/api/person/persons";

  constructor(private http: HttpClient) {
    this.token = this.getToken();
  }

  //Header Model To API Calls
  displayHeaders() {
    var header = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer" + this.token
      })
    };
    return header;
  }

  getToken() {
    Auth.currentSession()
      .then(data => (this.token = data.getIdToken().getJwtToken()))
      .catch(err => console.log(err));
    return this.token;
  }

  getAll(): Observable<any> {
console.log(this.token);
    return this.http.get(this.apiURL, this.displayHeaders());
  }

  deletePerson(personId:string) {
    this.http.delete(this.apiURL,this.displayHeaders());
  
  }
}
