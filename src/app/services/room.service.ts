import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../common/Config';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

   /**
   * Api rest connection
   */
    public urlConnection = Config.backendUrl + "room/"


   /**
   * 
   * @param httpClient contains the necessary methods for the connection with the backend
   */
    constructor(
      private httpClient:HttpClient
    ) { }

     /**
     * Method that obtains rooms
     * @returns connection to the POST method with the results
     */
   public getAllRooms(): Observable<any>{
    return this.httpClient.get(this.urlConnection);
  }
  
}
