import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core"
import { AutoUnsubscribe } from "ngx-auto-unsubscribe"
import { Subscription } from "rxjs"
import { AuthService } from "../../auth/auth.service"

@AutoUnsubscribe()
@Component({
  selector: "app-sidenav-list",
  templateUrl: "./sidenav-list.component.html",
  styleUrls: ["./sidenav-list.component.css"],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  isAuth: boolean
  authSub: Subscription
  @Output()
  sidenavClose = new EventEmitter<void>()

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSub = this.authService.authChange.subscribe((authStatus) => {
      this.isAuth = authStatus
    })
  }

  // This method must be present, even if empty.
  ngOnDestroy() {
    // AutoUnsubscribe will throw an error if it doesn't
  }

  onCloseSidenav() {
    this.sidenavClose.emit()
  }

  onLogout() {
    this.onCloseSidenav()
    this.authService.logout()
  }
}
