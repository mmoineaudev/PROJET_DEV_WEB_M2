import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  search:string="une recherche";

  constructor() { }

  ngOnInit() {
  }

  /**
   * On fetch les résultats
   */
  onSubmit() :void {
    console.log("onSubmit : ", this.search);
  }

}
