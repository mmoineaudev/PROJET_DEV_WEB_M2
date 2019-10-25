import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {Artist} from '../model/Artist';
@Component({ 
  selector: 'app-display-table',
  templateUrl: './display-table.component.html',
  styleUrls: ['./display-table.component.css']
})
export class DisplayTableComponent implements OnInit {

  dataSource : Artist[];
  pageSizeOptions : number[] = [1, 5, 25, 100];
  constructor() { 
    for (let index = 0; index < 10; index++) {
      this.dataSource[index] = new Artist();
    }

  }

  ngOnInit() {
  }


}
