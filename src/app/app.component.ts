

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  /**
   * Variable for indicate the user action
   * true -- create a new reservation
   * false -- search one reservation by client
   */
  userAction: Boolean;
  ngOnInit(): void {
    this.userAction = true;
  }
  
  setActionValue(userAction:Boolean){
    this.userAction = userAction;
  }
}
