import { Component, OnDestroy, OnInit } from "@angular/core"
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms"
import { Subscription } from "rxjs"
import { UIService } from "../../shared/ui.service"
import { AuthService } from "../auth.service"

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService, private uiService: UIService) {}

  loginForm: FormGroup
  isLoading: boolean

  loadingStateChangedSubscription: Subscription

  ngOnInit() {
    this.loadingStateChangedSubscription = this.uiService.loadingStateChanged.subscribe(
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

  ngOnDestroy(): void {
    this.loadingStateChangedSubscription.unsubscribe()
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    })
  }
}
