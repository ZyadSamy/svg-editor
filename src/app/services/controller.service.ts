import Shape from '../models/Shape';
import Point from '../models/Point';
import CurvedPoint from '../models/CurvedPoint';
import ShapeFactory from '../models/Shapes/ShapeFactory';
import { BehaviorSubject } from 'rxjs';
import { SelectionService } from './selection.service';
import { Injectable } from '@angular/core';
import { PointsBasedPath } from '../models/Shapes/PointsBasedPath';

const windowLeftshift = 260;

@Injectable()
export class ControllerService {
  constructor(private selectionService: SelectionService) {}

  private currentID: number = 0;
  private currentColor: string = 'black'; // intialize to black
  prototypeShape: Shape | null = null;

  shapes: Shape[] = [];

  getIdAndIncreament() {
    this.currentID += 1;
    return this.currentID - 1;
  }

  addShape(shape: Shape) {
    this.shapes.push(shape);
  }
  deleteShape(shape: Shape) {
    const index = this.shapes.indexOf(shape);
    this.shapes.splice(index, 1);
  }

  pushBackSelectedShape() {
    const shape = this.selectionService.selectedShape!;
    const shapeIndex = this.shapes.indexOf(shape);
    // if it's the first element, it can't be pushed back >> return
    if (shapeIndex == 0) return;
    // swap shapes
    let temp = this.shapes[shapeIndex - 1];
    this.shapes[shapeIndex - 1] = shape;
    this.shapes[shapeIndex] = temp;
  }

  pushForwardSelectedShape() {
    const shape = this.selectionService.selectedShape!;
    const shapeIndex = this.shapes.indexOf(shape);
    // if it's the first element, it can't be pushed back >> return
    if (shapeIndex == this.shapes.length - 1) return;
    // swap shapes
    let temp = this.shapes[shapeIndex + 1];
    this.shapes[shapeIndex + 1] = shape;
    this.shapes[shapeIndex] = temp;
  }

  updateShapeColor(shape: Shape) {
    shape.color = this.currentColor;
  }

  historyStack: { oldValue: any; newValue: any }[] = []; //undo
  redoStack: { oldValue: any; newValue: any }[] = []; //redo

  // Tools
  private _activeToolName = new BehaviorSubject<string>('select');

  public get activeToolName() {
    return this._activeToolName.getValue();
  }

  public get activeToolObs() {
    return this._activeToolName;
  }

  updateActiveTool(toolName: string) {
    this._activeToolName.next(toolName);
    this.confirmShapePrototype();
  }

  undo() {
    // Check if there's no actions to undo
    if (this.historyStack.length == 0) {
      return;
    }

    let lastAction = this.historyStack.pop();
    if (lastAction?.oldValue == null) {
      // Then its a creation of a shape
      // To undo it , Delete the shape
      this.deleteShape(lastAction?.newValue);
    } else if (
      lastAction.newValue == null &&
      lastAction.oldValue instanceof Shape
    ) {
      this.addShape(lastAction.oldValue);
    }
    this.redoStack.push(lastAction!);
  }

  redo() {
    // Check if there's no actions to undo
    if (this.redoStack.length == 0) {
      return;
    }

    let lastUndoAction = this.redoStack.pop();
    if (lastUndoAction?.oldValue == null) {
      // Then its a creation of a shape
      // To undo it , Delete the shape
      this.addShape(lastUndoAction?.newValue);
    }
    this.historyStack.push(lastUndoAction!);
  }

  getExportSVG(): string {
    var svgContent = document.getElementById('svg-content');
    var bbox = svgContent!.getBoundingClientRect();

    const width = bbox.width;
    const height = bbox.height;
    const x = bbox.left - windowLeftshift;
    const y = bbox.top;

    let exportedShapes: Shape[] = this.getShapesCopy();
    exportedShapes.forEach((shape) => {
      this.shiftShape(shape, -x, -y);
    });

    let output = `<?xml version="1.0" ?>\n<svg  xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">\n`;
    exportedShapes.forEach((shape) => {
      output += `\t ${shape.generateSVG()} \n`;
    });
    output += '</svg>';

    return output;
  }

  shiftShape(shape: Shape, x: number, y: number) {
    shape.reposition(new Point(0, 0), new Point(x, y));
  }

  getShapesCopy(): Shape[] {
    let shapesCopy: Shape[] = [];
    this.shapes.forEach((shape) => {
      let shapeClone = shape.clone(0, 0);
      shapesCopy.push(shapeClone!);
    });
    return shapesCopy;
  }

  downloadSVG() {
    const svg = this.getExportSVG();
    const file = new Blob([svg], { type: 'text/plain' });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(file);
    link.download = 'save.svg';
    link.click();
    link.remove();
  }

  // Selection

  updateColor(color: string) {
    this.currentColor = color;

    let selectedShape = this.selectionService.selectedShape;
    if (selectedShape != null) {
      // if a shape is selected, change it's color
      selectedShape.color = color;
    }
  }

  deleteSelectedShape() {
    let selectedShape = this.selectionService.selectedShape;
    this.deleteShape(selectedShape!);
    this.selectionService.resetSelection();

    this.historyStack.push({
      oldValue: selectedShape,
      newValue: null,
    });
    this.redoStack = [];
  }

  cloneSelectedShape() {
    let shape: Shape = this.selectionService.selectedShape!;
    const offset = 10;
    const newShape = shape.clone(this.currentID, offset);
    this.currentID += 1;
    this.addShape(newShape!);
    this.selectionService.selectShape(newShape!);
  }

  resetSelection() {
    this.selectionService.resetSelection();
  }

  reset() {
    this.selectionService.resetSelection();
    this.resetPathPoints();
  }

  /*  Custom Shape */
  private _pathPoints = new BehaviorSubject<Point[]>([]);
  public get pathPoints() {
    return this._pathPoints.getValue();
  }
  public set pathPoints(value: Point[]) {
    this._pathPoints.next(value);
  }
  getPathPointsObs() {
    return this._pathPoints.asObservable();
  }

  popPathLastPoint() {
    const tempArray: Point[] = this.pathPoints;
    const lastPoint = tempArray.pop();
    this.pathPoints = tempArray;
    return lastPoint;
  }

  resetPathPoints() {
    this.pathPoints = [];
  }

  addShapePoint(event: MouseEvent) {
    let currentPosition: Point = new Point(event.x - windowLeftshift, event.y);
    this._pathPoints.next([...this.pathPoints, currentPosition]);
    this.addCustomShapePrototype();
  }

  addCurvePoint(event: MouseEvent) {
    const lastPoint = this.popPathLastPoint();

    let currentPosition: CurvedPoint = new CurvedPoint(
      lastPoint!.x,
      lastPoint!.y,
      event.x - windowLeftshift,
      event.y,
      true
    );

    this._pathPoints.next([...this.pathPoints, currentPosition]);
    this.addCustomShapePrototype();
  }

  addCustomShapePrototype() {
    // if (this.pathPoints.length < 3) return;

    let path = new PointsBasedPath(
      this.currentID,
      this.currentColor,
      this.pathPoints
    );

    if (this.prototypeShape != null) {
      this.shapes.pop();
    }
    this.prototypeShape = path;
    this.shapes.push(path);
  }

  addShapePrototype(point1: Point, point2: Point) {
    if (point1.equals(point2)) {
      return;
    }
    if (this.prototypeShape != null) {
      this.shapes.pop();
    }

    let shape = ShapeFactory.createShape(
      this.activeToolName,
      this.currentID,
      this.currentColor,
      point1,
      point2
    );

    this.prototypeShape = shape!;
    this.shapes.push(shape!);
  }

  confirmShapePrototype() {
    if (this.prototypeShape != null) {
      this.prototypeShape = null;
      this.currentID += 1;
    }
    this.resetPathPoints();
  }

  getLastShape() {
    return this.shapes[this.shapes.length - 1];
  }

  // style 
  style = new BehaviorSubject<string>("");

  addToStyle(newStyle: string) {
    this.style.next(this.style.value + newStyle);
  }
}
