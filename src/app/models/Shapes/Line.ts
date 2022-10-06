import Point from '../Point';
import Shape from '../Shape';

export default class Line extends Shape {
  endPosition: Point;

  constructor(
    id: number,
    color: string,
    point1: Point,
    point2: Point,
    styleClass: string = ''
  ) {
    super(id, color, point1, styleClass);
    this.type = 'line';
    this.endPosition = point2;
  }

  override generateSVG(): string {
    return (
      `<line ` +
      `x1="${this.position.x}" ` +
      `y1="${this.position.y}" ` +
      `x2="${this.endPosition.x}" ` +
      `y2="${this.endPosition.y}" ` +
      `fill="${this.color}"` +
      `/>`
    );
  }

  override reposition(startingPoint: Point, currentPoint: Point): void {
    this.position.x += currentPoint.x - startingPoint.x;
    this.position.y += currentPoint.y - startingPoint.y;

    this.endPosition.x += currentPoint.x - startingPoint.x;
    this.endPosition.y += currentPoint.y - startingPoint.y;
  }

  override clone(new_id: number, offset: number): Shape {
    const tempPoint = new Point(0, 0);
    const obj = new Line(new_id, this.color, tempPoint, tempPoint, this.styleClass);
    obj.position = { x: this.position.x + offset, y: this.position.y + offset };
    obj.endPosition = new Point(
      this.endPosition.x + offset,
      this.endPosition.y + offset
    );
    return obj;
  }
}
