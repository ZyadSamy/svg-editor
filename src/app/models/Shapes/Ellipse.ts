import Point from '../Point';
import Shape from '../Shape';

export default class Ellipse extends Shape {
  radiusX: number;
  radiusY: number;

  constructor(
    id: number,
    color: string,
    position: { x: number; y: number },
    rx: number,
    ry: number,
    styleClass: string = "",
  ) {
    super(id, color, position, styleClass);
    this.type = 'ellipse';
    this.radiusX = rx;
    this.radiusY = ry;
  }

  override generateSVG(): string {
    return `<ellipse cx="${this.position.x}" cy="${this.position.y}" rx="${this.radiusX}" ry="${this.radiusY}" fill="${this.color}"/>`;
  }

  override reposition(startingPoint: Point, currentPoint: Point): void {
    this.position.x += currentPoint.x - startingPoint.x;
    this.position.y += currentPoint.y - startingPoint.y;
  }

  override clone(new_id: number, offset: number): Shape {
    const newPosition = {
      x: this.position.x + offset,
      y: this.position.y + offset,
    };
    return new Ellipse(
      new_id,
      this.color,
      newPosition,
      this.radiusX,
      this.radiusY,
      this.styleClass
    );
  }
}
