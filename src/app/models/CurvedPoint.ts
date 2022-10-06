import Point from './Point';

class CurvedPoint extends Point {
  curvePoint: Point;

  constructor(
    x: number,
    y: number,
    curveX: number,
    curveY: number,
    inversedCurve: boolean = false
  ) {
    super(x, y);

    if (inversedCurve)
      this.curvePoint = new Point(-(curveX - x) + x, -(curveY - y) + y);
    else this.curvePoint = new Point(curveX, curveY);
  }
}

export default CurvedPoint;
