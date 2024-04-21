import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {CourseDTO} from '../services/course/courseDTO';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../services/course/course.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course$: Observable<CourseDTO>;
  courseId: number;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.courseId = +this.route.snapshot.params['id'];
    this.course$ = this.courseService.getCourseById(this.courseId);
  }

}
