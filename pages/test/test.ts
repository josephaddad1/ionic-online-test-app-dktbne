import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { ResultPage } from "../result/result";
import { SharedDataService } from "../../shared/shared-data-service";

/**
 *@author acharyaks90
 *@description test Page Copponent
 *@Component Class
 */

@Component({
  selector: "page-test",
  templateUrl: "test.html"
})
export class TestPage {
  test: string = "NG test";
  relationship = "";
  t1 = new Date(0);
  timerInterval: any;
  timer = 0;
  score = 0;
  user = {};
  currentQuestion = 1;
  questionList = [];
  ques = {};
  private exam = {
    id: "207f4ce7-70d4-42c4-9b64-c9de0fd60708",
    name: "EXAM 1",
    note: 22,
    duration: 60,
    time: "1970-01-01T10:54:01.000+00:00",
    date: "2021-01-29T22:00:00.000+00:00",
    questionList: [
      {
        id: "4765bae6-f145-4df8-838d-45127dbcbeef",
        name: "Q1 radio",
        note: 23,
        type: "radio",
        textAnswer: null,
        answerList: [
          {
            id: "65c0fd4d-736b-4fdd-977f-d5c2fe58538a",
            name: "test asd `23",
            correct: false
          },
          {
            id: "7ec79190-c81a-4799-9ce7-873e8ebeb8bf",
            name: "4redasd sadad",
            correct: false
          }
        ]
      },
      {
        id: "6b88198b-8721-48d9-8865-45e1f5b8d0fd",
        name: "QUEST 1",
        note: 2,
        type: "text",
        textAnswer: "Q1",
        answerList: []
      }
    ]
  };
  private examFormDTO = {
    service: {},
    text: {},
    textarea: {},
    number: {},
    select: {},
    radio: {},
    checkbox: {}
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sharedDataService: SharedDataService
  ) {
    // this.user = this.navParams.get('data');
    this.questionList = this.exam.questionList;
    this.questionList.map(item => {
      item.answerFilled = "";
    });
    this.loadQuestion();
    this.t1.setHours(0, 20, 0, 0);
    this.timer = this.t1.getTime();
    this.timerInterval = setInterval(() => {
      this.timer = this.timer - 1000;
    }, 1000);

    setTimeout(() => {
      this.completeTest();
    }, 720000);
  }
  /**
   * @author acharyaks90
   * @description Finish the test
   * @method
   */

  completeTest() {
    this.selectedAnswer();
    this.navCtrl.push(ResultPage, {
      data: {
        user: this.user,
        test: { seq: 12, score: this.score }
      }
    });
  }

  /**
   * @author acharyaks90
   * @description Load Questions from test DB
   * @method loadQuestion
   */

  loadQuestion() {
    this.ques = this.questionList[this.currentQuestion - 1];
  }

  /**
   * @author acharyaks90
   * Load Previous Question
   * @method previousQuestion
   */

  previousQuestion() {
    if (this.currentQuestion > 1) {
      --this.currentQuestion;
      this.loadQuestion();
    }
  }

  /**
   * @author acharyaks90
   * @description Load Next Question
   * @method nextQuestion
   */
  nextQuestion() {
    if (this.currentQuestion < this.questionList.length) {
      ++this.currentQuestion;
      this.loadQuestion();
    }
  }

  /**
   * @author acharyaks90
   * @description Event fired on answering the question
   * @method nextQuestion
   */

  selectedAnswer() {
    this.score = 0;
    this.questionList.forEach(item => {
      if (item.answerFilled && item.answer == item.answerFilled) {
        this.score = this.score + 5;
      }
    });
  }

  /**
   * @author acharyaks90
   * @description Event fired on answering the question
   * @method ngOnDestroy
   */

  ngOnDestroy() {
    window.clearInterval(this.timerInterval);
  }
}
