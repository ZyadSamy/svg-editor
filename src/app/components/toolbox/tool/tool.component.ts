import { Component, Input } from '@angular/core';

@Component({
  selector: 'tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent {

  @Input() toolName : string = "";
  @Input() iconLibrary : string = "";
  @Input() iconName : string = "";
  @Input() color : string = "";
  @Input() active : boolean = false;

}
