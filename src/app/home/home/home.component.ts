import { Component, OnInit } from '@angular/core';
import { BusService } from 'src/app/shared/services/bus.service';
import { Bus } from '../../../app/shared/models/Bus';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  busesList: Bus[] = []

  constructor(
    private busService: BusService
  ) {
    
  }

  ngOnInit() {
    this.busesList = this.busService.Test();
  }

}
