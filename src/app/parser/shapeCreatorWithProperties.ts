import Property from '../interfaces/Property';
import Rectangle from '../models/Shapes/Rectangle';
import Circle from '../models/Shapes/Circle';
import Ellipse from '../models/Shapes/Ellipse';
import Line from '../models/Shapes/Line';
import Path from '../models/Shapes/Path';
import Point from '../models/Point';
import PathCommand from '../interfaces/PathCommand';
import getPathCommands from './pathParser';

const getBasicProperties = (properties: Property[]) => {
  let basicPropeties = {
    color: "black",
    styleClass: ""
  }

  properties.forEach(property => {
    switch (property.name) {
      case "fill" :
        basicPropeties.color = property.value;
        break;
      case "class":
        basicPropeties.styleClass = property.value;
        break;
    }
  })

  return basicPropeties;
}

export const createRectWithProperties = (
  properties: Property[],
  id: number
) => {
  let {color, styleClass} = getBasicProperties(properties);
  let position = { x: 0, y: 0 };
  let width = 0;
  let height = 0;
  let rx = 0;
  let ry = 0;


  properties.forEach((property) => {
    switch (property.name) {
      case 'fill':
        color = property.value;
        break;
      case 'x':
        position.x = parseInt(property.value);
        break;
      case 'y':
        position.y = parseInt(property.value);
        break;
      case 'width':
        width = parseInt(property.value);
        break;
      case 'height':
        height = parseInt(property.value);
        break;
      case 'rx':
        rx = parseInt(property.value);
        break;
      case 'ry':
        ry = parseInt(property.value);
        break;
    }
  });

  const rect = new Rectangle(id, color, position, width, height, styleClass);
  rect.setShapeRoundeness(rx, ry);
  return rect;
};

export const createCircleWithProperties = (
  properties: Property[],
  id: number
): Circle => {
  let {color, styleClass} = getBasicProperties(properties);
  let position = { x: 0, y: 0 };
  let radius = 0;

  properties.forEach((property) => {
    switch (property.name) {
      case 'fill':
        color = property.value;
        break;
      case 'cx':
        position.x = parseInt(property.value);
        break;
      case 'cy':
        position.y = parseInt(property.value);
        break;
      case 'r':
        radius = parseInt(property.value);
        break;
    }
  });

  return new Circle(id, color, position, radius, styleClass);
};

export const createEllipseWithProperties = (
  properties: Property[],
  id: number
): Ellipse => {
  let {color, styleClass} = getBasicProperties(properties);
  let position = { x: 0, y: 0 };
  let radiusX = 0;
  let radiusY = 0;

  properties.forEach((property) => {
    switch (property.name) {
      case 'cx':
        position.x = parseInt(property.value);
        break;
      case 'cy':
        position.y = parseInt(property.value);
        break;
      case 'rx':
        radiusX = parseInt(property.value);
        break;
      case 'ry':
        radiusY = parseInt(property.value);
        break;
    }
  });

  return new Ellipse(id, color, position, radiusX, radiusY, styleClass);
};

export const createLineWithProperties = (
  properties: Property[],
  id: number
): Line => {
  let {color, styleClass} = getBasicProperties(properties);
  let position1 = new Point(0, 0);
  let position2 = new Point(0, 0);

  properties.forEach((property) => {
    switch (property.name) {
      case 'x1':
        position1.x = parseInt(property.value);
        break;
      case 'y1':
        position1.y = parseInt(property.value);
        break;
      case 'x2':
        position2.x = parseInt(property.value);
        break;
      case 'y2':
        position2.y = parseInt(property.value);
        break;
    }
  });

  return new Line(id, color, position1, position2, styleClass);
};

export const createPathWithProperties = (
  properties: Property[],
  id: number
): Path => {
  let {color, styleClass} = getBasicProperties(properties);
  let d = '';

  let commands: PathCommand[] = [];
  properties.forEach((property) => {
    switch (property.name) {
      case 'd':
        d = property.value;
        commands = getPathCommands(d);
    }
  });

  return new Path(id, color, commands, styleClass);
};
