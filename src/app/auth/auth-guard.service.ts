import { Injectable } from "@angular/core"
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
} from "@angular/router"
import { Store } from "@ngrx/store"
import { take } from "rxjs/operators"
import * as fromApp from "../app.reducer"

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store<fromApp.State>, private router: Router) {}

  canLoad(route: Route) {
    // only take the first result `.pipe(take(1))`, else error
    return this.store.select(fromApp.getIsAuthenticated).pipe(take(1))
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // only take the first result `.pipe(take(1))`, else error
    return this.store.select(fromApp.getIsAuthenticated).pipe(take(1))
  }
}
