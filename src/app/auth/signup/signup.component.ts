import { Component, OnInit } from "@angular/core"
import { NgForm } from "@angular/forms"
import { log } from "util"

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  maxDate: Date
  constructor() {}

  ngOnInit() {
    this.maxDate = new Date()
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  onSubmit(f: NgForm) {
    console.log(f)
  }
}
