import Point from '../Point';
import Shape from '../Shape';

export default class Circle extends Shape {
  radius: number;

  constructor(
    id: number,
    color: string,
    centerPosition: { x: number; y: number },
    radius: number,
    styleClass: string = "",
  ) {
    super(id, color, centerPosition, styleClass);
    this.type = 'circle';
    this.radius = radius;
  }

  override generateSVG(): string {
    return `<circle cx="${this.position.x}" cy="${this.position.y}" r="${this.radius}" fill="${this.color}"/>`;
  }

  override reposition(startingPoint: Point, currentPoint: Point): void {
    this.position.x += currentPoint.x - startingPoint.x;
    this.position.y += currentPoint.y - startingPoint.y;
  }

  override clone(new_id: number, offset: number): Shape {
    const newCenter = {
      x: this.position.x + offset,
      y: this.position.y + offset
    }
    return new Circle(new_id, this.color, newCenter, this.radius);
  }
}
