import { Injectable } from "@angular/core"
import { AngularFireAuth } from "@angular/fire/auth"
import { Router } from "@angular/router"
import { Store } from "@ngrx/store"
import { Subject } from "rxjs"
import * as fromApp from "../app.reducer"
import { UIService } from "../shared/ui.service"
import { TrainingService } from "../training/training.service"
import { AuthData } from "./auth-data.mode"

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>()
  private isAuthenticated = false

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<{ ui: fromApp.UIState }>,
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true
        this.authChange.next(true)
        this.router.navigate(["/training"])
      } else {
        this.trainingService.cancelSubscriptions()
        this.isAuthenticated = false
        this.authChange.next(false)
        this.router.navigate(["/login"])
      }
    })
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new fromApp.StartLoading())
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(new fromApp.StopLoading())
        // NOP
      })
      .catch((error) => {
        this.store.dispatch(new fromApp.StopLoading())
        this.uiService.showSnackbar(error.message)
      })
  }

  login(authData: AuthData) {
    this.store.dispatch(new fromApp.StartLoading())
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(new fromApp.StopLoading())
        // NOP
      })
      .catch((error) => {
        this.store.dispatch(new fromApp.StopLoading())
        this.uiService.showSnackbar(error.message)
      })
  }

  logout() {
    this.afAuth.auth.signOut()
  }

  isAuth() {
    return this.isAuthenticated
  }
}
