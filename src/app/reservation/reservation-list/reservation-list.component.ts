import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservationService } from 'src/app/services/reservation.service';
import { ReservationDetailsComponent } from '../reservation-details/reservation-details.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Reservation } from '../reservation.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

   /** reservations array with the reservation data
  */
  reservations :  Reservation[];

  /**
   * Client name
   */
  clientName : string;
  
  /**
   * Class constructor
   * @param reservationService Service with the data
   * @param dialog Opened Dialog 
   * @param _snackBar SnackBar thats show all messages
   */
  constructor(private reservationService: ReservationService,public dialog: MatDialog,private _snackBar: MatSnackBar) { 

  }
/**
 * Class initialization method
 */
  ngOnInit(): void {
    this.getReservations();
  }

  /**
   * Get all reservations from database
   */
  getReservations(){
    this.reservationService.getAllReservations().subscribe(response => {
      this.reservations = response;
      console.log(this.reservations);
    },
      error => console.log(error));

  }

  /**
   * Method that shows the dialog for the update
   * @param mReservation Selected reservation
   */
  showUpdateReservation(mReservation:Reservation) {
    const dialogRef = this.dialog.open(ReservationDetailsComponent, {
      data: mReservation
    });
    dialogRef.afterClosed().subscribe(result => {
      
      if(result==1){
        this.deleteReservation(mReservation);
      }else 
        this.getReservations();
        this._snackBar.open("Update succes",'',{
          duration:1000
        });
    });
  }

  


 /**
  * Delete the reservation made by the user
  * @param reservation reservation data
  */

  deleteReservation(reservation:Reservation){
    this.reservationService.deleteReservationDb(reservation.id).subscribe(resp => {
      this._snackBar.open("Delete succes",'',{
        duration:1000
      });
      this.getReservations();
    })
    
    
  }


}
