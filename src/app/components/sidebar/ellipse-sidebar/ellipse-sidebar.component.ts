import { Component, Input } from '@angular/core';
import Shape from 'src/app/models/Shape';

@Component({
  selector: 'ellipse-sidebar',
  templateUrl: './ellipse-sidebar.component.html',
  styleUrls: ['../sidebar.child.css'],
})
export class EllipseSidebarComponent {
  @Input() shape: Shape | null = null;

  constructor() {}
}
