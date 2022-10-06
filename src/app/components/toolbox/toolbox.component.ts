import { Component, OnInit } from '@angular/core';
import { ControllerService } from 'src/app/services/controller.service';
import tools from './tools.json';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css'],
})
export class ToolboxComponent implements OnInit {
  tools = tools;
  activeTool: string = '';
  color = 'black';

  constructor(private controller: ControllerService) {}

  ngOnInit(): void {
    this.controller.activeToolObs.subscribe((value) => {
      this.activeTool = value;
    });
  }

  updateColor() {
    this.controller.updateColor(this.color);
  }

  toolClicked(toolName: string) {
    this.controller.reset();

    if (toolName == 'undo') {
      this.controller.undo();
    } else if (toolName == 'redo') {
      this.controller.redo();
    } else if (toolName == 'save') {
      this.controller.downloadSVG();
    } else {
      this.controller.updateActiveTool(toolName);
    }
  }
}
