import { Component, OnInit } from '@angular/core';
import { ControllerService } from 'src/app/services/controller.service';
import { SelectionService } from 'src/app/services/selection.service';
import Shape from 'src/app/models/Shape';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  shape: Shape | null = null;
  activeTool = '';

  ngOnInit(): void {
    this.controller.activeToolObs.subscribe((activeTool) => {
      this.activeTool = activeTool;
    });
    this.selectionService
      .getSelectedShapeObservable()
      .subscribe((selectedShape) => {
        this.shape = selectedShape;
      });
  }

  constructor(
    private controller: ControllerService,
    private selectionService: SelectionService
  ) {}

  confirmShape() {
    this.controller.confirmShapePrototype();
    this.controller.historyStack.push({
      oldValue: null,
      newValue: this.controller.getLastShape(),
    });
    // this.controller.makeCustomShape();
  }

  deleteShape() {
    this.controller.deleteSelectedShape();
  }

  cloneShape() {
    this.controller.cloneSelectedShape();
  }

  pushBack() {
    this.controller.pushBackSelectedShape();
  }

  pushForward() {
    this.controller.pushForwardSelectedShape();
  }

  isPushBackDisabled() {
    return (
      this.controller.shapes.indexOf(this.selectionService.selectedShape!) == 0
    );
  }

  isPushForwardDisabled() {
    return (
      this.controller.shapes.indexOf(this.selectionService.selectedShape!) ==
      this.controller.shapes.length - 1
    );
  }

  isCreateShapeDisabled() {
    return this.controller.pathPoints.length < 3;
  }
}
