import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {CourseDTO} from '../services/course/courseDTO';
import {CourseService} from '../services/course/course.service';
import {map} from 'rxjs/operators';
import {ContactService} from '../services/contact/contact.service';
import {ToastrService} from 'ngx-toastr';
import {ContactDTO} from '../services/contact/contactDTO';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: any = {};
  contactInfo: ContactDTO;
  courses$: Observable<CourseDTO[]>;
  filteredCourses$: Observable<CourseDTO[]>;
  activeCategory = 'С нуля';

  constructor(private courseService: CourseService, private contactService: ContactService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.courses$ = this.courseService.getAllCourses();
    this.filteredCourses$ = this.courses$;
  }

  contactUs(): void {
    this.contactInfo = new ContactDTO(
      this.form.firstName,
      this.form.firstName,
      this.form.firstName + '@gmail.com',
      this.form.phones,
      'Default way to contact');
    console.log(this.contactInfo);

    this.contactService.saveContact(this.contactInfo).subscribe({
      next: (response) => {
        this.toastr.success(`Вы успешно отправили запрос`, 'Успешно отправлено');
      },
      error: (error) => {
        this.toastr.error(`Ошибка отправки: ${error.message || 'Неизвестная ошибка'}`, 'Ошибка');
      }
    });
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
