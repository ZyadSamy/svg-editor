import { Injectable } from '@angular/core';
import { ControllerService } from './controller.service';

import { getTagsFromTokens } from '../parser/tagsCreator';
import { tokenize } from '../parser/tokenize';
import {
  createCircleWithProperties,
  createEllipseWithProperties,
  createLineWithProperties,
  createPathWithProperties,
  createRectWithProperties,
} from '../parser/shapeCreatorWithProperties';

import Shape from '../models/Shape';
import SVGTag from '../interfaces/SVGTag';

@Injectable({
  providedIn: 'root',
})
export class SVGParserService {
  constructor(private controller: ControllerService) {}

  parseToShapes(svg: string): Shape[] {
    const tokens = tokenize(svg);
    const tags: SVGTag[] = getTagsFromTokens(tokens);
    const shapes: Shape[] = this.getShapesFromTags(tags);
    return shapes;
  }

  getShapesFromTags(tags: SVGTag[]) {
    let shapes: Shape[] = [];
    let new_id = this.controller.getIdAndIncreament();

    tags.forEach((tag) => {
      switch (tag.name) {
        case 'rect':
          shapes.push(createRectWithProperties(tag.properties, new_id));
          break;
        case 'circle':
          shapes.push(createCircleWithProperties(tag.properties, new_id));
          break;
        case 'ellipse':
          shapes.push(createEllipseWithProperties(tag.properties, new_id));
          break;
        case 'line':
          shapes.push(createLineWithProperties(tag.properties, new_id));
          break;
        case 'path':
          shapes.push(createPathWithProperties(tag.properties, new_id));
          break;
        case 'style':
          this.controller.addToStyle(getStyleInnerValue(tag));
          break;
      }
    });

    return shapes;
  }
}

const getStyleInnerValue = (tag: SVGTag): string => {
  let value = ""
  tag.properties.forEach(property => {
    if (property.name === 'inner')
      value = property.value;
  })
  return value;
}