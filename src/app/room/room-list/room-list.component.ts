import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { Room } from '../room.model';
import {MatDialog} from '@angular/material/dialog';
import {ReservationDetailsComponent} from '../../reservation/reservation-details/reservation-details.component'
import { RoomService } from 'src/app/services/room.service';
import { Reservation } from 'src/app/reservation/reservation.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit{

  /** Rooms array with the room data
  */
   rooms :  Room[];

 /**
   * Class constructor
   * @param roomsService Service with the data
   * @param dialog Opened Dialog 
   * @param _snackBar SnackBar thats show all messages
   */
  constructor(private roomsService: RoomService,public dialog: MatDialog,private _snackBar: MatSnackBar) { }

   /**
   * Method that shows the dialog for make one new reservation
   * @param mRoom Selected room
   */
    openDialog(mRoom:Room) {
      const dialogRef = this.dialog.open(ReservationDetailsComponent, {
        data: new Reservation(mRoom,"",null,null)
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result ==2){
          this._snackBar.open("Done",'',{
            duration:1000
          });
        }
      });
    }
/**
 * Ng method for attributes initialization 
 */
  ngOnInit(): void {
    this.roomsService.getAllRooms().subscribe(response => {
      this.rooms = response;
      console.log(this.rooms);
    },
      error => console.log(error));


  }

}
