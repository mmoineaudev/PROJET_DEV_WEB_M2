import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-details',
  templateUrl: './display-details.component.html',
  styleUrls: ['./display-details.component.css']
})
export class DisplayDetailsComponent implements OnInit {
  visible:boolean = true;

  constructor() { }

  ngOnInit() {
  }
  display(){
    this.visible = true;
  }
  hide(){
    this.visible = false;
  }
}
