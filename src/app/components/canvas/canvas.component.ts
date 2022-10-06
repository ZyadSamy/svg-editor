import { Point } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ControllerService } from 'src/app/services/controller.service';
import Shape from '../../models/Shape';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements OnInit {
  shapes: any[] = [];
  style = '';
  customShapeDots: Point[] = [];

  constructor(private controller: ControllerService) {}

  ngOnInit(): void {
    this.shapes = this.controller.shapes;
    this.controller.getPathPointsObs().subscribe((value) => {
      this.customShapeDots = value;
    });
    this.controller.style.subscribe((value) => (this.style = value));
  }

  shapeClicked(event: MouseEvent, shape: Shape): void {
    event.stopPropagation();
    if (this.controller.activeToolName == 'fill') {
      this.controller.updateShapeColor(shape);
    }
  }

  canvasClicked(): void {
    this.controller.resetSelection();
  }

  isSelectionToolActive(): boolean {
    return this.controller.activeToolName === 'select';
  }

  isCreationalToolActive(): boolean {
    const tool = this.controller.activeToolName;

    return (
      tool == 'circle' ||
      tool == 'rectangle' ||
      tool == 'ellipse' ||
      tool == 'line' ||
      tool == 'customShape'
    );
  }
}
