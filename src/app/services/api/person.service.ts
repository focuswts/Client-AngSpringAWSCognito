import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Auth } from "aws-amplify";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class PersonService {
  token: string;
  apiURL = "http://localhost:8080/api/person/persons";

  constructor(private http: HttpClient, private router: Router) {
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

  deletePerson(personId: any): Observable<any> {
    console.log(this.apiURL + "/delete/" + personId);
    return this.http.delete(
      this.apiURL + "/delete/" + personId,
      this.displayHeaders()
    );
  }

createPerson(person: any): Observable<any>{
  console.log("Create Person");

  return this.http.post(
    this.apiURL + "/create" , person,
     this.displayHeaders()
  );
}



redirectToList(){
  this.router.navigate(["/persons"]);
}


  setRoutePersonOBJ(personOBJ: any) {
    console.log("Objeto Definido Na Rota");

    this.router.navigate(["/persons/update"], {
      state: { person: personOBJ, var: "teste" , operation: 'update'}
    });
  }



updatePerson(personOBJ: any): Observable<any>{
console.log("Update Person");

return this.http.put(
  this.apiURL + "/update/" + personOBJ.id,personOBJ,
   this.displayHeaders()
);



}

}
