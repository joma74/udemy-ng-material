import { Component, OnDestroy, OnInit } from "@angular/core"
import { NgForm } from "@angular/forms"
import { Subscription } from "rxjs"
import { UIService } from "../../shared/ui.service"
import { AuthService } from "../auth.service"

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate: Date
  isLoading: boolean

  loadingStateChangedSubscription: Subscription

  constructor(private authService: AuthService, private uiService: UIService) {}

  ngOnInit() {
    this.loadingStateChangedSubscription = this.uiService.loadingStateChanged.subscribe(
      (loadingState) => (this.isLoading = loadingState),
    )
    //
    this.maxDate = new Date()
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  ngOnDestroy(): void {
    this.loadingStateChangedSubscription.unsubscribe()
  }

  onSubmit(f: NgForm) {
    this.authService.registerUser({
      email: f.value.email,
      password: f.value.password,
    })
  }
}
