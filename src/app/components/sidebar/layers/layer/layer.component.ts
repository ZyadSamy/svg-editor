import { Component, Input, OnInit } from '@angular/core';
import Shape from 'src/app/models/Shape';
import { ControllerService } from 'src/app/services/controller.service';

@Component({
  selector: 'layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.css']
})
export class LayerComponent implements OnInit {

  @Input() i : number;
  @Input() shape : Shape;

  constructor(private controller : ControllerService) { }

  ngOnInit(): void {
  }

  onClick() {
    // this.controller.selectShape(this.shape);
  }

}
