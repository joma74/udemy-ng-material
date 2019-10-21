import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormControl, FormGroup, Validators } from "@angular/forms"
import { Store } from "@ngrx/store"
import { AutoUnsubscribe } from "ngx-auto-unsubscribe"
import { Observable } from "rxjs"
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
    private store: Store<fromApp.State>,
  ) {}

  loginForm: FormGroup
  isLoading$: Observable<boolean>

  ngOnInit() {
    this.isLoading$ = this.store.select(fromApp.getIsLoading)
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
