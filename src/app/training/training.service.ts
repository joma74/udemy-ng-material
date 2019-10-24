import { Injectable } from "@angular/core"
import { AngularFireAuth } from "@angular/fire/auth"
import { AngularFirestore } from "@angular/fire/firestore"
import { Store } from "@ngrx/store"
import { Subscription } from "rxjs"
import { map, take } from "rxjs/operators"
import * as UI from "../shared/ui.action"
import { UIService } from "../shared/ui.service"
import { Exercise } from "./exercise.model"
import * as TRAINING from "./training.action"
import * as fromTraining from "./training.reducer"

const AVAIL_EXERS_COLLNAME = "availableExercises"
const EXERS_DOCNAME = "exercises"
const PAST_COLLNAME = "past"

@Injectable()
export class TrainingService {
  private firebaseSubs: Subscription[] = []

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private uiService: UIService,
    private store: Store<fromTraining.State>,
  ) {}

  private getOwnedBy() {
    return this.afAuth.auth.currentUser.uid
  }

  private getOwnedByExersPast_P() {
    const uid = this.getOwnedBy()
    return `${uid}/${EXERS_DOCNAME}/${PAST_COLLNAME}`
  }

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading())
    this.firebaseSubs.push(
      this.db
        .collection(AVAIL_EXERS_COLLNAME)
        .snapshotChanges()
        .pipe(
          map((docArray) => {
            return docArray.map((doc) => {
              const mappedDataModel: Exercise = {
                ...(doc.payload.doc.data() as Exercise),
                id: doc.payload.doc.id,
              }
              return mappedDataModel
            })
          }),
        )
        .subscribe({
          next: (availableExercises: Exercise[]) => {
            this.store.dispatch(
              new TRAINING.SetAvailableExercises(availableExercises),
            )
            this.store.dispatch(new UI.StopLoading())
          },
          error: (error) => {
            this.onErrorExercise(error)
          },
        }),
    )
  }

  startExercise(selectedExerciseId: string) {
    this.store.dispatch(new TRAINING.StartRunningExercise(selectedExerciseId))
  }

  onCompleteExercise() {
    this.store
      .select(fromTraining.getRunningExercise)
      .pipe(take(1))
      .subscribe({
        next: (runningExercise) => {
          this.store.dispatch(new TRAINING.UnsetRunningExercise())
          this.persistAsPastExercise({
            ...runningExercise,
            duration: toFixed(runningExercise.duration, 1),
            calories: toFixed(runningExercise.calories, 2),
            date: new Date(),
            state: "COMPLETED",
          })
        },
        error: (error) => {
          this.onErrorExercise(error)
        },
      })
  }

  onCancelExercise(progress: number) {
    this.store
      .select(fromTraining.getRunningExercise)
      .pipe(take(1))
      .subscribe({
        next: (runningExercise) => {
          this.store.dispatch(new TRAINING.UnsetRunningExercise())
          this.persistAsPastExercise({
            ...runningExercise,
            duration: toFixed(runningExercise.duration * (progress / 100), 1),
            calories: toFixed(runningExercise.calories * (progress / 100), 2),
            date: new Date(),
            state: "CANCELED",
          })
        },
        error: (error) => {
          this.onErrorExercise(error)
        },
      })
  }

  onErrorExercise(error: Error) {
    this.store.dispatch(new UI.StopLoading())
    this.store.dispatch(new TRAINING.UnsetRunningExercise())
    this.uiService.showSnackbar(error.message)
  }

  fetchPastExercises() {
    this.store.dispatch(new UI.StartLoading())
    try {
      this.firebaseSubs.push(
        this.db
          .collection(this.getOwnedByExersPast_P(), (ref) =>
            ref.orderBy("date", "desc"),
          )
          .valueChanges()
          .subscribe({
            next: (pastExercises: Exercise[]) => {
              this.store.dispatch(new TRAINING.SetPastExercises(pastExercises))
              this.store.dispatch(new UI.StopLoading())
            },
            error: (error) => {
              this.onErrorExercise(error)
            },
          }),
      )
    } catch (error) {
      this.onErrorExercise(error)
    }
  }

  private persistAsPastExercise(exercise: Exercise) {
    try {
      this.db
        .collection(this.getOwnedByExersPast_P())
        .add(exercise)
        .then(
          (doc) => {
            /* NOP */
          },
          (reason) => {
            this.onErrorExercise(reason)
          },
        )
        .catch((error) => {
          this.onErrorExercise(error)
        })
    } catch (error) {
      this.onErrorExercise(error)
    }
  }

  cancelSubscriptions() {
    this.firebaseSubs.forEach((sub) => {
      sub.unsubscribe()
    })
  }
}

function toFixed(decimal: number, digits: number) {
  if (digits === undefined || digits < 0 || digits > 20) {
    throw new RangeError("digits must be between 1 and 20 inclusive")
  }
  if (decimal === undefined || decimal === null) {
    throw new TypeError("decimal must not be null or undefined")
  }
  const factor = Math.pow(10, digits)
  const result = Math.floor(decimal * factor) / factor
  return result
}
