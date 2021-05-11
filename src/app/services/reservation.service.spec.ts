import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule,HttpTestingController} from '@angular/common/http/testing';

import { ReservationService } from './reservation.service';
import { Reservation } from '../reservation/reservation.model';

describe('ReservationService', () => {
  let service: ReservationService;
  let httpMock: HttpTestingController;
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[ReservationService]
    });
    service = TestBed.inject(ReservationService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  afterEach(()=>
  {
    httpMock.verify();
  })

  it('get reservations', () => {
    const dummyReservations: Reservation[] = [
      { 'id' : 26,
        'client' : 'Manu' , 'room':{
        'id' : 1,
        'number': 324,
        'description': 'Very comfortable junior suite room to stay with your partner, with a king size bed',
    },
    "initialDate": "2021-10-26",
    "endDate": "2021-10-28"}
    ];
  service.getAllReservations().subscribe(reservations => {
    expect(reservations.length).toBe(1);
    expect(reservations).toEqual(dummyReservations);
  });

  const request = httpMock.expectOne(service.urlConnection);
  expect(request.request.method).toEqual('GET');

  });
});
