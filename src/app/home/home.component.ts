import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {CourseDTO} from '../services/course/courseDTO';
import {CourseService} from '../services/course/course.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses$: Observable<CourseDTO[]>;
  filteredCourses$: Observable<CourseDTO[]>;
  activeCategory = 'С нуля';

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courses$ = this.courseService.getAllCourses();
    this.filteredCourses$ = this.courses$;
  }

  filterCoursesByCategory(category: string): void {
    this.activeCategory = category;
    this.filteredCourses$ = this.courses$.pipe(
      map(courses => courses.filter(course =>
        category === 'С нуля' ? true : course.level === category
      ))
    );
  }

}
