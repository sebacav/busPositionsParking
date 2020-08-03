import { Injectable } from '@angular/core';
import { Bus } from '../models/Bus';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { timeout, retry, catchError, map } from 'rxjs/operators'
import {MatSnackBar} from '@angular/material/snack-bar';
import { resolve } from 'url';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  private url = 'http://test.cl/dasd'

  busesList: Bus[] = [];
  onePrioritys: Bus[] = [];
  twoPrioritys: Bus[] = [];
  threePrioritys: Bus[] = [];

  changedBus: Bus = new Bus();

  freeBus: Bus = new Bus();
  oldBus: Bus = new Bus();

  /*
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
  */
  
  
  jsonRecibido = [
    {"charger": "C1", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 1 , "position_line": 1},
    // {"charger": "C2", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 1, "position_line": 1 },
    {"charger": "C2", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": 40, "gun": 1, "position_line": 1 }, // test priority 2
    // {"charger": "C3", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 1, "position_line": 1 },
    {"charger": "C3", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": 20, "gun": 1, "position_line": 1 }, // test priority 3

    {"charger": "C4", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 1, "position_line": 2 },
    // {"charger": "C5", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 1, "position_line": 2 },
    {"charger": "C5", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": 40, "gun": 1, "position_line": 2 }, // test priority 2
    // {"charger": "C6", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 1, "position_line": 2 },
    {"charger": "C6", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": 20, "gun": 1, "position_line": 2 },

    {"charger": "C7", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 1, "position_line": 3 },
    // {"charger": "C8", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 1, "position_line": 3 },
    {"charger": "C8", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": 40, "gun": 1, "position_line": 3 }, // test priority 2
    // {"charger": "C9", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 1, "position_line": 3 },
    {"charger": "C9", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": 20, "gun": 1, "position_line": 3 },

    {"charger": "C10", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 1 , "position_line": 4},
    // {"charger": "C11", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 1, "position_line": 4 },
    {"charger": "C11", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": 40, "gun": 1, "position_line": 4 }, // test priority 2
    // {"charger": "C12", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 1, "position_line": 4 },
    {"charger": "C12", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": 20, "gun": 1, "position_line": 4 },

    {"charger": "C13", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 1, "position_line": 5 },
    // {"charger": "C14", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 1, "position_line": 5 },
    {"charger": "C14", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": 40, "gun": 1, "position_line": 5 }, // test priority 2
    // {"charger": "C15", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 1, "position_line": 5 },
    {"charger": "C15", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": 20, "gun": 1, "position_line": 5 },

    {"charger": "C16", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 1, "position_line": 6 },
    // {"charger": "C17", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 1, "position_line": 6 },
    {"charger": "C17", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": 40, "gun": 1, "position_line": 6 }, // test priority 2
    // {"charger": "C18", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 1, "position_line": 6 },
    {"charger": "C18", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": 20, "gun": 1, "position_line": 6 },


    {"charger": "C1", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 2 , "position_line": 1},
    // {"charger": "C2", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 1 },
    {"charger": "C2", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": 40, "gun": 2, "position_line": 1 }, // test priority 2
    // {"charger": "C3", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 1 },
    {"charger": "C3", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": 20, "gun": 2, "position_line": 1 },

    {"charger": "C4", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 2, "position_line": 2 },
    // {"charger": "C5", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 2 },
    {"charger": "C5", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": 40, "gun": 2, "position_line": 2 }, // test priority 2
    // {"charger": "C6", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 2 },
    {"charger": "C6", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": 20, "gun": 2, "position_line": 2 },

    {"charger": "C7", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 2, "position_line": 3 },
    // {"charger": "C8", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 3 },
    {"charger": "C8", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 3 }, // test priority 2 *********
    // {"charger": "C9", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 3 },
    {"charger": "C9", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": 20, "gun": 2, "position_line": 3 },

    {"charger": "C10", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 2 , "position_line": 4},
    // {"charger": "C11", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 4 },
    {"charger": "C11", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": 40, "gun": 2, "position_line": 4 }, // test priority 2
    // {"charger": "C12", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 4 },
    {"charger": "C12", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": 20, "gun": 2, "position_line": 4 },

    {"charger": "C13", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 2, "position_line": 5 },
    // {"charger": "C14", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 5 },
    {"charger": "C14", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": 40, "gun": 2, "position_line": 5 }, // test priority 2
    // {"charger": "C15", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 5 },
    {"charger": "C15", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": 20, "gun": 2, "position_line": 5 },

    {"charger": "C16", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 2, "position_line": 6 },
    // {"charger": "C17", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 6 },
    {"charger": "C17", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": 40, "gun": 2, "position_line": 6 }, // test priority 2
    // {"charger": "C18", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 6 },
    {"charger": "C18", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": 20, "gun": 2, "position_line": 6 },

    {"charger": "C19", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": 50, "gun": 1 , "position_line": 1},
    // {"charger": "C20", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 1 },
    {"charger": "C20", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": 40, "gun": 1, "position_line": 1 }, // test priority 2
    // {"charger": "C21", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 1 },
    {"charger": "C21", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 1 },

    {"charger": "C22", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": 21, "gun": 1, "position_line": 2 },
    // {"charger": "C23", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 2 },
    {"charger": "C23", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": 40, "gun": 1, "position_line": 2 }, // test priority 2
    // {"charger": "C24", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 2 },
    {"charger": "C24", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": 20, "gun": 1, "position_line": 2 },

    {"charger": "C25", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": 50, "gun": 1, "position_line": 3 },
    // {"charger": "C26", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 3 },
    {"charger": "C26", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": 40, "gun": 1, "position_line": 3 }, // test priority 2
    // {"charger": "C27", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 3 },
    {"charger": "C27", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": 20, "gun": 1, "position_line": 3 },

    {"charger": "C28", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": 50, "gun": 1 , "position_line": 4},
    // {"charger": "C29", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 4 },
    {"charger": "C29", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": 40, "gun": 1, "position_line": 4 }, // test priority 2
    // {"charger": "C30", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 4 },
    {"charger": "C30", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": 20, "gun": 1, "position_line": 4 },

    {"charger": "C31", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": 50, "gun": 1, "position_line": 5 },
    // {"charger": "C32", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 5 },
    {"charger": "C32", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": 40, "gun": 1, "position_line": 5 }, // test priority 2
    // {"charger": "C33", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 5 },
    {"charger": "C33", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": 20, "gun": 1, "position_line": 5 },

    {"charger": "C34", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": 50, "gun": 1, "position_line": 6 },
    // {"charger": "C35", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 6 },
    {"charger": "C35", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": 40, "gun": 1, "position_line": 6 }, // test priority 2
    // {"charger": "C36", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 6 },
    {"charger": "C36", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": 20, "gun": 1, "position_line": 6 },


    {"charger": "C19", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": 50, "gun": 2 , "position_line": 1},
    // {"charger": "C20", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 1 },
    {"charger": "C20", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": 40, "gun": 2, "position_line": 1 }, // test priority 2
    // {"charger": "C21", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 1 },
    {"charger": "C21", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": 20, "gun": 2, "position_line": 1 },

    {"charger": "C22", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 2 },
    // {"charger": "C23", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 2 },
    {"charger": "C23", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": 40, "gun": 2, "position_line": 2 }, // test priority 2
    // {"charger": "C24", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 2 },
    {"charger": "C24", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": 20, "gun": 2, "position_line": 2 },

    {"charger": "C25", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": 50, "gun": 2, "position_line": 3 },
    // {"charger": "C26", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 3 },
    {"charger": "C26", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": 40, "gun": 2, "position_line": 3 }, // test priority 2
    // {"charger": "C27", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 3 },
    {"charger": "C27", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": 20, "gun": 2, "position_line": 3 },

    {"charger": "C28", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": 50, "gun": 2 , "position_line": 4},
    // {"charger": "C29", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 4 },
    {"charger": "C29", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": 40, "gun": 2, "position_line": 4 }, // test priority 2
    // {"charger": "C30", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 4 },
    {"charger": "C30", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": 20, "gun": 2, "position_line": 4 },

    {"charger": "C31", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": 50, "gun": 2, "position_line": 5 },
    // {"charger": "C32", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 5 },
    {"charger": "C32", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": 40, "gun": 2, "position_line": 5 }, // test priority 2
    // {"charger": "C33", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 5 },
    {"charger": "C33", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": 20, "gun": 2, "position_line": 5 },

    {"charger": "C34", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": 50, "gun": 2, "position_line": 6 },
    // {"charger": "C35", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 6 },
    {"charger": "C35", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": 40, "gun": 2, "position_line": 6 }, // test priority 2
    // {"charger": "C36", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 6 },
    {"charger": "C36", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": 20, "gun": 2, "position_line": 6 },



    // {"charger": "C22", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": 66, "gun": 2, "position_line": 2 }

  ]
  

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
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

  SortParkings(data: Bus): Promise<Bus[]>{

    return new Promise((resolve)=>{
      this.jsonRecibido.forEach(element =>{
        if(element.charger == 'C2'){
          element.soc = data.soc;
        }
      });
      this.busesList = this.jsonRecibido;
      resolve(this.busesList);
    })
  }


  Sorting(data: Bus): Promise<Bus[]>{
    
    return new Promise((resolve)=>{


      this.GetBusesBySocPriority(null, 1, this.busesList).then(
        (busesPriorityOne: Bus[])=>{
          this.onePrioritys = busesPriorityOne
          if(this.onePrioritys.length > 1){

          }
          else if (this.onePrioritys.length == 1){
          /**
           *  CASO IDEAL
           *    Positions Lines en Priority Uno desocupados = 1
           */
            this.UpdateBus(data.soc, this.onePrioritys[0], this.busesList).then(
              (listaBusesUpdated: Bus[])=>{
                this.busesList = listaBusesUpdated;
                this.changedBus = this.onePrioritys[0] // Lista de cambios en ejecucion
                // console.log(this.changedBus);
                
                resolve(this.busesList);
              }
            );
          }
          else if(this.onePrioritys.length == 0){
            console.log("No hay libres en prioridad 1, pasando a prioridad 2");
            
            this.GetBusesBySocPriority(null, 2, this.busesList).then(
              (busesPriorityTwo: Bus[])=>{
                this.twoPrioritys = busesPriorityTwo;
                if(this.twoPrioritys.length > 1){

                }
                else if (this.twoPrioritys.length == 1){
                  /**
                   * CASO IDEAL 
                   *  Positions Lines en Priority Dos desocupados = 1 (todos position line 1 ocupados)
                   */
                  this.UpdateBus(data.soc, this.twoPrioritys[0], this.busesList).then(
                    (listaBusesUpdated: Bus[])=>{
                      this.busesList = listaBusesUpdated;
                      this.changedBus = this.twoPrioritys[0]; // Lista de cambios en ejecucion
                      resolve(this.busesList);
                    }
                  );
                }
                else if (this.twoPrioritys.length == 0){
                  console.log("No hay libres en prioridad 1 ni 2, pasando a prioridad 3");

                  this.GetBusesBySocPriority(null, 3, this.busesList).then(
                    (busesPriorityThree: Bus[])=>{
                      this.threePrioritys = busesPriorityThree;
                      if(this.threePrioritys.length > 1){

                      }
                      else if (this.threePrioritys.length == 1){
                        /**
                         * CASO IDEAL 
                         *  Positions Lines en Priority Tres desocupados = 1 (todos position line 1 y 2 ocupados)
                         */
                        this.UpdateBus(data.soc, this.threePrioritys[0], this.busesList).then(
                          (listaBusesUpdated: Bus[])=>{
                            this.busesList = listaBusesUpdated;
                            this.changedBus = this.threePrioritys[0]; // Lista de cambios en ejecucion
                            resolve(this.busesList);
                          }
                        );
                      }
                      else if (this.threePrioritys.length == 0){  
                        console.log("No quedan espacios libres");
                        
                        resolve(this.busesList);
                        setTimeout( () => {
                          this.openSnackBar("There is not positions left", "OK");
                        }, 1000 );
                      }
                    }
                  );
                }
              }
            )
          }
        }
      );
      
    });
  }

  

  // Retorna arreglo de buses/elementos que contienen el soc y priority en la lista buses
  GetBusesBySocPriority(soc: number, priority: number, buses: Bus[]): Promise<Bus[]>{
    console.log("Gettint Priority");
    return new Promise((resolve)=>{
      let auxBusesList: Bus[] = []; 
      buses.forEach(bus => {
        if(bus.soc == soc && bus.priority == priority){
          auxBusesList.push(bus);
        }
      });
      resolve(auxBusesList);
    });
  }

  // Reemplaza bus nuevo por el antiguo en la lista
  UpdateBus(newSoc: number, oldBus: Bus, busList: Bus[]): Promise<Bus[]>{
    console.log("updating");
    return new Promise((resolve)=>{
      busList.forEach(bus => {
        if(bus == oldBus){
          bus.soc = newSoc;
        }
      });
      resolve(busList);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }


}
