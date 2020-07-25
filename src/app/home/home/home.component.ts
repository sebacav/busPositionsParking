import { Component, OnInit } from '@angular/core';
import { BusService } from 'src/app/shared/services/bus.service';
import { Bus, Parking, socGun } from '../../../app/shared/models/Bus';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  busesList: Bus[] = [];
  dataForm: FormGroup;

  parkings: { [index: number]: Parking; } = {};

  constructor(
    private busService: BusService,
    private fb: FormBuilder
  ) {
    this.busesList = this.busService.Test();
    this.dataForm = this.fb.group({
      soc: ['', Validators.required],
      charger: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.createParkings();
  }

  send(){
    console.log(this.dataForm.value);
    var data = {
      soc: this.dataForm.value.soc,
      charger: this.dataForm.value.charger,
    }
    this.busService.SendData(data).subscribe(
      resp => {
        console.log(resp);
      }
    );
  }

  createParkings(){
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
          this.parkings[element.parking_zone].socsGun1.push( this.setStateOfChargeClass(element) );
        } else {
          this.parkings[element.parking_zone].socsGun2.push(this.setStateOfChargeClass(element));
        }
      } else {
        if (!this.parkings[element.parking_zone].chargers.includes(element.charger)){
          this.parkings[element.parking_zone].chargers.push(element.charger);
        }

        if (element.gun == 1){
          this.parkings[element.parking_zone].socsGun1.push(this.setStateOfChargeClass(element));
        } else {
          this.parkings[element.parking_zone].socsGun2.push(this.setStateOfChargeClass(element));
        }

      }

    });

    console.log(this.parkings);
  }

  setStateOfChargeClass(element: Bus): socGun{
    var aux: socGun = null;

    if (element.soc > 0 ){
      aux =  {
        percent: "% "+element.soc.toString(),
        stateClass: "occupied"
      }
    } else {
      aux =  {
        percent: "Free",
        stateClass: "free"
      }
    }
    console.log(aux);
    
    return aux
  }

}
