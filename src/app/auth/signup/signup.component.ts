import { Component, OnInit } from "@angular/core"
import { NgForm } from "@angular/forms"
import { log } from "util"

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onSubmit(f: NgForm) {
    console.log(f)
  }
}
