import { Component, Input, OnInit } from '@angular/core';
import Shape from 'src/app/models/Shape';

@Component({
  selector: 'rect-sidebar',
  templateUrl: './rect-sidebar.component.html',
  styleUrls: ['../sidebar.child.css'],
})
export class RectSidebarComponent implements OnInit {
  constructor() {}

  @Input() shape: Shape | null = null;

  ngOnInit(): void {}
}
