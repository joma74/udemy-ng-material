import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { Store } from "@ngrx/store"
import { AutoUnsubscribe } from "ngx-auto-unsubscribe"
import { Observable, Subscription } from "rxjs"
import { map } from "rxjs/operators"
import * as fromApp from "../../app.reducer"
import { AuthService } from "../auth.service"

@AutoUnsubscribe()
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private store: Store<{ ui: fromApp.UIState }>,
  ) {}

  loginForm: FormGroup
  isLoading$: Observable<boolean>

  loadingStateChangedSub: Subscription

  ngOnInit() {
    this.isLoading$ = this.store.pipe(map((state) => state.ui.isLoading))
    this.loginForm = new FormGroup({
      email: new FormControl("", {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl("", { validators: [Validators.required] }),
    })
  }

  // This method must be present, even if empty.
  ngOnDestroy() {
    // AutoUnsubscribe will throw an error if it doesn't
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    })
  }
}
