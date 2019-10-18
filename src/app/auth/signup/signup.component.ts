import { Component, OnDestroy, OnInit } from "@angular/core"
import { NgForm } from "@angular/forms"
import { Store } from "@ngrx/store"
import { AutoUnsubscribe } from "ngx-auto-unsubscribe"
import { Observable, Subscription } from "rxjs"
import * as fromApp from "../../app.reducer"
import { AuthService } from "../auth.service"

@AutoUnsubscribe()
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate: Date
  isLoading$: Observable<boolean>

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.State>,
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromApp.getIsLoading)
    //
    this.maxDate = new Date()
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  // This method must be present, even if empty.
  ngOnDestroy() {
    // AutoUnsubscribe will throw an error if it doesn't
  }

  onSubmit(f: NgForm) {
    this.authService.registerUser({
      email: f.value.email,
      password: f.value.password,
    })
  }
}
