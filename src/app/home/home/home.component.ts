import { Component, OnInit } from '@angular/core';
import { BusService } from 'src/app/shared/services/bus.service';
import { Bus, Parking, socGun, PositionLine } from '../../../app/shared/models/Bus';
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
  positionLines: { [index: number]: PositionLine; } = {};

  busTest: Bus = new Bus();

  constructor(
    private busService: BusService,
    private fb: FormBuilder
  ) {
    this.busesList = this.busService.Test();
    this.dataForm = this.fb.group({
      soc: ['', Validators.required],
      charger: ['', Validators.required],
    });
    this.createParkings(this.busesList);
  }

  ngOnInit() {
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

  sendTest(){
    console.log(this.dataForm.value);
    this.busTest.soc = this.dataForm.value.soc;
    this.busTest.charger = this.dataForm.value.charger;
    this.busTest.gun = 1;
    this.UpdateSample(this.busTest);
  }

  createParkings(buses: Bus[]){
    buses.forEach(element => {

      if (this.parkings[element.parking_zone] == undefined){
        this.parkings[element.parking_zone] = new Parking();

        this.parkings[element.parking_zone].positionLine = [];
        this.parkings[element.parking_zone].positionLine[element.position_line]= new PositionLine();

        // Chargers
        this.parkings[element.parking_zone].positionLine[element.position_line].chargers = [];
        this.parkings[element.parking_zone].positionLine[element.position_line].chargers.push(element.charger);

        // Prioritys
        this.parkings[element.parking_zone].positionLine[element.position_line].prioritys = [];
        this.parkings[element.parking_zone].positionLine[element.position_line].prioritys.push(element.priority);

        // Socs
        this.parkings[element.parking_zone].positionLine[element.position_line].socsGun1 = [];
        this.parkings[element.parking_zone].positionLine[element.position_line].socsGun2 = [];

        if (element.gun == 1){
          this.parkings[element.parking_zone].positionLine[element.position_line].socsGun1.push(this.setStateOfChargeClass(element));
        } else {
          this.parkings[element.parking_zone].positionLine[element.position_line].socsGun2.push(this.setStateOfChargeClass(element));
        }

      } else {

        if(this.parkings[element.parking_zone].positionLine[element.position_line] == undefined){
          
          this.parkings[element.parking_zone].positionLine[element.position_line] = new PositionLine();
          
          // Chargers
          this.parkings[element.parking_zone].positionLine[element.position_line].chargers = [];
          this.parkings[element.parking_zone].positionLine[element.position_line].chargers.push(element.charger);

          // Prioritys
          this.parkings[element.parking_zone].positionLine[element.position_line].prioritys = [];
          this.parkings[element.parking_zone].positionLine[element.position_line].prioritys.push(element.priority);

          // Socs
          this.parkings[element.parking_zone].positionLine[element.position_line].socsGun1 = [];
          this.parkings[element.parking_zone].positionLine[element.position_line].socsGun2 = [];

          if (element.gun == 1){
            this.parkings[element.parking_zone].positionLine[element.position_line].socsGun1.push(this.setStateOfChargeClass(element));
          } else {
            this.parkings[element.parking_zone].positionLine[element.position_line].socsGun2.push(this.setStateOfChargeClass(element));
          }
        } else {
          if (!this.parkings[element.parking_zone].positionLine[element.position_line].chargers.includes(element.charger)){
            this.parkings[element.parking_zone].positionLine[element.position_line].chargers.push(element.charger);
          }

          if (element.gun == 1){
            this.parkings[element.parking_zone].positionLine[element.position_line].socsGun1.push(this.setStateOfChargeClass(element));
          } else {
            this.parkings[element.parking_zone].positionLine[element.position_line].socsGun2.push(this.setStateOfChargeClass(element));
          }
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
        stateClass: "occupied",
        priority: element.priority,
      }
    } else {
      aux =  {
        percent: "Free",
        stateClass: "free",
        priority: element.priority,
      }
    }

    
    console.log(aux);
    
    return aux
  }

  UpdateSample(data: Bus){
    this.parkings = {};
    this.positionLines = {};
    this.busesList.forEach(element => {
      if(element.charger == data.charger && element.gun == data.gun){
        element.soc = data.soc;
      }
    });
    this.createParkings(this.busesList)
    
  }

}
