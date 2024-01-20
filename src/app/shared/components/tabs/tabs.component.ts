import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, TabComponent],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements AfterViewInit {
  @Input()
  tabNames: string[] = []; //TODO: перейти на заголовки самих tab

  @ContentChildren(TabComponent)
  tabs!: QueryList<TabComponent>;

  activeTab: TabComponent | null = null;

  ngAfterViewInit(): void {
    const activeTab: TabComponent | undefined =
      this.tabs.find((tab) => tab.active) || this.tabs.get(0);

    if (activeTab) {
      this.onSelect(activeTab);
    }
  }
  onSelect(tab: TabComponent) {
    this.tabs.forEach((tab) => {
      tab.changeVisibility(false);
    });
    tab.changeVisibility(true);
  }
}
