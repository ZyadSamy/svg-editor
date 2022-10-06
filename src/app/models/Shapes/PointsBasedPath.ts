import Shape from '../Shape';
import Point from '../Point';
import CurvedPoint from '../CurvedPoint';

export class PointsBasedPath extends Shape {
  private points: Point[];
  d = '';

  constructor(id: number, color: string, points: Point[]) {
    super(id, color);
    this.type = 'path';
    this.points = points;
    this.d = this.getPath();
  }

  addPoint(point: Point) {
    this.points.push(point);
    this.d = this.getPath();
  }

  getPath(): string {
    if (this.points.length == 0) return '';

    let path = '';

    this.points.forEach((point, index) => {
      if (index === 0) {
        path = `M ${this.points[0].x},${this.points[0].y}`;
        return;
      }
      if (point instanceof CurvedPoint) {
        path = path.concat(
          ` S ${point.curvePoint.x},${point.curvePoint.y} ${point.x},${point.y} `
        );
        return;
      } 
      path = path.concat(` L ${point.x},${point.y}`);
    });
    return path;
  }

  override generateSVG(): string {
    return `<path d="${this.d}" fill="${this.color}"/>`;
  }

  override reposition(startingPoint: Point, currentPoint: Point): void {
    if (this.points.length == 0) return;
    this.points.forEach((point) => {
      point.x += currentPoint.x - startingPoint.x;
      point.y += currentPoint.y - startingPoint.y;

      if (point instanceof CurvedPoint) {
        point.curvePoint.x += currentPoint.x - startingPoint.x;
        point.curvePoint.y += currentPoint.y - startingPoint.y;
      }
    });
    this.d = this.getPath();
  }

  override clone(new_id: number, offset: number): Shape {
    const pointsDeepCopy: Point[] = [];
    this.points.forEach((point) => {
      let pointCopy;
      if (point instanceof CurvedPoint) {
        pointCopy = new CurvedPoint(
          point.x,
          point.y,
          point.curvePoint.x,
          point.curvePoint.y
        );
      } else {
        pointCopy = new Point(point.x, point.y);
      }
      pointsDeepCopy.push(pointCopy);
    });

    return new PointsBasedPath(new_id, this.color, pointsDeepCopy);
  }
}
