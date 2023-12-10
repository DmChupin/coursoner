import { Component, Input } from '@angular/core';
import { CourseListItem } from '../../../shared/interfaces/course.interface';

@Component({
  selector: 'app-course-list-item',
  standalone: true,
  imports: [],
  templateUrl: './course-list-item.component.html',
  styleUrl: './course-list-item.component.scss',
})
export class CourseListItemComponent {
  @Input()
  item: CourseListItem | null | undefined = null;
}
