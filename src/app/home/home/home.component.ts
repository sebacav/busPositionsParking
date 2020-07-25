import { Component, OnInit } from '@angular/core';
import { BusService } from 'src/app/shared/services/bus.service';
import { Bus, Parking } from '../../../app/shared/models/Bus';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  busesList: Bus[] = [];

  parkings: { [index: number]: Parking; } = {};

  constructor(
    private busService: BusService
  ) {
    this.busesList = this.busService.Test();
  }

  ngOnInit() {

    this.busesList.forEach(element => {

      if (this.parkings[element.parking_zone] == undefined){
        this.parkings[element.parking_zone] = new Parking();

        // Chargers
        this.parkings[element.parking_zone].chargers = [];
        this.parkings[element.parking_zone].chargers.push(element.charger);

        // Prioritys
        this.parkings[element.parking_zone].prioritys = [];
        this.parkings[element.parking_zone].prioritys.push(element.priority);

        // Socs
        this.parkings[element.parking_zone].socsGun1 = [];
        this.parkings[element.parking_zone].socsGun2 = [];
        if (element.gun == 1){
          this.parkings[element.parking_zone].socsGun1.push(element.soc);
        } else {
          this.parkings[element.parking_zone].socsGun2.push(element.soc);
        }
      } else {
        if (!this.parkings[element.parking_zone].chargers.includes(element.charger)){
          this.parkings[element.parking_zone].chargers.push(element.charger);
          // this.parkings[element.parking_zone].prioritys.push(element.priority);
          // this.parkings[element.parking_zone].socs.push(element.soc);
        }

        if (element.gun == 1){
          this.parkings[element.parking_zone].socsGun1.push(element.soc);
        } else {
          this.parkings[element.parking_zone].socsGun2.push(element.soc);
        }

      }

    });

    console.log(this.parkings);
    
  }

}
