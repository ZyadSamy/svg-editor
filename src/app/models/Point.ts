export default class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  equals(target: Point): boolean {
    return this.x == target.x && this.y == target.y;
  }
}

