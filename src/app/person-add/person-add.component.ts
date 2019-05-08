import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from '../services/api/person.service';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.css']
})
export class PersonAddComponent implements OnInit {

  person:any;

  constructor(router: Router, private personService: PersonService) {

   }

  ngOnInit() {
  }


createPerson(person){
console.log("Nome Pessoa: " + person.name);
this.personService.createPerson(person).subscribe(()=>this.personService.redirectToList());
}

}
