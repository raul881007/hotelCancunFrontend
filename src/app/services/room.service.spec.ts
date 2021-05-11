import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing';

import { RoomService } from './room.service';
import { Room } from '../room/room.model';

describe('RoomService', () => {
  let service: RoomService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[RoomService]
    });
    service = TestBed.inject(RoomService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  
  afterEach(()=>
  {
    httpMock.verify();
  })

  it('get rooms', () => {
    const dummyReservations: Room[] = [
      {
        'id' : 1,
        'number': 324,
        'description': 'Very comfortable junior suite room to stay with your partner, with a king size bed',
    },
    {
      'id' : 2,
      'number': 326,
      'description': 'Very comfortable junior suite room to stay with your partner, with a king size bed',
  },
  {
    'id' : 2,
    'number': 325,
    'description': 'Very comfortable junior suite room to stay with your partner, with a king size bed',
},
    ];
  service.getAllRooms().subscribe(rooms => {
    expect(rooms.length).toBe(3);
    expect(rooms).toEqual(dummyReservations);
  });

  const request = httpMock.expectOne(service.urlConnection);
  expect(request.request.method).toEqual('GET');

  });
});
