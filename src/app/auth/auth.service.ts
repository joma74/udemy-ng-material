import { Injectable } from "@angular/core"
import { AngularFireAuth } from "@angular/fire/auth"
import { Router } from "@angular/router"
import { Store } from "@ngrx/store"
import * as fromApp from "../app.reducer"
import * as UI from "../shared/ui.action"
import { UIService } from "../shared/ui.service"
import { TrainingService } from "../training/training.service"
import { AuthData } from "./auth-data.mode"
import * as AUTH from "./auth.action"

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromApp.State>,
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.store.dispatch(new AUTH.SetAuthenticated())
        this.router.navigate(["/training"])
      } else {
        this.trainingService.cancelSubscriptions()
        this.store.dispatch(new AUTH.SetUnauthenticated())
        this.router.navigate(["/login"])
      }
    })
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading())
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(new UI.StopLoading())
        this.store.dispatch(new AUTH.SetAuthenticated())
      })
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading())
        this.store.dispatch(new AUTH.SetUnauthenticated())
        this.uiService.showSnackbar(error.message)
      })
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading())
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(new UI.StopLoading())
        this.store.dispatch(new AUTH.SetAuthenticated())
      })
      .catch((error) => {
        this.store.dispatch(new UI.StopLoading())
        this.store.dispatch(new AUTH.SetUnauthenticated())
        this.uiService.showSnackbar(error.message)
      })
  }

  logout() {
    this.afAuth.auth.signOut()
    this.store.dispatch(new AUTH.SetUnauthenticated())
  }
}
