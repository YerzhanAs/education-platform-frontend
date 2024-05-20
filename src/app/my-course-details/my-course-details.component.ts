import { Component, OnInit } from '@angular/core';
import {CourseDTO} from '../services/course/courseDTO';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../services/course/course.service';

@Component({
  selector: 'app-my-course-details',
  templateUrl: './my-course-details.component.html',
  styleUrls: ['./my-course-details.component.css']
})
export class MyCourseDetailsComponent implements OnInit {
  courseId: number;
  menuHidden = true;
  course: CourseDTO;
  selectedModule: any;

  modules = [
    { title: 'Введение', status: 'Не начат' },
    { title: '1. Основы разработки Backend. Java. Инструменты разработки', status: '10/10' },
    { title: '2. Микросервисы. REST. Spring Boot', status: '13/13' },
    { title: '3. Spring Cloud. Eureka Discovery Service, API Gateway', status: '7/7' },
    // Add more modules as needed
  ];

  constructor(private route: ActivatedRoute, private courseService: CourseService) {
    this.courseId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getCourseDetails(this.courseId);

    // For demonstration, we select the first module by default.
    this.selectedModule = {
      title: 'Введение',
      status: 'Не начат',
      goals: [
        'Получить практические навыки программирования на Java',
        'Использовать систему контроля версии Git',
        'Уметь подключать базы данных к проекту',
        'Разработать веб-приложение на фреймворке Spring',
        'Настроить работу компонент микросервисной архитектуры'
      ],
      learn: [
        'Backend-разработке приложений на Java',
        'Построении собственной микросервисной архитектуры',
        'Отслеживании истории изменений кода с помощью Git',
        'Создании веб-приложений на фреймворке Spring',
        'Работе с разными типами баз данных (SQL, NoSQL)',
        'Настройке сервисной коммуникации с помощью Apache Kafka'
      ],
      lessons: [
        { title: 'Видеоурок "Основы Backend-разработки и инструменты разработчика"', type: 'Видео', iconClass: 'fas fa-video' },
        { title: 'Учебный материал "Основы Backend-разработки"', type: 'Презентация', iconClass: 'fas fa-file-alt' },
        { title: 'Видеоурок "Установка Java Development Kit (JDK)"', type: 'Видео', iconClass: 'fas fa-video' }
      ]
    };
  }

  getCourseDetails(courseId: number): void {
    this.courseService.getCourseById(courseId).subscribe(
      (course: CourseDTO) => {
        this.course = course;
      },
      (error) => {
        console.error('Error fetching course details:', error);
      }
    );
  }

  toggleMenu(): void {
    this.menuHidden = !this.menuHidden;
  }
}
