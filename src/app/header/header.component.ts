import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  
  title ='Hotel Cancun';

  /** @Output for send parameter to another component
   * makeReservation will control if user is making or searching reservation
  */
   @Output() makeReservation= new EventEmitter<Boolean>();

   
   
   ngOnInit(): void {
    this.setUserAction(true);
  }

  /**
   * Method for set the user action on the app
   */
   setUserAction(makeNewReservation:Boolean){
    this.makeReservation.emit(makeNewReservation);
}


}
