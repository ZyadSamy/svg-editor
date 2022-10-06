import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { SelectionService } from '../services/selection.service';
import Shape from '../models/Shape';

@Directive({
  selector: '[selectableShape]',
})
export class SelectableDirective {
  @Input('shape') shape: Shape;
  @Input('selectableShape') isActive: boolean = false;
  @HostBinding('class.shapeHover') showHoverStroke: boolean = false;

  constructor(private selectionService: SelectionService) {}

  ngOnInit() {}

  mouseOutRef: any = () => {};

  @HostListener('click') onClick() {
    if (this.isActive && !this.shape.selected) {
      this.selectionService.selectShape(this.shape);
    }
  }

  @HostListener('mouseover') mouseOver() {
    if (this.isActive && !this.shape.selected) {
        this.showHoverStroke = true;
    }
  }

  @HostListener('mouseout') mouseOut() {
    if (this.isActive) {
      this.showHoverStroke = false;
    }
  }
}
