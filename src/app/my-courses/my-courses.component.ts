import { Component, OnInit } from '@angular/core';
import {CourseService} from '../services/course/course.service';
import {CourseDTO} from '../services/course/courseDTO';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {

  public coursesList: CourseDTO[] = [];

  constructor(private courseService: CourseService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getMyCourses();
  }

  getMyCourses(): void {
    this.courseService.getMyCourses().subscribe(
      (courses: CourseDTO[]) => {
        this.coursesList = courses;
      },
      (error) => {
        console.log(`Ошибка получение курса: ${error.message || 'Неизвестная ошибка'}`, 'Ошибка');
      }
    );
  }
}
