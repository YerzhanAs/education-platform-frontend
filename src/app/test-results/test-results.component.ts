import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TestResultResponse} from '../services/test/test-result-response';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})
export class TestResultsComponent implements OnInit {

  score: number;
  testName: string;
  username: string;
  totalQuestions: number;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as TestResultResponse;
    this.score = state?.score ?? 0;
    this.testName = state?.testName ?? '';
    this.username = state?.username ?? '';
    this.totalQuestions = state?.totalQuestions;
  }

  ngOnInit(): void {}

  getPercentage(): number {
    console.log(this.totalQuestions);
    return this.totalQuestions ? (this.score / this.totalQuestions) * 100 : 0;
  }

}
