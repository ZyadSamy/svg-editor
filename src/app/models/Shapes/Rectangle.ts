import Shape from '../Shape';
import Point from '../Point';

class Rectangle extends Shape {
  width: number;
  height: number;
  // rounded rect
  rx: number = 0;
  ry: number = 0;

  constructor(
    id: number,
    color: string,
    position: { x: number; y: number },
    width: number,
    height: number,
    styleClass: string = "",

  ) {
    super(id, color, position, styleClass);
    this.type = 'rectangle';
    this.width = width;
    this.height = height;
  }

  setShapeRoundeness(rx: number, ry: number) {
    this.rx = rx;
    this.ry = ry;
  }

  override generateSVG(): string {
    return (
      `<rect ` +
      `x="${this.position.x}" ` +
      `y="${this.position.y}" ` +
      `width="${this.width}" ` +
      `height="${this.height}" ` +
      `fill="${this.color}"/>`
    );
  }

  override reposition(startingPoint: Point, endPoint: Point): void {
    this.position.x += endPoint.x - startingPoint.x;
    this.position.y += endPoint.y - startingPoint.y;
  }

  override clone(new_id: number, offset: number): Shape {
    const newPoisition = {
      x: this.position.x + offset,
      y: this.position.y + offset,
    };
    return new Rectangle(
      new_id,
      this.color,
      newPoisition,
      this.width,
      this.height,
      this.styleClass
    );
  }
}

export default Rectangle;
