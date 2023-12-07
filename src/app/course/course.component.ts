import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { CourseDTO } from './courseDTO';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  public coursesList: CourseDTO[];

  constructor(private courseService: CourseService) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getAllCourses().subscribe(
      (courses: CourseDTO[]) => {
        this.coursesList = courses;
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  enrollUser(id: number): void {
    this.courseService.enrollUserInCourse(id)
      .subscribe(
        response => {
          alert(`Enrollment successful: ${response}`);
        },
        error => {
          console.error('Enrollment failed:', error);
          alert(`Enrollment failed: ${error.message || 'Unknown error'}`);
        }
      );
  }
}
