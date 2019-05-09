import { Component, OnInit } from "@angular/core";
import { PersonService } from "../services/api/person.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-persons-list",
  templateUrl: "./persons-list.component.html",
  styleUrls: ["./persons-list.component.css"]
})
export class PersonsListComponent implements OnInit {
  persons: Array<any>;
  columnsToDisplay = ["id", "name", "cpf", "email", "options"];

  constructor(private router: Router, private personService: PersonService) {}

  ngOnInit() {
    console.log("Listando Pessoas(PersonListComponent)");

    this.getList();
  }

  getList() {
    this.personService.getAll().subscribe(data => {
      this.persons = data;
    });
  }

  deletePerson(id: any) {
    console.log("Deletado Cliente ID: " + id);
    this.personService
      .deletePerson(id)
      .subscribe(() => this.getList());
  }

  setRoutePersonOBJ(person: any) {
    console.log("Update");
    this.personService.setRoutePersonOBJ(person);
  }

  createPerson() {
    var person = null;
    this.router.navigate(["/persons/create"]);
  }
}
