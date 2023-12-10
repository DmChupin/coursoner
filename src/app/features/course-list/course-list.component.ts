import { Component } from '@angular/core';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';
import { CommonModule } from '@angular/common';
import { CourseListItem } from '../../shared/interfaces/course.interface';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CourseListItemComponent, CommonModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss',
})
export class CourseListComponent {
  data: CourseListItem[] = [
    {
      id: 1,
      section: 'Администрирование серверов',
      header: 'Изучаем Линукс шаг за шагом (нет)',
      author: 'Чупин Дмитрий',
      rating: 3,
      gradeCount: 294,
      image: 'https://img-c.udemycdn.com/course/240x135/1400426_e0a7_3.jpg',
    },
  ];
}
