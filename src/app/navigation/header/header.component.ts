import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core"
import { Subscription } from "rxjs"
import { AuthService } from "../../auth/auth.service"

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth: boolean
  authSubscription: Subscription
  @Output()
  sidenavToggle = new EventEmitter<void>()

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus
      },
    )
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe()
  }

  onToggleSidenav() {
    this.sidenavToggle.emit()
  }

  onLogout() {
    this.authService.logout()
  }
}
