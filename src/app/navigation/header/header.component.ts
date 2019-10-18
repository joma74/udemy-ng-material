import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core"
import { Store } from "@ngrx/store"
import { AutoUnsubscribe } from "ngx-auto-unsubscribe"
import { Observable, Subscription } from "rxjs"
import * as fromApp from "../../app.reducer"
import { AuthService } from "../../auth/auth.service"

@AutoUnsubscribe()
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth$: Observable<boolean>
  @Output()
  sidenavToggle = new EventEmitter<void>()

  constructor(
    private store: Store<fromApp.State>,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.isAuth$ = this.store.select(fromApp.getIsAuthenticated)
  }

  // This method must be present, even if empty.
  ngOnDestroy() {
    // AutoUnsubscribe will throw an error if it doesn't
  }

  onToggleSidenav() {
    this.sidenavToggle.emit()
  }

  onLogout() {
    this.authService.logout()
  }
}
