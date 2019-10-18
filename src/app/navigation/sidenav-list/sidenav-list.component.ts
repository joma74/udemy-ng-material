import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core"
import { Store } from "@ngrx/store"
import { AutoUnsubscribe } from "ngx-auto-unsubscribe"
import { Observable } from "rxjs"
import * as fromApp from "../../app.reducer"
import { AuthService } from "../../auth/auth.service"

@AutoUnsubscribe()
@Component({
  selector: "app-sidenav-list",
  templateUrl: "./sidenav-list.component.html",
  styleUrls: ["./sidenav-list.component.css"],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  isAuth$: Observable<boolean>
  @Output()
  sidenavClose = new EventEmitter<void>()

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

  onCloseSidenav() {
    this.sidenavClose.emit()
  }

  onLogout() {
    this.onCloseSidenav()
    this.authService.logout()
  }
}
