import { Component, Input, OnInit } from '@angular/core';
import  Shape  from 'src/app/models/Shape';
import { ControllerService } from 'src/app/services/controller.service';

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.css'],
})
export class LayersComponent implements OnInit {
  shapes: Shape[] = [];

  constructor(private controller: ControllerService) {
    this.shapes = this.controller.shapes;
  }
  

  ngOnInit(): void {}
}
