import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CourseDTO} from '../services/course/courseDTO';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../services/course/course.service';
import {TokenStorageService} from '../services/token/token-storage.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course$: Observable<CourseDTO>;
  authority: boolean;
  courseId: number;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService
  ) {}
  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.courseId = +this.route.snapshot.params['id'];
    this.course$ = this.courseService.getCourseById(this.courseId);
    if (this.tokenStorage.getToken()) {
          this.authority = true;
    }
  }

  enrollInCourse(id: number): void {
    this.courseService.enrollUserInCourse(id).subscribe({
      next: (response) => {
        this.toastr.success(`Вы успешно зарегистрированы на курс:`, 'Регистрация успешна');
      },
      error: (error) => {
        if (error.status === 409) {
          this.toastr.warning('Вы уже зарегистрированы на этот курс.', 'Уже зарегистрирован');
        } else {
          this.toastr.error(`Ошибка регистрации: ${error.message || 'Неизвестная ошибка'}`, 'Ошибка');
        }
      }
    });
  }
}
