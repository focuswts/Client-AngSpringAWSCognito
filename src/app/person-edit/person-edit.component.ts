import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { PersonService } from "../services/api/person.service";

@Component({
  selector: "app-person-edit",
  templateUrl: "./person-edit.component.html",
  styleUrls: ["./person-edit.component.css"]
})
export class PersonEditComponent implements OnInit {
  state$: Observable<object>;
  person;

  constructor(router: Router, private personService: PersonService) {
    //Pega Os Valores Do State Passados Na Rota Através Do Person Service
      console.log(router.getCurrentNavigation().extras.state.person);
      this.person = router.getCurrentNavigation().extras.state.person;
   
   //console.log("Operation: " + router.getCurrentNavigation().extras.state.operation);

  }

  ngOnInit() {
  }

  updatePerson(person: any) {
    //Método chamado no subscribe faz o redirecionamento da página e atualiza o valor da table
    this.personService.updatePerson(person).subscribe(()=>this.personService.redirectToList());
  }
}
