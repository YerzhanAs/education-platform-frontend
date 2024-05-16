import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { TestService } from '../services/test/test.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  testForm: FormGroup;
  test: any;

  constructor(private fb: FormBuilder, private testService: TestService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.testForm = this.fb.group({
      testId: [1], // Идентификатор теста, который нужно загрузить
      questions: this.fb.array([]) // Инициализация FormArray для вопросов
    });

    this.loadTest(1); // Загрузить тест с id = 1
  }

  loadTest(testId: number): void {
    this.testService.getTest(testId).subscribe(test => {
      this.test = test;
      const questionControls = this.test.questions.map(() => this.fb.group({
        selectedOption: [null]
      }));
      this.testForm.setControl('questions', this.fb.array(questionControls));
    });
  }

  get questions(): FormArray {
    return this.testForm.get('questions') as FormArray;
  }

  onSubmit(): void {
    const submission = {
      testId: this.testForm.value.testId,
      selectedOptionIds: this.testForm.value.questions.map((q: any) => q.selectedOption)
    };

    this.testService.submitTest(submission).subscribe(response => {
      console.log(response);
    });
    this.toastr.success(`Вы сдали тест`, 'Тестирование сдано успешно');
  }
}
