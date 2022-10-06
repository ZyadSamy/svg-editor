import { Directive, HostListener } from '@angular/core';
import { ControllerService } from '../services/controller.service';
import Point from '../models/Point';

@Directive({
  selector: '[drawableCanvas]',
})
export class DrawableDirective {
  private windowLeftShift = 260;
  activeTool: string = '';

  startingPosition = new Point(0, 0);
  mouseMoveRef: any = () => {};
  mouseUpRef: any = () => {};

  constructor(private controller: ControllerService) {}

  ngOnInit() {
    this.controller.activeToolObs.subscribe((tool) => {
      this.activeTool = tool;
    });
  }

  @HostListener('mousedown', ['$event'])
  canvasMouseDownHandler(event: MouseEvent) {
    // if any creational tool is active
    if (this.activeTool != 'select') {
      // update starting point position
      this.startingPosition.x = event.pageX - this.windowLeftShift;
      this.startingPosition.y = event.pageY;

      if (this.activeTool == 'customShape') {
        // Add the point and then display a prototype
        let currentPosition: Point = new Point(
          event.x - this.windowLeftShift,
          event.y
        );
        this.controller.addShapePoint(event);
      }

      // Add event listeners
      this.mouseMoveRef = this.canvasMouseMoveHandler.bind(this);
      this.mouseUpRef = this.canvasMouseUpHandler.bind(this);
      document.addEventListener('mousemove', this.mouseMoveRef);
      document.addEventListener('mouseup', this.mouseUpRef);
    }
  }

  canvasMouseMoveHandler(e: MouseEvent) {
    let currentPosition = new Point(e.pageX - this.windowLeftShift, e.pageY);

    if (this.activeTool == 'customShape') {
      // if the current position is NOT the same as the starting position
      if (!currentPosition.equals(this.startingPosition)) {
        this.controller.addCurvePoint(e);
      }
    } // If its not a custom shape,
    else {
      this.controller.addShapePrototype(this.startingPosition, currentPosition);
    }
  }

  canvasMouseUpHandler(e: MouseEvent) {
    // Only confirm prototype on mouse release when its not a custom shape
    // custom shapes require a button to be pressed
    if (this.activeTool != 'customShape') {
      this.controller.confirmShapePrototype();
      this.controller.historyStack.push({
        oldValue: null,
        newValue: this.controller.getLastShape(),
      });
    }
    document.removeEventListener('mousemove', this.mouseMoveRef);
    document.removeEventListener('mouseup', this.mouseUpRef);
  }
}
