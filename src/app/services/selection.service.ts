import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Shape  from '../models/Shape';

@Injectable({
  providedIn: 'root',
})
export class SelectionService {
  private _selectedShape = new BehaviorSubject<Shape | null>(null);

  public get selectedShape(): Shape | null {
    return this._selectedShape.getValue();
  }

  getSelectedShapeObservable() {
    return this._selectedShape.asObservable();
  }

  selectShape(shape: Shape) {
    if (this.selectedShape === shape) {
      return;
    }

    // Unselect previously selected shape if any
    this.resetSelection();
    // Select new shape
    shape.selected = true;
    this._selectedShape.next(shape);
  }

  resetSelection() {
    if (this.selectedShape != null) {
      this.selectedShape.selected = false;
      this._selectedShape.next(null);
    }
  }
}
