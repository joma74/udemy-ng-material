import { Injectable } from "@angular/core"
import { CanActivate, CanLoad, Route, Router } from "@angular/router"
import { AuthService } from "./auth.service"

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route) {
    if (this.authService.isAuth()) {
      return true
    } else {
      this.router.navigate(["/login"])
    }
  }

  canActivate(
    route: import("@angular/router").ActivatedRouteSnapshot,
    state: import("@angular/router").RouterStateSnapshot,
  ):
    | boolean
    | import("@angular/router").UrlTree
    | import("rxjs").Observable<boolean | import("@angular/router").UrlTree>
    | Promise<boolean | import("@angular/router").UrlTree> {
    if (this.authService.isAuth()) {
      return true
    } else {
      return this.router.navigate(["/login"])
    }
  }
}
