import { Injectable } from '@angular/core';
import { Bus } from '../models/Bus';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { timeout, retry, catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class BusService {

  private url = 'http://test.cl/dasd'

  busesList: Bus[] = []

  jsonRecibido = [
    {"charger": "C1", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 1 },
    {"charger": "C1", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": null, "gun": 2 },

    {"charger": "C2", "marquesina": "m1", "priority": 2, "parking_zone": 1, "soc": 77, "gun": 1 },
    {"charger": "C2", "marquesina": "m1", "priority": 2, "parking_zone": 1, "soc": 22, "gun": 2 },

    {"charger": "C3", "marquesina": "m1", "priority": 2, "parking_zone": 1, "soc": 50, "gun": 1 },
    {"charger": "C3", "marquesina": "m1", "priority": 2, "parking_zone": 1, "soc": 21, "gun": 2 },

    {"charger": "C4", "marquesina": "m1", "priority": 3, "parking_zone": 1, "soc": 50, "gun": 1 },
    {"charger": "C4", "marquesina": "m1", "priority": 3, "parking_zone": 1, "soc": 50, "gun": 2 },



    {"charger": "C5", "marquesina": "m2", "priority": 1, "parking_zone": 2, "soc": 50, "gun": 1 },
    {"charger": "C5", "marquesina": "m2", "priority": 1, "parking_zone": 2, "soc": null, "gun": 2 },

    {"charger": "C6", "marquesina": "m2", "priority": 2, "parking_zone": 2, "soc": 50, "gun": 1 },
    {"charger": "C6", "marquesina": "m2", "priority": 2, "parking_zone": 2, "soc": 50, "gun": 2 },

    {"charger": "C7", "marquesina": "m2", "priority": 3, "parking_zone": 2, "soc": 50, "gun": 1 },
    {"charger": "C7", "marquesina": "m2", "priority": 3, "parking_zone": 2, "soc": 50, "gun": 2 },

    {"charger": "C8", "marquesina": "m2", "priority": 4, "parking_zone": 2, "soc": 50, "gun": 1 },
    {"charger": "C8", "marquesina": "m2", "priority": 4, "parking_zone": 2, "soc": 30, "gun": 2 }
  ]

  constructor(
    private http: HttpClient
  ) { 
    this.busesList = this.jsonRecibido;
  }

  Test(){
    return this.busesList;
  }

  SendData(data: any): Observable<any> {
    console.log(data);
    
    return this.http.post(this.url, {}).pipe(
      retry(4),
      timeout(10000)
    );
  }


}
