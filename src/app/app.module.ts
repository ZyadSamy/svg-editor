import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { ToolComponent } from './components/toolbox/tool/tool.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ControllerService } from './services/controller.service';
import { CircleSidebarComponent } from './components/sidebar/circle-sidebar/circle-sidebar.component';
import { RectSidebarComponent } from './components/sidebar/rect-sidebar/rect-sidebar.component';
import { EllipseSidebarComponent } from './components/sidebar/ellipse-sidebar/ellipse-sidebar.component';
import { LayersComponent } from './components/sidebar/layers/layers.component';
import { LayerComponent } from './components/sidebar/layers/layer/layer.component';
import { SelectableDirective } from './directives/selectable.directive';
import { DraggableDirective } from './directives/draggable.directive';
import { DrawableDirective } from './directives/drawable.directive';
import { LoadSidebarComponent } from './components/sidebar/load-sidebar/load-sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolboxComponent,
    CanvasComponent,
    ToolComponent,
    SidebarComponent,
    RectSidebarComponent,
    CircleSidebarComponent,
    EllipseSidebarComponent,
    LayersComponent,
    LayerComponent,
    SelectableDirective,
    DraggableDirective,
    DrawableDirective,
    LoadSidebarComponent,
  ],
  imports: [
    BrowserModule,
    ColorPickerModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [ControllerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
