import Point from './Point';

export default abstract class Shape {
  id: number;
  styleClass: string;
  selected: boolean;
  color: string;
  position: { x: number; y: number };
  type;

  constructor(
    id: number,
    color: string,
    position: { x: number; y: number } = { x: 0, y: 0 },
    styleClass: string = "",
  ) {
    this.id = id;
    this.selected = false;
    this.color = color;
    this.position = { x: position.x, y: position.y };
    this.type = '';
    this.styleClass = styleClass;
  }

  abstract generateSVG(): string

  abstract reposition(startingPoint: Point, currentPoint: Point): void

  abstract clone(new_id: number, offset: number): Shape
}
