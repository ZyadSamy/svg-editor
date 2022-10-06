import { Directive, HostListener, Input } from '@angular/core';
import Point from '../models/Point';
import Shape from '../models/Shape';

@Directive({
  selector: '[draggableShape]',
})
export class DraggableDirective {
  @Input('shape') shape: Shape;

  private windowLeftshift = 260;

  mouseMoveRef: any = () => {};
  mouseUpRef: any = () => {};
  lastPosition = new Point(0, 0);

  constructor() {}

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    if (this.shape.selected) {
      // update starting point position
      this.lastPosition.x = event.pageX - this.windowLeftshift;
      this.lastPosition.y = event.pageY;

      this.mouseMoveRef = this.mouseMoveHandler.bind(this);
      this.mouseUpRef = this.mouseUpHandler.bind(this);

      document.addEventListener('mousemove', this.mouseMoveRef);
      document.addEventListener('mouseup', this.mouseUpRef);
    }
  }

  mouseMoveHandler(e: MouseEvent) {
    let currentPosition = new Point(e.pageX - this.windowLeftshift, e.pageY);
    if (!currentPosition.equals(this.lastPosition)) {
      this.shape?.reposition(this.lastPosition, currentPosition);
    }

    // Update lastPosition with each move
    this.lastPosition.x = e.pageX - this.windowLeftshift;
    this.lastPosition.y = e.pageY;
  }

  mouseUpHandler(e: MouseEvent) {
    document.removeEventListener('mousemove', this.mouseMoveRef);
    document.removeEventListener('mouseup', this.mouseUpRef);
  }
}
