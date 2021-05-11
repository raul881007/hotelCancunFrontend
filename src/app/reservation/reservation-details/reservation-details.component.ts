import { Component, OnInit,Output,Inject} from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { RoomListComponent } from 'src/app/room/room-list/room-list.component';


import { Room } from 'src/app/room/room.model';
import { ReservationService } from 'src/app/services/reservation.service';
import { Reservation } from '../reservation.model'; 




@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ]
})
export class ReservationDetailsComponent implements OnInit {

  /**
 * FormGroup to make the reservation 
 */
   reservationForm:FormGroup;

   /** Contains data of the current room to reserve
   * 
  */
  room : Room;

  /**
   * FormGroup that contains the date range for the user to reserve in the room
   */
  range:FormGroup;

  /**
   * Variable that controls whether or not the user is updating the reservation
   */
  updatingReservation:boolean;

  /**
   * Auxiliary attribute that contains all the reservations made in that room
   */
  roomReservations: Reservation[];
    

  /**
   * Class constructor
   * @param mReservation dependency injection of the reservation that the user wants to edit
   * @param dialogRef current dialog opened
   * @param reservationService service that communicates with the backend
   */

  constructor(@Inject(MAT_DIALOG_DATA) public mReservation: Reservation,public dialogRef: MatDialogRef<RoomListComponent>,private reservationService: ReservationService,) { 
    
   this.room = mReservation.room;
   this.updatingReservation = false;
   
    if(mReservation.initialDate!=null){
      this.updatingReservation = true;
      console.log(mReservation.initialDate);
      
      this.range = new FormGroup({
        client: new FormControl(mReservation.client),
        start: new FormControl(new Date(mReservation.initialDate)),
        end: new FormControl(new Date(mReservation.endDate))
      });
      this.initialDate = new Date(mReservation.initialDate);
      this.endDate = new Date(mReservation.endDate);
    }else{
      this.range = new FormGroup({
        client: new FormControl(),
        start: new FormControl(),
        end: new FormControl()
      });
    }
    
  }


/**
 * Attributes initialization
 */
  ngOnInit(): void {;
   this.errorMessage = "The stay in the hotel must be up to 3 days";
   this.reservationService.getReservationsByRoom(this.room.id).subscribe(response => {
    this.roomReservations = response;
    console.log(this.roomReservations);
    if(this.updatingReservation){
      let nReserv = [];
      this.roomReservations.forEach(item => {
        if (item.id != this.mReservation.id) nReserv.push(item);
      })
      this.roomReservations = nReserv;
    }
  },
    error => console.log(error));
  }
  
   

  
/**
 * Method that creates or updates 
 * the reservation depending on the action chosen by the user
 */
    createUpdateReservation(){
      if(!this.showError && this.range.value.start !=null && this.range.value.end !=null  && this.range.value.client !=null){
        this.initialDate = new Date(this.range.value.start);
        this.endDate = new Date(this.range.value.end);
        var newReservation = new Reservation(this.room,this.range.value.client,moment(new Date(this.range.value.start)).format("YYYY-MM-DD"),moment(new Date(this.range.value.end)).format("YYYY-MM-DD"));
        if (this.updatingReservation) {
         this.reservationService.updateReservationDb(newReservation, this.mReservation.id).subscribe(resp => {
          this.dialogRef.close();
         },
           error => { console.error(error) }
         )
       } else {
        console.log(newReservation);
         this.reservationService.saveReservationDb(newReservation).subscribe(resp => {
          this.dialogRef.close();
         },
           error => { console.error(error) })
       }
      }
  }




/**
 * Method that is executed when the user chooses a day in 
 * the datepiker and validates that there is no previous 
 * reservation or that the reservation is for the indicated days
 */

  onChangeDate(){
    if(this.range.value.start !=null && this.range.value.end !=null){
      this.initialDate = new Date(moment(new Date(this.range.value.start)).format("YYYY-MM-DD"));
      this.endDate = new Date(moment(new Date(this.range.value.end)).format("YYYY-MM-DD"));
      
      if(this.getDaysDiference()>=3){
        this.errorMessage = "The stay in the hotel must be up to 3 days";
        this.showError = true;
      }else{
        this.showError = false;
        this.roomReservations.forEach(resp=>{
          if(this.initialDate >= new Date(resp.initialDate) && this.initialDate <= new Date(resp.endDate) 
          || this.endDate >= new Date(resp.initialDate) && this.endDate <= new Date(resp.endDate)){
            this.errorMessage = "There is one reservation in this date";
            this.showError = true;
          }
        }); 
      }
    }
  }

  /**
   * Initial date of the reservation
   */
  initialDate: Date;
  /**
   * Final date of the reservation
   */
  endDate: Date;

  /**
   * Attribute showing error
   */
  showError:boolean;

  /**
   * Error message
   */
  errorMessage:string;
  

/**
 * Method that calculates the difference 
 * in days between the two dates selected by the user
 * @returns  int value with the data diference
 */
getDaysDiference()
{
  var days_miliseconds = 1000 * 60 * 60 * 24;
  var utc1 = Date.UTC(this.initialDate.getFullYear(), this.initialDate.getMonth(), this.initialDate.getDate());
  var utc2 = Date.UTC(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate());
  
  return Math.floor((utc2 - utc1) / days_miliseconds);
}


}
