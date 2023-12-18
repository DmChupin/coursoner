import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, TabComponent],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  @Input()
  tabNames: string[] = [];
}
