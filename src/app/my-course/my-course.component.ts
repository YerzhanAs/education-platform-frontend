import { Component, OnInit } from '@angular/core';
import {CourseService} from '../services/course/course.service';
import {CourseDTO} from '../services/course/courseDTO';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css']
})
export class MyCourseComponent implements OnInit {

  public coursesList: CourseDTO[] = [];

  constructor(private courseService: CourseService,  private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getMyCourses();
  }

  getMyCourses(): void {
    this.courseService.getMyCourses().subscribe(
      (courses: CourseDTO[]) => {
        this.coursesList = courses;
      },
      (error) => {
        this.toastr.error(`Ошибка получение курса: ${error.message || 'Неизвестная ошибка'}`, 'Ошибка');
      }
    );
  }
}
