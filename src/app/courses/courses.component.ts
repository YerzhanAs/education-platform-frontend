import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course/course.service';
import { CourseDTO } from '../services/course/courseDTO';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  public coursesList: CourseDTO[] = [];
  public filteredCoursesList: CourseDTO[] = [];
  searchTerm = '';

  constructor(private courseService: CourseService) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getAllCourses().subscribe(
      (courses: CourseDTO[]) => {
        this.coursesList = courses;
        this.filteredCoursesList = courses;
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

  filterCoursesByLanguage(language: string): void {
    console.log('ura');
    this.filteredCoursesList = this.coursesList.filter(course => language === 'Все' ? true : course.language === language);
  }

  // tslint:disable-next-line:typedef
  onSearchCourse(): void {
    if (!this.searchTerm) {
      this.filteredCoursesList = [...this.coursesList];
    } else {
      this.courseService.searchCourses(this.searchTerm).subscribe({
        next: (data: CourseDTO[]) => {
          this.filteredCoursesList = data;
        },
        error: (error) => this.handleError(error)
      });
    }
  }

  private handleError(error: any): void {
    console.error('Request failed:', error);
    alert(`Error: ${error.message || 'Unknown error'}`);
  }
}
