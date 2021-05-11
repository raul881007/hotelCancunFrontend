import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../common/Config';
import { Reservation } from '../reservation/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  /**
   * Api rest connection
   */
   public urlConnection = Config.backendUrl + "reservation/"

  /**
   * 
   * @param httpClient contains the necessary methods for the connection with the backend
   */
  constructor(
    private httpClient:HttpClient
  ) { }

  /**
     * Method that obtains reservations
     * @returns connection to the POST method with the results
     */
   public getAllReservations(): Observable<any>{
    return this.httpClient.get<Reservation[]>(this.urlConnection);
  }

  /**
   * Method to insert a new reservation
   * @param reservation Reservation object with the data to insert
   * @returns connection to the POST method with the results
   */
  public saveReservationDb(reservation : Reservation): Observable<any>{
    return this.httpClient.post(this.urlConnection,reservation);
  }
  /**
   * Method to delete the reservation
   * @param idReservation eservation identification number
   * @returns connection to the DELETE method with the results
   */
  public deleteReservationDb(idReservation : any): Observable<any>{
    return this.httpClient.delete(this.urlConnection+idReservation);
  }
  /**
   * Method to update reservation
   * @param reservation Reservation object with the data to insert
   * @param idReservation reservation identification number
   * @returns connection to the PUT method with the results
   */
  public updateReservationDb(reservation:Reservation,idReservation:any):Observable<any>{
   return this.httpClient.put<any>(this.urlConnection+idReservation,reservation);
  }

  /**
   * Method to gets all reservations in a room
   * @param idRoom room identification number
   * @returns rooms 
   */
   public getReservationsByRoom(idRoom:any):Observable<any>{
    return this.httpClient.get<any>(this.urlConnection+'by_room/'+idRoom);
   }

   /*
   * Method to gets all reservations of a client
   * @param clientName 
   * @returns rooms 
   */
   public getReservationsByClient(clientName:string):Observable<any>{
    return this.httpClient.get<any>(this.urlConnection+'by_client/'+clientName);
   }

}
