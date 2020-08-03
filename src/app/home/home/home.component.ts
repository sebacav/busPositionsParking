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

  isLoading: Boolean = false;

  constructor(
    private busService: BusService,
    private fb: FormBuilder
  ) {
    this.busesList = this.busService.Test();
    this.dataForm = this.fb.group({
      soc: ['', Validators.required],
      priority: ['', Validators.required],
    });
    this.createParkings(this.busesList);
  }

  ngOnInit() {
  }

  send(){
    console.log(this.dataForm.value);
    var data = {
      soc: this.dataForm.value.soc,
      priority: this.dataForm.value.priority,
    }
    this.busService.SendData(data).subscribe(
      resp => {
        console.log(resp);
      }
    );
  }

  sendTest(){
    this.isLoading = true;
    console.log('Antes: ', this.busesList);
    
    console.log(this.dataForm.value);
    this.busTest.soc = this.dataForm.value.soc;
    this.busTest.priority = this.dataForm.value.priority;
    // this.busTest.gun = 1;
    // this.UpdateSample(this.busTest);
    // console.log("ANTES: ",this.busesList);
    this.busesList = [];
    this.parkings = {};
    this.positionLines = {};
    // this.busService.SortParkings(this.busTest).then(
    //   (resp: Bus[])=>{
    //     this.busesList = [];
    //     this.createParkings(resp);

    //     setTimeout( () => {
    //       this.isLoading = false;
    //     }, 1000 );
        
    //   }
    // );

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
          // this.parkings[element.parking_zone].positionLine[element.position_line].prioritys
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
    this.ReversingArrays();

    // console.log("AHORA: ",this.parkings);
  }

  setStateOfChargeClass(element: Bus): socGun{
    var aux: socGun = null;

    if(this.busService.changedBusesList.includes(element)){
      console.log("si esta");
      aux =  {
        percent: "% "+element.soc.toString(),
        stateClass: "changed",
        priority: element.priority,
      }
    } else {

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

    }

    
    // console.log(aux);
    
    return aux
  }

  UpdateSample(data: Bus){
    this.busService.Sorting(data).then(
      resp=>{
        this.createParkings(resp);
        setTimeout( () => {
          this.isLoading = false;
        }, 1000 );
      }
    );
    // this.parkings = {};
    // this.positionLines = {};
    // this.busesList.forEach(element => {
    //   if(element.charger == data.charger && element.gun == data.gun){
    //     element.soc = data.soc;
    //   }
    // });
    // this.createParkings(this.busesList)
    
  }


  ReversingArrays(){
    for (let parkingsKey in this.parkings){
      let parkingsValue = this.parkings[parkingsKey];

      for (let lineKey in parkingsValue.positionLine){
        let linesValue = parkingsValue.positionLine[lineKey];

        linesValue.chargers = linesValue.chargers.reverse();
        linesValue.socsGun1 = linesValue.socsGun1.reverse();
        linesValue.socsGun2 = linesValue.socsGun2.reverse();

        linesValue.stateClass = "line";

        linesValue.socsGun1.forEach(element => {
          if(element.stateClass == "changed"){
            linesValue.stateClass = "lineChanged";
            console.log("linea cambiada");
            
          }
        });

        linesValue.socsGun2.forEach(element => {
          if(element.stateClass == "changed"){
            linesValue.stateClass = "lineChanged";
            console.log("linea cambiada");
          }
        });
      }

      
    }
  }

}
