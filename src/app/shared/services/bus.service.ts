import { Injectable } from '@angular/core';
import { Bus } from '../models/Bus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  busesList: Bus[] = []

  jsonRecibido = [
    {"charger": "C1", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 1 },
    {"charger": "C1", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": null, "gun": 2 },

    {"charger": "C2", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 1 },
    {"charger": "C2", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 2 },

    {"charger": "C3", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 1 },
    {"charger": "C3", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 2 },

    {"charger": "C4", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 1 },
    {"charger": "C4", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 2 },



    {"charger": "C5", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": 50, "gun": 1 },
    {"charger": "C5", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 2 },

    {"charger": "C6", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": 50, "gun": 1 },
    {"charger": "C6", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": 50, "gun": 2 },

    {"charger": "C7", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": 50, "gun": 1 },
    {"charger": "C7", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": 50, "gun": 2 },
    
    {"charger": "C8", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": 50, "gun": 1 },
    {"charger": "C8", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": 50, "gun": 2 },



    {"charger": "C9", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": 50, "gun": 1 },
    {"charger": "C9", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 2 },
    {"charger": "C10", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": 50, "gun": 1 },
    {"charger": "C10", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": 50, "gun": 2 },
    {"charger": "C11", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": 50, "gun": 1 },
    {"charger": "C11", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": 50, "gun": 2 },
    {"charger": "C12", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": 50, "gun": 1 },
    {"charger": "C12", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": 50, "gun": 2 }
  ]

  constructor() { 
    this.busesList = this.jsonRecibido;
  }

  Test(){
    return this.busesList;
  }


}
