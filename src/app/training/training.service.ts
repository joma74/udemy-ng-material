import { Injectable } from "@angular/core"
import { AngularFirestore } from "@angular/fire/firestore"
import { Subject } from "rxjs"
import { map } from "rxjs/operators"
import { Exercise } from "./exercise.model"

@Injectable()
export class TrainingService {
  private runningExercise: Exercise
  private availableExercises: Exercise[] = []
  private pastExercises: Exercise[] = []

  constructor(private db: AngularFirestore) {}

  exerciseChangedSubscription = new Subject<Exercise>()
  availableExercisesChangedSubscription = new Subject<Exercise[]>()

  fetchAvailableExercises() {
    this.db
      .collection("availableExercises")
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
          this.availableExercisesChangedSubscription.next([
            ...availableExercises,
          ])
        },
      })
  }

  onCompleteExercise() {
    this.pastExercises.push(
      this.persistAsPastExercise({
        ...this.runningExercise,
        date: new Date(),
        state: "COMPLETED",
      }),
    )
    this.runningExercise = null
    this.exerciseChangedSubscription.next(null)
  }

  onCancelExercise(progress: number) {
    this.pastExercises.push(
      this.persistAsPastExercise({
        ...this.runningExercise,
        duration:
          Math.floor(this.runningExercise.duration * (progress / 100) * 10) /
          10,
        calories:
          Math.floor(this.runningExercise.calories * (progress / 100) * 100) /
          100,
        date: new Date(),
        state: "CANCELED",
      }),
    )
    this.runningExercise = null
    this.exerciseChangedSubscription.next(null)
  }

  startExercise(selectedExerciseId: string) {
    this.runningExercise = this.availableExercises.find(
      (ex) => selectedExerciseId === ex.id,
    )
    this.exerciseChangedSubscription.next({ ...this.runningExercise })
  }

  getCurrentExercise() {
    const runningExerciseCpy: Exercise = { ...this.runningExercise }
    return runningExerciseCpy
  }

  getPastExercises() {
    return this.pastExercises.slice()
  }

  private persistAsPastExercise(exercise: Exercise) {
    this.db.collection("pastExercises").add(exercise)
    return exercise
  }
}
