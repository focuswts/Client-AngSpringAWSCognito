import { Component, OnInit } from '@angular/core';
import { PersonService } from '../services/api/person.service';



@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.css']
})
export class PersonsListComponent implements OnInit {

  persons: Array<any>;
  columnsToDisplay = ['id', 'name','cpf','email','options'];
  constructor(private personService : PersonService) { }

  ngOnInit() {
this.personService.getAll().subscribe(data => {
  this.persons = data;
});
  }

  deletePerson(id:string){
console.log("Deletado Cliente ID: " + id);
this.personService.deletePerson(id);

  }

}
