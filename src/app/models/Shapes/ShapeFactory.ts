import Rectangle from './Rectangle';
import Ellipse from './Ellipse';
import Circle from './Circle';
import Shape from '../Shape';
import Point from '../Point';
import Line from './Line';

class ShapeFactory {
  static createShape(
    shapeType: string,
    id: number,
    color: string,
    point1: Point,
    point2: Point
  ): Shape | undefined {
    const createRect = () => {
      const position = {
        x: point1.x < point2.x ? point1.x : point2.x,
        y: point1.y < point2.y ? point1.y : point2.y,
      };
      const width = Math.abs(point2.x - point1.x);
      const height = Math.abs(point2.y - point1.y);
      return new Rectangle(id, color, position, width, height);
    };

    const createCircle = () => {
      const center = {
        x: point1.x,
        y: point1.y,
      };
      const radius =
        Math.abs(point2.x - point1.x) > Math.abs(point2.y - point1.y)
          ? Math.abs(point2.x - point1.x)
          : Math.abs(point2.y - point1.y);
      return new Circle(id, color, center, radius);
    };

    const createEllipse = () => {
      const position = {
        x: (point1.x + point2.x) / 2,
        y: (point1.y + point2.y) / 2,
      };
      const radiusX = Math.abs(point1.x - point2.x) / 2;
      const radiusY = Math.abs(point1.y - point2.y) / 2;
      return new Ellipse(id, color, position, radiusX, radiusY);
    };

    const createLine = () => {
      return new Line(id, color, point1, point2);
    };

    switch (shapeType) {
      case 'rectangle':
        return createRect();

      case 'circle':
        return createCircle();

      case 'ellipse':
        return createEllipse();

      case 'line':
        return createLine();
    }
    return undefined;
  }
}

export default ShapeFactory;
