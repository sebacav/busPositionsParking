import { Injectable } from '@angular/core';
import { Bus } from '../models/Bus';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { timeout, retry, catchError, map } from 'rxjs/operators'
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

  freeBus: Bus = new Bus();
  newBus: Bus = new Bus();

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
    {"charger": "C2", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 1, "position_line": 1 },
    {"charger": "C3", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 1, "position_line": 1 },

    {"charger": "C4", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 1, "position_line": 2 },
    {"charger": "C5", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 1, "position_line": 2 },
    {"charger": "C6", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 1, "position_line": 2 },

    {"charger": "C7", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 1, "position_line": 3 },
    {"charger": "C8", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 1, "position_line": 3 },
    {"charger": "C9", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 1, "position_line": 3 },

    {"charger": "C10", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 1 , "position_line": 4},
    {"charger": "C11", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 1, "position_line": 4 },
    {"charger": "C12", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 1, "position_line": 4 },

    {"charger": "C13", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 1, "position_line": 5 },
    {"charger": "C14", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 1, "position_line": 5 },
    {"charger": "C15", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 1, "position_line": 5 },

    {"charger": "C16", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 1, "position_line": 6 },
    {"charger": "C17", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 1, "position_line": 6 },
    {"charger": "C18", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 1, "position_line": 6 },


    {"charger": "C1", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 2 , "position_line": 1},
    {"charger": "C2", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 1 },
    {"charger": "C3", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 1 },

    {"charger": "C4", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 2, "position_line": 2 },
    {"charger": "C5", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 2 },
    {"charger": "C6", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 2 },

    {"charger": "C7", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 2, "position_line": 3 },
    {"charger": "C8", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 3 },
    {"charger": "C9", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 3 },

    {"charger": "C10", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 2 , "position_line": 4},
    {"charger": "C11", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 4 },
    {"charger": "C12", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 4 },

    {"charger": "C13", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 2, "position_line": 5 },
    {"charger": "C14", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 5 },
    {"charger": "C15", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 5 },

    {"charger": "C16", "marquesina": "m1", "priority": 1, "parking_zone": 1, "soc": 50, "gun": 2, "position_line": 6 },
    {"charger": "C17", "marquesina": "m2", "priority": 2, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 6 },
    {"charger": "C18", "marquesina": "m3", "priority": 3, "parking_zone": 1, "soc": null, "gun": 2, "position_line": 6 },

    {"charger": "C19", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": 50, "gun": 1 , "position_line": 1},
    {"charger": "C20", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 1 },
    {"charger": "C21", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 1 },

    {"charger": "C22", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": 21, "gun": 1, "position_line": 2 },
    {"charger": "C23", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 2 },
    {"charger": "C24", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 2 },

    {"charger": "C25", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": 50, "gun": 1, "position_line": 3 },
    {"charger": "C26", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 3 },
    {"charger": "C27", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 3 },

    {"charger": "C28", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": 50, "gun": 1 , "position_line": 4},
    {"charger": "C29", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 4 },
    {"charger": "C30", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 4 },

    {"charger": "C31", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": 50, "gun": 1, "position_line": 5 },
    {"charger": "C32", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 5 },
    {"charger": "C33", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 5 },

    {"charger": "C34", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": 50, "gun": 1, "position_line": 6 },
    {"charger": "C35", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 6 },
    {"charger": "C36", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 1, "position_line": 6 },


    {"charger": "C19", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": 50, "gun": 2 , "position_line": 1},
    {"charger": "C20", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 1 },
    {"charger": "C21", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 1 },

    {"charger": "C22", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 2 },
    {"charger": "C23", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 2 },
    {"charger": "C24", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 2 },

    {"charger": "C25", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": 50, "gun": 2, "position_line": 3 },
    {"charger": "C26", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 3 },
    {"charger": "C27", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 3 },

    {"charger": "C28", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": 50, "gun": 2 , "position_line": 4},
    {"charger": "C29", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 4 },
    {"charger": "C30", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 4 },

    {"charger": "C31", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": 50, "gun": 2, "position_line": 5 },
    {"charger": "C32", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 5 },
    {"charger": "C33", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 5 },

    {"charger": "C34", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": 50, "gun": 2, "position_line": 6 },
    {"charger": "C35", "marquesina": "m5", "priority": 2, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 6 },
    {"charger": "C36", "marquesina": "m6", "priority": 3, "parking_zone": 2, "soc": null, "gun": 2, "position_line": 6 },
    // {"charger": "C22", "marquesina": "m4", "priority": 1, "parking_zone": 2, "soc": 66, "gun": 2, "position_line": 2 }

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

      for (let index = 0; index < this.busesList.length; index++) {
        const bus = this.busesList[index];

        if(bus.soc == null && bus.priority == 1){
          let positionAux = this.busesList[index];
          console.log("encontrado: ",positionAux);
          
          this.freeBus = {
            charger: positionAux.charger,
            gun: positionAux.gun,
            marquesina: positionAux.marquesina,
            parking_zone: positionAux.parking_zone,
            position_line: positionAux.position_line,
            priority: positionAux.priority,
            soc: positionAux.soc
          }
          this.onePrioritys.push(this.freeBus);
          
          if(this.onePrioritys.length > 1){

          } else {
            this.busesList.forEach(element => {
              if(
                element.charger == positionAux.charger && 
                element.gun == positionAux.gun && 
                element.priority == positionAux.priority && 
                element.marquesina == positionAux.marquesina && 
                element.parking_zone == positionAux.parking_zone &&
                element.position_line == positionAux.position_line){                  
                  element.soc = data.soc;
                  resolve(this.busesList)
              }
            });
          }
        }
        
      }
      
      resolve(this.busesList);
    });
  }


}
