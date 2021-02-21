import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { TestPage } from "../test/test";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  user: userData = {
    name: "",
    email: "",
    testType: ""
  };
  listOfTest = [
    {
      id: 1,
      code: "ng",
      name: "Angular"
    },
    {
      id: 2,
      code: "js",
      name: "JavaScript"
    },
    {
      id: 3,
      code: "css",
      name: "CSS Stlying"
    },
    {
      id: 4,
      code: "ctet",
      name: "CTET"
    }
  ];
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) {}

  submitCheck() {
    const alert = this.alertCtrl.create({
      title: "Start Exam",
      subTitle: "Do You Want To Star The Exam?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {
            console.log("Confirm Cancel: blah");
          }
        },
        {
          text: "Yes",
          handler: () => {
            this.nextPage();

            console.log("Confirm Okay");
          }
        }
      ]
    });
    alert.present();
  }

  nextPage() {
    console.log(this.user);
    this.navCtrl.push(TestPage, {
      data: this.user
    });
  }
}

interface userData {
  name: string;
  email: string;
  testType: string;
}
