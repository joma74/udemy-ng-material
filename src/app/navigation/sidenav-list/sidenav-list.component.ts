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
  selector: "app-sidenav-list",
  templateUrl: "./sidenav-list.component.html",
  styleUrls: ["./sidenav-list.component.css"],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  isAuth: boolean
  authSubscription: Subscription
  @Output()
  sidenavClose = new EventEmitter<void>()

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

  onCloseSidenav() {
    this.sidenavClose.emit()
  }

  onLogout() {
    this.onCloseSidenav()
    this.authService.logout()
  }
}
