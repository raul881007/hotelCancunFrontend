import { Room } from "../room/room.model";

export class Reservation{
    id:any;
    room:Room;
    client:string;
    initialDate:string;
    endDate:string;

    constructor(room:Room,client:string,initialDate:string,endDate:string){
        this.room = room;
        this.client = client;
        this.initialDate = initialDate;
        this.endDate = endDate;
    }
}