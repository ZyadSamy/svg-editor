import { Component, Input } from '@angular/core';
import Shape from 'src/app/models/Shape';

@Component({
  selector: 'circle-sidebar',
  templateUrl: './circle-sidebar.component.html',
  styleUrls: ['../sidebar.child.css'],
})
export class CircleSidebarComponent {
  @Input() shape: Shape | null = null;

  constructor() {}
}
