import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  clickCounter: number = 0;
  name: String = '';

  constructor() { }

  ngOnInit() {
  }

  countClick() {
    this.clickCounter += 1;
  }


  onSave($event){    
    this.clickCounter += 1;
    console.log("Save button is clicked!", $event);    
  }   


  setClasses() {
    let myClasses = {
      active: this.clickCounter > 4,
      notactive: this.clickCounter <=4
    }
    return myClasses;
  }

}
