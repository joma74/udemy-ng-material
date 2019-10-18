import { Injectable } from "@angular/core"
import { AngularFirestore } from "@angular/fire/firestore"
import { Store } from "@ngrx/store"
import { Subject, Subscription } from "rxjs"
import { map } from "rxjs/operators"
import * as fromApp from "../app.reducer"
import * as UI from "../shared/ui.actions"
import { UIService } from "../shared/ui.service"
import { Exercise } from "./exercise.model"

const AVAIL_EXERS_COLLNAME = "availableExercises"
const PAST_EXERS_COLLNAME = "pastExercises"

@Injectable()
export class TrainingService {
  private runningExercise: Exercise
  private availableExercises: Exercise[] = []

  private firebaseSubs: Subscription[] = []

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromApp.State>,
  ) {}

  exerciseChangedSub = new Subject<Exercise>()
  availableExercisesChangedSub = new Subject<Exercise[]>()
  pastExercisesChangedSub = new Subject<Exercise[]>()

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
            this.availableExercises = availableExercises
            this.availableExercisesChangedSub.next([...availableExercises])
            this.store.dispatch(new UI.StopLoading())
          },
          error: (error) => {
            this.store.dispatch(new UI.StopLoading())
            this.uiService.showSnackbar(error.message)
          },
        }),
    )
  }

  startExercise(selectedExerciseId: string) {
    this.runningExercise = this.availableExercises.find(
      (ex) => selectedExerciseId === ex.id,
    )
    this.exerciseChangedSub.next({ ...this.runningExercise })
  }

  onCompleteExercise() {
    this.persistAsPastExercise({
      ...this.runningExercise,
      duration: toFixed(this.runningExercise.duration, 1),
      calories: toFixed(this.runningExercise.calories, 2),
      date: new Date(),
      state: "COMPLETED",
    })
    this.runningExercise = null
    this.exerciseChangedSub.next(null)
  }

  onCancelExercise(progress: number) {
    this.persistAsPastExercise({
      ...this.runningExercise,
      duration: toFixed(this.runningExercise.duration * (progress / 100), 1),
      calories: toFixed(this.runningExercise.calories * (progress / 100), 2),
      date: new Date(),
      state: "CANCELED",
    })
    this.runningExercise = null
    this.exerciseChangedSub.next(null)
  }

  getCurrentExercise() {
    const runningExerciseCpy: Exercise = { ...this.runningExercise }
    return runningExerciseCpy
  }

  fetchPastExercises() {
    this.store.dispatch(new UI.StartLoading())
    this.firebaseSubs.push(
      this.db
        .collection(PAST_EXERS_COLLNAME, (ref) => ref.orderBy("date", "desc"))
        .valueChanges()
        .subscribe({
          next: (pastExercises: Exercise[]) => {
            this.pastExercisesChangedSub.next([...pastExercises])
            this.store.dispatch(new UI.StopLoading())
          },
          error: (error) => {
            this.store.dispatch(new UI.StopLoading())
            this.uiService.showSnackbar(error.message)
          },
        }),
    )
  }

  private persistAsPastExercise(exercise: Exercise) {
    this.db.collection(PAST_EXERS_COLLNAME).add(exercise)
    return exercise
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
