import { Component } from '@angular/core';
import { ControllerService } from 'src/app/services/controller.service';
import { SVGParserService } from 'src/app/services/svg-parser.service';

import Shape from 'src/app/models/Shape';

@Component({
  selector: 'load-sidebar',
  templateUrl: './load-sidebar.component.html',
  styleUrls: ['../sidebar.child.css', './load-sidebar.css'],
})
export class LoadSidebarComponent {
  constructor(
    private svgParser: SVGParserService,
    private controller: ControllerService
  ) {}

  fileContent: string | ArrayBuffer | null = '';

  public onChange(event: Event): void {
    let file = (event.target as HTMLInputElement).files![0];
    let fileReader: FileReader = new FileReader();
    fileReader.readAsText(file);

    fileReader.onload = () => {
      this.LoadSVG(fileReader.result);
    };
  }

  LoadSVG(svg: string | ArrayBuffer | null) {
    if (typeof svg != 'string') return;

    const addedShapes: Shape[] = this.svgParser.parseToShapes(svg);
    addedShapes.forEach((shape) => {
      this.controller.shapes.push(shape);
    });

    // switch to selection tool
    this.controller.updateActiveTool('select');
  }
}
