import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent {
  @Input()
  active: boolean = false;
  @Input()
  tabTittle: string = '';

  private cdr = inject(ChangeDetectorRef);
  public visibility = false;

  public changeVisibility(visibility: boolean) {
    this.visibility = visibility;
    this.cdr.markForCheck();
  }
}
