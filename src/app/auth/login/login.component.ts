import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms"
import { AutoUnsubscribe } from "ngx-auto-unsubscribe"
import { Subscription } from "rxjs"
import { UIService } from "../../shared/ui.service"
import { AuthService } from "../auth.service"

@AutoUnsubscribe()
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService, private uiService: UIService) {}

  loginForm: FormGroup
  isLoading: boolean

  loadingStateChangedSub: Subscription

  ngOnInit() {
    this.loadingStateChangedSub = this.uiService.loadingStateChanged.subscribe(
      (loadingState) => (this.isLoading = loadingState),
    )
    //
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
